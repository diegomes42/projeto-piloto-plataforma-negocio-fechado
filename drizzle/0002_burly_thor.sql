CREATE TABLE `decisions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`eventId` int,
	`frontId` int,
	`serviceId` int,
	`title` varchar(200) NOT NULL,
	`description` text,
	`decidedBy` varchar(160),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `decisions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`actionId` int,
	`recipientId` int,
	`kind` varchar(40) NOT NULL,
	`title` varchar(200) NOT NULL,
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `summaries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`period` varchar(30) NOT NULL,
	`content` text NOT NULL,
	`riskCount` int NOT NULL DEFAULT 0,
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `summaries_id` PRIMARY KEY(`id`)
);
