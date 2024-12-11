import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "../.env" });

export default defineConfig({
  schema: "./schema.js",
  out: "./newMigration",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL + '?sslmode=require',
  },
});
