import db from '../db.js';
import { posts } from '../schema.js';
import { eq, desc } from "drizzle-orm";

export const selectPosts = async () => {
    return db.select().from(posts);
};

export const selectPostById = async (id) => {
    return db.select().from(posts).where(eq(posts.id, id));
};

export const selectPostByAuthorId = async (id) => {
    return db.select().from(posts).where(eq(posts.author_id, id));
};

export const selectPostByThreadId = async (id) => {
    return db.select().from(posts).where(eq(posts.thread_id, id));
};

export const selectLatestPostByThreadId = async (id) => {
    return db
    .select()
    .from(posts)
    .where(eq(posts.thread_id, id))
    .orderBy(desc(posts.publication_date))
    .limit(1);
};

export const pushPost = async (newPost) => {
    return await db.insert(posts).values(newPost).returning();
};

export const deletePostById = async (id) => {
    return await db.delete(posts).where(eq(posts.id, id)).returning();
};

export const updatePostById = async (id, newContent) => {
    const modificationDate = new Date();
    modificationDate.setHours(modificationDate.getHours() + 2);
    return await db
        .update(posts)
        .set({
            ...newContent, 
            modification_date: modificationDate
        })
        .where(eq(posts.id, id))
        .returning();
};
