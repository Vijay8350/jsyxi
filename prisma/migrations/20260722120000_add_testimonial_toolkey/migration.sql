-- AlterTable
ALTER TABLE "SiteTestimonial" ADD COLUMN "toolKey" TEXT;

-- CreateIndex
CREATE INDEX "SiteTestimonial_toolKey_idx" ON "SiteTestimonial"("toolKey");
