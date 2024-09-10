CREATE TABLE `comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` text,
	`article` text NOT NULL,
	`name` text NOT NULL,
	`comment` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `interactionData` (
	`userId` text PRIMARY KEY NOT NULL,
	`cookiesAccepted` integer,
	`privacyPolicyClicked` integer DEFAULT false NOT NULL,
	`collectionClicked` integer DEFAULT false NOT NULL,
	`sharingClicked` integer DEFAULT false NOT NULL,
	`controlClicked` integer DEFAULT false NOT NULL,
	`securityClicked` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` text,
	`email` text NOT NULL,
	`creationDuration` integer NOT NULL,
	`deleteButtonClicked` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
