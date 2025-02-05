import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import LanguageChanger from "./components/LocaleSwitcher";
import { Providers } from "./services/providers";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <script
                    defer
                    src="https://code.responsivevoice.org/responsivevoice.js?key=yOcYEFHw"
                />
            </head>
            <NextIntlClientProvider messages={messages}>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    {/* <LanguageChanger /> */}
                    <Providers>{children}</Providers>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
