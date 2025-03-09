import "./globals.css";
import SwitchThemeBtn from "@/components/SwitchThemeBtn";
import { DarkModeProvider } from "@/context/DarkModeContext";

/*
  For the dark: modifier to work, include this !

  @custom-variant dark (&:where(.dark, .dark *));

  Into globals.css, located under src/app
  As documented in tailwindcss 4.0 doc: https://tailwindcss.com/docs/dark-mode
  "If you want your dark theme to be driven by a CSS selector instead of the prefers-color-scheme media query, 
  override the dark variant to use your custom selector:"
*/

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className=" p-20 dark:bg-slate-900 dark:text-slate-100">
        <DarkModeProvider>
          <SwitchThemeBtn></SwitchThemeBtn>
          {children}  
        </DarkModeProvider>
      </body>
    </html>
  );
}
