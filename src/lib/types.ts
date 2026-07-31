export type BadgeVariant = "gold" | "silver" | "bronze" | "plain";

export type Person = {
  name: string;
  activity: string;
  value: number;
  avatarSrc?: string;
};

export type StatEntry = Person & {
  rank: number;
  badge: BadgeVariant;
};
