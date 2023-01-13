/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roleSeniority` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `searchStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `workPreference` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "avatarUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "githubUrl",
DROP COLUMN "linkedinUrl",
DROP COLUMN "roleSeniority",
DROP COLUMN "searchStatus",
DROP COLUMN "title",
DROP COLUMN "twitterUrl",
DROP COLUMN "workPreference";
