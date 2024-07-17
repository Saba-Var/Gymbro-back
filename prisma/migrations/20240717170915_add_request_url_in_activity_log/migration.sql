-- AlterTable
ALTER TABLE `ActivityLog` ADD COLUMN `requestUrl` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Subscription` ALTER COLUMN `startDate` DROP DEFAULT;
