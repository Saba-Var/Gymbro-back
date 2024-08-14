-- DropForeignKey
ALTER TABLE `CompanySubscription` DROP FOREIGN KEY `CompanySubscription_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Salary` DROP FOREIGN KEY `Salary_staffId_fkey`;

-- DropForeignKey
ALTER TABLE `StaffSubscription` DROP FOREIGN KEY `StaffSubscription_clientId_fkey`;

-- AddForeignKey
ALTER TABLE `Salary` ADD CONSTRAINT `Salary_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StaffSubscription` ADD CONSTRAINT `StaffSubscription_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanySubscription` ADD CONSTRAINT `CompanySubscription_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
