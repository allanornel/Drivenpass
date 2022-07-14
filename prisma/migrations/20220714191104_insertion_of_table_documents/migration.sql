-- CreateEnum
CREATE TYPE "docType" AS ENUM ('CNH', 'RG');

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "issuingBody" TEXT NOT NULL,
    "completeName" TEXT NOT NULL,
    "emissionDate" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "type" "docType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "documents_userId_title_key" ON "documents"("userId", "title");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
