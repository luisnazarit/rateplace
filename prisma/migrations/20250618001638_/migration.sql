/*
  Warnings:

  - Added the required column `slug` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "slug" TEXT NOT NULL;
