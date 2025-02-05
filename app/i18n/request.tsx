import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers"; // Use the async cookies() API

export default getRequestConfig(async () => {
  // Await cookies() to get the cookie values
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;

  // Validate the locale from the cookie or fall back to the default
  const locale =
    localeCookie && ["en", "tr"].includes(localeCookie) ? localeCookie : "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});