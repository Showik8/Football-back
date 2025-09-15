export type Player = {
  id: number;
  name: string;
  jersey: number;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward" | string;
  team: string;
  age?: number;
  nationality?: string;
  goal: number;
  assist: number;
  match_played?: number;
  view: number;
  yellow_cards?: number;
  red_cards?: number;
  height?: number;
  weight?: number;
  photo_url?: string;
};
