import type { Metadata } from "next";
import { AppWrapper } from "./hooks/useAppContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getTimeslotsFromAws } from "./utils/getTimeslotsFromAws";
import { Timeslot } from "./types/Timeslot";
import { getInfluencersFromAws } from "./utils/getInfluencers";
import Link from "next/link";
import { InfluencerWithId } from "./types/InfluencerWithId";


export const metadata: Metadata = {
  title: 'aws form sample',
  description: 'aws form sample',
};

export const revalidate = 0;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const timeslotsFromAws: Timeslot[] = await getTimeslotsFromAws()
  const influencersFromAws: InfluencerWithId[] = await getInfluencersFromAws()

  return (
    <AppWrapper timeslotsFromAws={timeslotsFromAws} influencersFromAws={influencersFromAws} >
      <html lang="ja">
        <body className="antialiased">
          <div className="max-w-8xl mx-auto min-h-screen my-10 xl:mx-auto p-6 bg-white">
            <Link href="/"><h1 className="p-3 text-center font-bold text-2xl mb-16">Asuka Nomura&apos;s Work Sample</h1></Link>
            {children}
          </div>
          <Toaster position="bottom-center" reverseOrder={false} />
        </body>
      </html>
    </AppWrapper>
  );
}
