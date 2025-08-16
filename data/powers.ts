export type Power = {
  id: string;
  name: string;
  description: string;
  effect:
    | "moreDamage"
    | "blockAll"
    | "heal"
    | "halfBlock"
    | "swapHealth"
    | "autoWin";
};

export const availablePowers: Power[] = [
  {
    id: "1",
    name: "More Damage",
    description: "Deal 10 more damage this round.",
    effect: "moreDamage",
  },
  {
    id: "2",
    name: "Full Block",
    description: "Block all incoming damage.",
    effect: "blockAll",
  },
  {
    id: "3",
    name: "Recover",
    description: "Recover 20 health.",
    effect: "heal",
  },
  {
    id: "4",
    name: "Half Block",
    description: "Block half incoming damage.",
    effect: "halfBlock",
  },
  {
    id: "5",
    name: "Health Swap",
    description: "Swap health bars with AI.",
    effect: "swapHealth",
  },
  {
    id: "6",
    name: "Auto Win",
    description: "Win the round regardless of choice.",
    effect: "autoWin",
  },
];
