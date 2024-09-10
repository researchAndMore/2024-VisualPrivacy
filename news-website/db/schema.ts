import { InferSelectModel, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    userId: text('userId'),
    email: text('email').notNull(),
    creationDuration: integer('creationDuration').notNull(),
    deleteButtonClicked: integer('deleteButtonClicked', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('createdAt')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const interactionData = sqliteTable('interactionData', {
    userId: text('userId').primaryKey(),
    cookiesAccepted: integer('cookiesAccepted', { mode: 'boolean' }),
    privacyPolicyClicked: integer('privacyPolicyClicked', { mode: 'boolean' }).notNull().default(false),
    collectionClicked: integer('collectionClicked', { mode: 'boolean' }).notNull().default(false),
    sharingClicked: integer('sharingClicked', { mode: 'boolean' }).notNull().default(false),
    controlClicked: integer('controlClicked', { mode: 'boolean' }).notNull().default(false),
    securityClicked: integer('securityClicked', { mode: 'boolean' }).notNull().default(false),
});

export const comments = sqliteTable('comments', {
    id: integer('id').primaryKey(),
    userId: text('userId'),
    article: text('article').notNull(),
    name: text('name').notNull(),
    comment: text('comment').notNull(),
});

export type User = InferSelectModel<typeof users>;
export type Comment = InferSelectModel<typeof comments>;
export type PrivacyExtensionInteraction = {
    userId: string;
    collectionClicked?: boolean;
    sharingClicked?: boolean;
    controlClicked?: boolean;
    securityClicked?: boolean;
};
