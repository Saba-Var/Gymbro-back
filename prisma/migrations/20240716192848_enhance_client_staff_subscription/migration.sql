/*
  Warnings:

  - You are about to drop the column `durationInDays` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[privateNumber]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[privateNumber]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `privateNumber` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privateNumber` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryType` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationType` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingPlanId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Plan` DROP FOREIGN KEY `Plan_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Plan` DROP FOREIGN KEY `Plan_trainerId_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_planId_fkey`;

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `privateNumber` VARCHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `baseSalary` DECIMAL(10, 2) NULL,
    ADD COLUMN `commissionAmount` DECIMAL(10, 2) NULL,
    ADD COLUMN `commissionType` ENUM('PERCENTAGE', 'FIXED') NULL,
    ADD COLUMN `privateNumber` VARCHAR(11) NOT NULL,
    ADD COLUMN `salaryType` ENUM('FIXED', 'COMMISSION', 'COMBINED') NOT NULL;

-- AlterTable
ALTER TABLE `Subscription` DROP COLUMN `durationInDays`,
    DROP COLUMN `planId`,
    ADD COLUMN `commissionAmount` DECIMAL(10, 2) NULL,
    ADD COLUMN `commissionType` ENUM('PERCENTAGE', 'FIXED') NULL,
    ADD COLUMN `durationType` ENUM('MONTH', 'DAY') NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `originalPrice` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `trainingPlanId` INTEGER NOT NULL,
    ALTER COLUMN `startDate` DROP DEFAULT;

-- DropTable
DROP TABLE `Plan`;

-- CreateTable
CREATE TABLE `Salary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `staffId` INTEGER NOT NULL,
    `payDate` DATETIME(3) NOT NULL,
    `bonus` DECIMAL(10, 2) NULL,
    `netPay` DECIMAL(10, 2) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `taxes` DECIMAL(10, 2) NULL,
    `taxType` ENUM('FIXED', 'PERCENTAGE') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrainingPlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `durationType` ENUM('MONTH', 'DAY') NOT NULL,
    `durationAmount` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `discountAmount` DECIMAL(10, 2) NULL,
    `discountType` ENUM('FIXED', 'PERCENTAGE') NULL,
    `trainerCommissionAmount` DECIMAL(10, 2) NULL,
    `StaffCommissionType` ENUM('PERCENTAGE', 'FIXED') NULL,
    `companyId` INTEGER NOT NULL,
    `staffId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Client_privateNumber_key` ON `Client`(`privateNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Client_phoneNumber_key` ON `Client`(`phoneNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Staff_privateNumber_key` ON `Staff`(`privateNumber`);

-- AddForeignKey
ALTER TABLE `Salary` ADD CONSTRAINT `Salary_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrainingPlan` ADD CONSTRAINT `TrainingPlan_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrainingPlan` ADD CONSTRAINT `TrainingPlan_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_trainingPlanId_fkey` FOREIGN KEY (`trainingPlanId`) REFERENCES `TrainingPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
