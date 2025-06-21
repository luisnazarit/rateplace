/*
  Warnings:

  - A unique constraint covering the columns `[slug,accountId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,accountId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_slug_key";

-- DropIndex
DROP INDEX "Product_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_accountId_key" ON "Category"("slug", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_accountId_key" ON "Product"("slug", "accountId");
