"use client";

import { AutoTranslate, LanguageProvider } from "@/lib/i18n";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AutoTranslate />
      {children}
    </LanguageProvider>
  );
}
