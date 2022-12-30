-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "Site_userId_idx" ON "Site"("userId");
