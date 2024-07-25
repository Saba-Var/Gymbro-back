/*
  Warnings:

  - You are about to drop the column `description` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Permission` table. All the data in the column will be lost.
  - Added the required column `key` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Permission_name_key` ON `Permission`;

-- AlterTable
ALTER TABLE `Permission` DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `key` VARCHAR(50) NOT NULL;
