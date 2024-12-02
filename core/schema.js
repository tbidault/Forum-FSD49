//const { defineTable } = require('drizzle-orm');

import { pgTable, pgEnum, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const sections = pgTable("sections", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type").notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
});

export const threads = pgTable("threads", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  section_id: uuid('section_id').notNull().references(() => sections.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow(),
});

const rolesEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    avatar_url: text("avatar_url"),
    role: rolesEnum("role").default('user').notNull(),
    created_at: timestamp("created_at").defaultNow(),
  });

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  //author: text("author").notNull().references(() => users.username),
  //author_id: uuid('author_id').notNull().references(() => users.id),
  author_id: uuid("author_id").references(() => users.id, { onDelete: "cascade" }),
  content: text('content').notNull(),
  thread_id: uuid('thread_id').notNull().references(() => threads.id, { onDelete: "cascade" }),
  //section_id: uuid('section_id').notNull().references(() => sections.id),
  publication_date: timestamp("publication_date").defaultNow(),
  modification_date: timestamp("modification_date"),
});

export const rooms = pgTable('rooms', {
  id: uuid('id').defaultRandom().primaryKey(), // Identifiant unique du salon
});

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),  // Identifiant unique pour chaque message
  content: text('content').notNull(),           // Contenu du message
  author: uuid('author').references(() => users.id).notNull(),  // Référence à l'auteur du message
  roomId: uuid('roomId').references(() => rooms.id).notNull(),  // Référence au salon du message
  date: timestamp('date').defaultNow().notNull()  // Date et heure du message
});