'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../../db';
import { users, comments, PrivacyExtensionInteraction, interactionData } from '../../db/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function createUser(userId: string, email: string, duration: number) {
    return await db.insert(users).values({ userId, email, creationDuration: duration });
}

export async function createInteractionData(userId: string) {
    return await db.insert(interactionData).values({ userId }).onConflictDoNothing();
}

export async function handleDeleteButtonClicked(userId: string) {
    await db.update(users).set({ deleteButtonClicked: true }).where(eq(users.userId, userId));
}

export async function addCookiesState(userId: string, accepted: boolean) {
    await db.update(interactionData).set({ cookiesAccepted: accepted }).where(eq(interactionData.userId, userId));
}

export async function handleSubmitComment(userId: string, article: string, name: string, comment: string) {
    await db.insert(comments).values({ userId, article, name, comment });
    revalidatePath(`/article/${article}`);
}

export async function handlePrivacyPolicyClicked(userId: string) {
    await db.update(interactionData).set({ privacyPolicyClicked: true }).where(eq(interactionData.userId, userId));
}

export async function handlePrivacyExtensionButtonClicked(privacyInteractionData: PrivacyExtensionInteraction) {
    await db
        .update(interactionData)
        .set(privacyInteractionData)
        .where(eq(interactionData.userId, privacyInteractionData.userId));
}

export async function getLatestUserFromId(userId: string) {
    // by createdAt
    // const user = await db.select().from(users).where(eq(users.userId, userId));
    const user = await db.select().from(users).where(eq(users.userId, userId)).orderBy(desc(users.createdAt)).limit(1);
    if (user.length === 0) return null;
    else return user[0];
}

export async function userInteractedWithCookies(userId: string): Promise<boolean> {
    const user = await db.select().from(interactionData).where(eq(interactionData.userId, userId));
    const cookiesAccepted = user[0]?.cookiesAccepted;
    if (cookiesAccepted === null || cookiesAccepted === undefined) return false;
    return true;
}

export async function navigate(path: string) {
    redirect(path);
}
