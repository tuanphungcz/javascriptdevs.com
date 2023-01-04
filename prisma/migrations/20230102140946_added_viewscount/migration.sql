-- CreateTable
CREATE TABLE "ViewsCount" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "ViewsCount_pkey" PRIMARY KEY ("id")
);
