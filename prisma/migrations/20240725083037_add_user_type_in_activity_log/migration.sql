/*
  Warnings:

  - Added the required column `userType` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ActivityLog` ADD COLUMN `userType` ENUM('STAFF', 'CLIENT', 'SUPERUSER', 'ADMIN', 'CRON_JOB') NOT NULL;
