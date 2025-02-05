"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale } from "@/app/i18n/config";

// Define the cookie name
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies(); // No `await` needed here
  return (cookieStore.get(COOKIE_NAME)?.value as Locale) || defaultLocale;
}

export async function setUserLocale(locale: Locale): Promise<void> {
  const cookieStore = await cookies(); // No `await` needed here
  cookieStore.set({
    name: COOKIE_NAME,
    value: locale,
    path: "/", // Ensure it's accessible across the app
    maxAge: 60 * 60 * 24 * 365, // Set to expire in 1 year
    secure: process.env.NODE_ENV === "production",
    httpOnly: false, // Allow client-side access if needed
    sameSite: "strict",
  });
}