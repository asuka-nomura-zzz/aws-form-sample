import type { Metadata } from "next";
import { supabase } from "./lib/createClient";
import { AppWrapper } from "./hooks/useAppContext";
import { getTimeslots } from "./utils/getTimeslots";
import { getTimeslotsFromAws } from "./utils/getTimeslotsFromAws";
import "./globals.css";
import { Timeslot } from "./types/Timeslot";

export const metadata: Metadata = {
  title: 'イベント集客フォーム',
  description:  'イベント集客フォームサンプル',
};

export const revalidate = 0;

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const fetchedData = await getTimeslots();
    
  const timeslots: Timeslot[] = (fetchedData ?? []).map(item => ({
    id: item.id as number,
    name: item.name as string,
    stock: item.stock as number,
  }));

  const timeslotsFromAws: Timeslot[] = await getTimeslotsFromAws()

  return (
    <AppWrapper timeslots={timeslots} timeslotsFromAws={timeslotsFromAws}>
      <html lang="ja">
        <body className="bg-gray-100">
          <div className="max-w-7xl min-h-44 mx-10 my-10 xl:mx-auto p-6 bg-white shadow-lg">
            <h1 className="p-3 text-center font-bold text-2xl">イベント集客フォーム</h1>
            {children}
          </div>
        </body>
      </html>
    </AppWrapper>
  );
}
