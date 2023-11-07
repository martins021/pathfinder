/*
  Warnings:

  - You are about to alter the column `animationSpeed` on the `Map` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,4)`.

*/
-- AlterTable
ALTER TABLE "Map" ALTER COLUMN "animationSpeed" SET DATA TYPE DECIMAL(5,4);
