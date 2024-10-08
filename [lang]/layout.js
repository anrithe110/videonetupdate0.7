import "@/styles/globals.css";
import SessionWrapper from "@/src/SessionWrapper";
import { NextIntlClientProvider, useMessages } from "next-intl";
export default function LocaleLayout(
  { children, params: { locale } },
  session
) {
  const messages = useMessages();
  return (
    <SessionWrapper session={session}>
      <html lang={locale}>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body>{children}</body>
        </NextIntlClientProvider>
      </html>
    </SessionWrapper>
  );
}
