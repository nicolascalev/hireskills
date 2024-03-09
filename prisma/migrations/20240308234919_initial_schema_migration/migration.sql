-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `full_name` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `avatar_url` TEXT NULL,
    `location` VARCHAR(191) NULL,
    `started_coding` DATETIME(3) NULL,
    `started_professional_experience` DATETIME(3) NULL,
    `portfolio_url` VARCHAR(191) NULL,
    `linkedin_username` VARCHAR(191) NULL,
    `github_username` VARCHAR(191) NULL,
    `leetcode_username` VARCHAR(191) NULL,
    `summary` TEXT NULL,
    `job_seeking` BOOLEAN NOT NULL DEFAULT false,
    `display_job_seeking` BOOLEAN NOT NULL DEFAULT false,
    `display_github_activity` BOOLEAN NOT NULL DEFAULT false,
    `display_email` BOOLEAN NOT NULL DEFAULT false,
    `display_public_resume` BOOLEAN NOT NULL DEFAULT false,
    `display_active_open_source` BOOLEAN NOT NULL DEFAULT false,
    `is_spotlight_participant` BOOLEAN NOT NULL DEFAULT false,
    `default_resume_id` VARCHAR(191) NULL,
    `career` JSON NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resumes` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `url` TEXT NOT NULL,
    `key` TEXT NOT NULL,
    `original_filename` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tools` (
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `label` VARCHAR(191) NOT NULL,
    `publish_date` DATETIME(3) NOT NULL,
    `time_spent` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `code_repository` VARCHAR(191) NULL,
    `level` ENUM('basic', 'intermediate', 'advanced') NOT NULL,
    `is_public` BOOLEAN NOT NULL DEFAULT true,
    `is_used_by_people` BOOLEAN NOT NULL DEFAULT false,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `summary` VARCHAR(191) NOT NULL,
    `problem` TEXT NULL,
    `solution` TEXT NULL,
    `challenge_example` TEXT NULL,
    `developer_id` VARCHAR(191) NOT NULL,
    `like_count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_likes` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `project_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_comments` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `project_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `replied_to_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `spotlights` (
    `id` VARCHAR(191) NOT NULL,
    `starts_at` DATETIME(3) NOT NULL,
    `finishes_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ToolToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ToolToUser_AB_unique`(`A`, `B`),
    INDEX `_ToolToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SkillToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SkillToUser_AB_unique`(`A`, `B`),
    INDEX `_SkillToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectToTool` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProjectToTool_AB_unique`(`A`, `B`),
    INDEX `_ProjectToTool_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectToSkill` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProjectToSkill_AB_unique`(`A`, `B`),
    INDEX `_ProjectToSkill_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SpotlightToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SpotlightToUser_AB_unique`(`A`, `B`),
    INDEX `_SpotlightToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resumes` ADD CONSTRAINT `resumes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_developer_id_fkey` FOREIGN KEY (`developer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_likes` ADD CONSTRAINT `project_likes_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_likes` ADD CONSTRAINT `project_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_comments` ADD CONSTRAINT `project_comments_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_comments` ADD CONSTRAINT `project_comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_comments` ADD CONSTRAINT `project_comments_replied_to_id_fkey` FOREIGN KEY (`replied_to_id`) REFERENCES `project_comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ToolToUser` ADD CONSTRAINT `_ToolToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `tools`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ToolToUser` ADD CONSTRAINT `_ToolToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SkillToUser` ADD CONSTRAINT `_SkillToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `skills`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SkillToUser` ADD CONSTRAINT `_SkillToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToTool` ADD CONSTRAINT `_ProjectToTool_A_fkey` FOREIGN KEY (`A`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToTool` ADD CONSTRAINT `_ProjectToTool_B_fkey` FOREIGN KEY (`B`) REFERENCES `tools`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToSkill` ADD CONSTRAINT `_ProjectToSkill_A_fkey` FOREIGN KEY (`A`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToSkill` ADD CONSTRAINT `_ProjectToSkill_B_fkey` FOREIGN KEY (`B`) REFERENCES `skills`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SpotlightToUser` ADD CONSTRAINT `_SpotlightToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `spotlights`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SpotlightToUser` ADD CONSTRAINT `_SpotlightToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
