import type { Metadata } from "next";
import { AppWrapper } from "./hooks/useAppContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { getTimeslots } from "./utils/getTimeslots";
import { getTimeslotsFromAws } from "./utils/getTimeslotsFromAws";
import { Timeslot } from "./types/Timeslot";
import { Influencer } from "./types/Influencer";
import { getInfluencersFromAws } from "./utils/getInfluencers";
import Link from "next/link";
import { InfluencerWithId } from "./types/InfluencerWithId";


export const metadata: Metadata = {
  title: 'Asuka Nomura Work Smaple',
  description: 'Asuka Nomura Work Smaple',
};

export const revalidate = 0;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fetchedData = await getTimeslots();

  const timeslots: Timeslot[] = (fetchedData ?? []).map(item => ({
    id: item.id as number,
    name: item.name as string,
    stock: item.stock as number,
  }));

  const timeslotsFromAws: Timeslot[] = await getTimeslotsFromAws()
  const influencersFromAws: InfluencerWithId[] = await getInfluencersFromAws()

  return (
    <AppWrapper timeslots={timeslots} timeslotsFromAws={timeslotsFromAws} influencersFromAws={influencersFromAws} >
      <html lang="ja">
        <body>
          <div className="max-w-5xl mx-auto min-h-screen my-10 xl:mx-auto p-6 bg-white">
            <Link href="/"><h1 className="p-3 text-center font-bold text-2xl mb-16">Asuka Nomura&apos;s Work Sample</h1></Link>
            {children}
          </div>
          <Toaster position="bottom-center" reverseOrder={false} />
        </body>
      </html>
    </AppWrapper>
  );
}
