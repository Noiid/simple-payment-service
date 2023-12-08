/*
  Warnings:

  - Added the required column `type` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('ROLE', 'OBJECT');

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "type" "PermissionType" NOT NULL;
