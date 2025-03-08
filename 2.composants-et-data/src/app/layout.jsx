import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className=" bg-gray-400">
        {children}
      </body>
    </html>
  );
}
