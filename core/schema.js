//const { defineTable } = require('drizzle-orm');

import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const sections = pgTable("sections", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type").notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
});

export const threads = pgTable("threads", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  section_id: uuid('section_id').notNull().references(() => sections.id),
  created_at: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    created_at: timestamp("created_at").defaultNow(),
  });

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  //author: text("author").notNull().references(() => users.username),
  //author_id: uuid('author_id').notNull().references(() => users.id),
  author_id: uuid('author_id').references(() => users.id),
  content: text('content').notNull(),
  thread_id: uuid('thread_id').notNull().references(() => threads.id),
  //section_id: uuid('section_id').notNull().references(() => sections.id),
  publication_date: timestamp("publication_date").defaultNow(),
  modification_date: timestamp("modification_date"),
});
