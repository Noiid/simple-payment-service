-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "snapUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "token" TEXT NOT NULL DEFAULT '';
