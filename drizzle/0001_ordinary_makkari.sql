CREATE TABLE `actions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`eventId` int,
	`title` varchar(200) NOT NULL,
	`ownerName` varchar(160),
	`dueAt` timestamp,
	`priority` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
	`status` enum('open','in_progress','done','overdue') NOT NULL DEFAULT 'open',
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `actions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `attachments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`dailyLogId` int,
	`eventId` int,
	`actionId` int,
	`fileName` varchar(255) NOT NULL,
	`fileKey` varchar(500) NOT NULL,
	`fileUrl` varchar(700) NOT NULL,
	`mimeType` varchar(120),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `attachments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`authorId` int NOT NULL,
	`logDate` timestamp NOT NULL,
	`summary` text,
	`weather` varchar(80),
	`workforce` int,
	`workedHours` decimal(6,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `daily_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`frontId` int,
	`serviceId` int,
	`dailyLogId` int,
	`title` varchar(200) NOT NULL,
	`description` text,
	`category` varchar(40) NOT NULL,
	`severity` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
	`status` varchar(40) NOT NULL DEFAULT 'open',
	`impact` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`client` varchar(160),
	`location` varchar(200),
	`description` text,
	`status` enum('planned','active','paused','completed') NOT NULL DEFAULT 'planned',
	`ownerId` int NOT NULL,
	`startDate` timestamp,
	`endDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`frontId` int NOT NULL,
	`name` varchar(160) NOT NULL,
	`unit` varchar(20) NOT NULL,
	`plannedQty` decimal(12,2) NOT NULL DEFAULT '0',
	`executedQty` decimal(12,2) NOT NULL DEFAULT '0',
	`status` varchar(40) NOT NULL DEFAULT 'planned',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `work_fronts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`name` varchar(160) NOT NULL,
	`code` varchar(40),
	`status` enum('planned','active','attention','blocked','completed') NOT NULL DEFAULT 'planned',
	`progress` decimal(5,2) NOT NULL DEFAULT '0',
	`currentState` text,
	`nextStep` text,
	`advanceCondition` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `work_fronts_id` PRIMARY KEY(`id`)
);
