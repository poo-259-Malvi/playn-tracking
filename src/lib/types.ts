export type BadgeVariant = "gold" | "silver" | "bronze" | "plain";

export type StatEntry = {
  rank: number;
  name: string;
  activity: string;
  badge: BadgeVariant;
  value: number;
};
