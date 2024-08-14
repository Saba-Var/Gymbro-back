/*
  Warnings:

  - Added the required column `currencyId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyId` to the `CompanySubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyId` to the `Salary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyId` to the `StaffSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyId` to the `TrainingPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `currencyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CompanySubscription` ADD COLUMN `currencyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Salary` ADD COLUMN `currencyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Staff` MODIFY `privateNumber` VARCHAR(13) NOT NULL,
    MODIFY `phoneNumber` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `StaffSubscription` ADD COLUMN `currencyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TrainingPlan` ADD COLUMN `currencyId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(3) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `symbol` VARCHAR(5) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Currency_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Salary` ADD CONSTRAINT `Salary_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrainingPlan` ADD CONSTRAINT `TrainingPlan_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffSubscription` ADD CONSTRAINT `StaffSubscription_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanySubscription` ADD CONSTRAINT `CompanySubscription_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `Currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
