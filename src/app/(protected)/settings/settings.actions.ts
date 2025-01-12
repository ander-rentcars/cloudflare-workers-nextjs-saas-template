"use server";

import { createServerAction, ZSAError } from "zsa";
import { getDB } from "@/db";
import { userTable } from "@/db/schema";
import { getSessionFromCookie, updateAllSessionsOfUser } from "@/utils/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { userSettingsSchema } from "@/schemas/settings.schema";

export const updateUserProfileAction = createServerAction()
  .input(userSettingsSchema)
  .handler(async ({ input }) => {
    const session = await getSessionFromCookie();

    if (!session) {
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "Not authenticated"
      );
    }

    const db = await getDB();

    try {
      await db.update(userTable)
        .set({
          ...input,
        })
        .where(eq(userTable.id, session.user.id));

      await updateAllSessionsOfUser(session.user.id)

      revalidatePath("/settings");
      return { success: true };
    } catch (error) {
      throw new ZSAError(
        "INTERNAL_SERVER_ERROR",
        "Failed to update profile"
      );
    }
  });
