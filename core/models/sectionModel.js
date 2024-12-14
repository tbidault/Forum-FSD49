import db from '../db.js';
import { sections } from '../schema.js';
import { eq } from "drizzle-orm";

export const selectSections = async () => {
    return db.select().from(sections);
}

export const selectSectionById = async (id) => {
    return db.select().from(sections).where(eq(sections.id, id));
}

export const pushSection = async (newSection) => {
    return await db.insert(sections).values(newSection).returning();
}

export const deleteSection = async (id) => {
    return await db.delete(sections).where(eq(sections.id, id)).returning();
}

export const updateSection = async (id, updatedData) => {
    return await db.update(sections).set(updatedData).where(eq(sections.id, id)).returning();
}
