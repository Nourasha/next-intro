-- CreateTable
CREATE TABLE "Feed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nickname" TEXT,
    "birthYear" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Feed_url_key" ON "Feed"("url");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
