import db from '../db.js';
import { users } from '../schema.js';
import { eq } from "drizzle-orm";

export const selectUsers = async () => {
    return db.select().from(users);
}

export const selectUserById = async (id) => {
    return db.select().from(users).where(eq(users.id, id));
}

export const selectUserByName = async (username) => {
    return db.select().from(users).where(eq(users.username, username));
}

export const pushUser = async (newUser) => {
    return await db.insert(users).values(newUser).returning();
}

export const deleteUser = async (id) => {
    return await db.delete(users).where(eq(users.id, id)).returning();
}

export const updateUser = async (id, newContent) => {
    return await db.update(users).set(newContent).where(eq(users.id, id)).returning();
}