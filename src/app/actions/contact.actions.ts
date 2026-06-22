"use server";

import { ContactMessage } from "@/lib/types";
import {
  dbGetAllMessages,
  dbGetUnreadMessages,
  dbMarkMessageRead,
  dbDeleteMessage,
  dbSaveMessage,
} from "@/lib/repositories/contact.repo";
import { revalidatePath } from "next/cache";

export async function getUnreadMessagesAction() {
  return dbGetUnreadMessages();
}

export async function getAllMessagesAction() {
  return dbGetAllMessages();
}

export async function markMessageReadAction(id: string) {
  await dbMarkMessageRead(id);
  revalidatePath("/admin/messages"); // revalidate the page that shows messages
}

export async function deleteMessageAction(id: string) {
  await dbDeleteMessage(id);
  revalidatePath("/admin/messages");
}

export async function submitContactFormAction(
  payload: Omit<ContactMessage, "id" | "created_at">
) {
  return dbSaveMessage(payload);
}