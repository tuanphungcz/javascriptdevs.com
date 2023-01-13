-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "roleSeniority" TEXT[],
ADD COLUMN     "searchStatus" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "workPreference" TEXT[];
