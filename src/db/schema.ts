import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

import { type InferSelectModel } from "drizzle-orm";

import { createId } from '@paralleldrive/cuid2'

const ROLES_ENUM = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

const roleTuple = Object.values(ROLES_ENUM) as [string, ...string[]];

const commonColumns = {
  id: text().primaryKey().$defaultFn(() => createId()).notNull(),
  createdAt: integer({
    mode: "timestamp",
  }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer({
    mode: "timestamp",
  }).$onUpdateFn(() => new Date()).notNull(),
}

export const userTable = sqliteTable("user", {
  ...commonColumns,
  firstName: text({
    length: 255,
  }),
  lastName: text({
    length: 255,
  }),
  email: text({
    length: 255,
  }).unique(),
  passwordHash: text(),
  role: text({
    enum: roleTuple,
  }).default(ROLES_ENUM.USER).notNull(),
});

export type User = InferSelectModel<typeof userTable>;
