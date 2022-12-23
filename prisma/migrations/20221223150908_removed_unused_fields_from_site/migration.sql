/*
  Warnings:

  - You are about to drop the column `email` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Site` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Site_email_key";

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "name";
