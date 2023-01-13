/*
  Warnings:

  - You are about to drop the column `github` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "github",
DROP COLUMN "linkedin",
DROP COLUMN "twitter",
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "twitterUrl" TEXT;
