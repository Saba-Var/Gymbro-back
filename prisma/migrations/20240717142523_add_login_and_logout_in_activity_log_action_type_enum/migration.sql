-- AlterTable
ALTER TABLE `ActivityLog` MODIFY `actionType` ENUM('CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LOGIN', 'LOGOUT') NOT NULL;

-- AlterTable
ALTER TABLE `Subscription` ALTER COLUMN `startDate` DROP DEFAULT;
