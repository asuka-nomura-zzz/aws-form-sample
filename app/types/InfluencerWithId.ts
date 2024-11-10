import { Influencer } from "./Influencer";

type Id = {
  id: string;
  created_at: number;
}

export type InfluencerWithId = Id & Influencer