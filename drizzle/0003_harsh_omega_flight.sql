CREATE TABLE `production_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`frontId` int NOT NULL,
	`serviceId` int NOT NULL,
	`dailyLogId` int,
	`quantity` decimal(12,2) NOT NULL,
	`unit` varchar(20) NOT NULL,
	`entryDate` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `production_entries_id` PRIMARY KEY(`id`)
);
