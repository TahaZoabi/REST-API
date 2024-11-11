/*
  Warnings:

  - You are about to drop the column `quanity` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "quanity",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;
