import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: 'イベント集客フォーム',
  description:  'イベント集客フォームサンプル',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
      >
        <h1 className="bg-yellow-300 p-3 text-center">イベント集客フォーム</h1>
        
        {children}
      </body>
    </html>
  );
}
