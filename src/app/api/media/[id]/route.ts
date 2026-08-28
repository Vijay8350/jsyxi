import { prisma } from "@/lib/db";

// Serves an admin-uploaded image by id. Content is public (marketing images) and
// immutable — the id is a fresh cuid per upload and bytes never change — so it is
// safe to cache aggressively.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(asset.data), {
    status: 200,
    headers: {
      "Content-Type": asset.contentType,
      "Content-Length": String(asset.bytes),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
