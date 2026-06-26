import { pgTable, serial, text, timestamp, integer, boolean, numeric } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  level: text("level").notNull().default("일반"),
  status: text("status").notNull().default("활성"),
  joinDate: timestamp("join_date").defaultNow(),
});

export const contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  author: text("author").notNull(),
  views: integer("views").default(0),
  status: text("status").notNull().default("게시"),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id),
  donorName: text("donor_name").notNull(),
  amount: numeric("amount").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("완료"),
  date: timestamp("date").defaultNow(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id),
  requesterName: text("requester_name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("대기중"),
  manager: text("manager"),
  requestedAt: timestamp("requested_at").defaultNow(),
});

export const settings = pgTable("settings", {
  id: text("id").primaryKey(),
  orgName: text("org_name").notNull(),
  slogan: text("slogan"),
  logoUrl: text("logo_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});
