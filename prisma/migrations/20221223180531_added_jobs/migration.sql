-- CreateTable
CREATE TABLE "JobStory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "firebaseId" INTEGER NOT NULL,
    "firebaseCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobItem" (
    "id" SERIAL NOT NULL,
    "by" TEXT NOT NULL,
    "company" TEXT,
    "text" TEXT NOT NULL,
    "firebaseId" INTEGER NOT NULL,
    "firebaseCreatedAt" TIMESTAMP(3) NOT NULL,
    "storyId" INTEGER NOT NULL,
    "json" JSONB,
    "partTime" BOOLEAN NOT NULL DEFAULT false,
    "contract" BOOLEAN NOT NULL DEFAULT false,
    "remote" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobTag" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "JobTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobItemToJobTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "JobStory_firebaseId_key" ON "JobStory"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "JobItem_firebaseId_key" ON "JobItem"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "JobTag_slug_key" ON "JobTag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_JobItemToJobTag_AB_unique" ON "_JobItemToJobTag"("A", "B");

-- CreateIndex
CREATE INDEX "_JobItemToJobTag_B_index" ON "_JobItemToJobTag"("B");
