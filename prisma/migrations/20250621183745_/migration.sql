/*
  Warnings:

  - You are about to drop the column `country` on the `BusinessAccount` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `BusinessAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BusinessAccount" DROP COLUMN "country",
DROP COLUMN "state",
ADD COLUMN     "commune" TEXT;
