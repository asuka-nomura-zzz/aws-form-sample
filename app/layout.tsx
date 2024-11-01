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
      <body className="bg-gray-100"
      >
        <div className="max-w-7xl min-h-44 mx-10 my-10 xl:mx-auto p-6 bg-white shadow-lg">
          <h1 className="p-3 text-center font-bold text-2xl">イベント集客フォーム</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
