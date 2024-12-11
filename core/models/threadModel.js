import db from '../db.js';
import { threads } from '../schema.js';
import { eq } from "drizzle-orm";

export const selectThreads = async () => {
    return db.select().from(threads);
}

export const selectThreadById = async (id) => {
    return db.select().from(threads).where(eq(threads.id, id));
}

export const selectThreadsBySectionId = async (id) => {
    return db.select().from(threads).where(eq(threads.section_id, id));
}
export const selectThreadByTitle = async (title) => {
    return db.select().from(threads).where(eq(threads.title, title));
}

export const pushThread = async (newthread) => {
    console.log('in pushThread', newthread)
    return await db.insert(threads).values(newthread).returning();
}

export const deleteThread = async (id) => {
    return await db.delete(threads).where(eq(threads.id, id)).returning();
}

export const updateThread = async (id, newContent) => {
    return await db.update(threads).set(newContent).where(eq(threads.id, id)).returning();
}