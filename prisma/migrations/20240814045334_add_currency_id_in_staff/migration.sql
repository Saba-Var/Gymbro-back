-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `currencyId` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
