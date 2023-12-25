-- CreateTable
CREATE TABLE "ShortLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "surl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_surl_key" ON "ShortLink"("surl");
