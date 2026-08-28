import { getCurrentStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/audit";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB — keep marketing images light
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

// Staff-only image upload. Stores the file in the DB (MediaAsset) and returns the
// public URL it is served at. Used by the content editor's cover-image picker and
// the article body's "insert image" button. SVG is intentionally rejected (XSS).
export async function POST(req: Request) {
  const staff = await getCurrentStaff();
  if (!staff) return Response.json({ ok: false, error: "Not signed in." }, { status: 401 });
  if (!staffCanAccess(staff.staffRole, "content")) {
    return Response.json({ ok: false, error: "You don't have access to upload media." }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ ok: false, error: "Expected a file upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ ok: false, error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return Response.json({ ok: false, error: "Unsupported image type. Use JPEG, PNG, WEBP, GIF or AVIF." }, { status: 415 });
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return Response.json({ ok: false, error: "Image must be between 1 byte and 4 MB." }, { status: 413 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  // Re-check the actual decoded size (formData File.size can be spoofed by clients).
  if (buffer.byteLength > MAX_BYTES) {
    return Response.json({ ok: false, error: "Image exceeds 4 MB." }, { status: 413 });
  }

  const asset = await prisma.mediaAsset.create({
    data: {
      data: buffer,
      contentType: file.type,
      filename: file.name?.slice(0, 200) || null,
      bytes: buffer.byteLength,
      createdByStaffId: staff.id,
    },
    select: { id: true },
  });

  await writeAudit({
    actor: { type: "staff", id: staff.id, label: `${staff.name} <${staff.email}>` },
    action: "media.upload",
    objectType: "MediaAsset",
    objectId: asset.id,
    summary: `Uploaded image ${file.name || asset.id} (${Math.round(buffer.byteLength / 1024)} KB)`,
  });

  return Response.json({ ok: true, url: `/api/media/${asset.id}` });
}
