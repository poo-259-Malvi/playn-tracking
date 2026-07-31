import type { BadgeVariant, Person, StatEntry } from "./types";

function badgeForLoggedIndex(index: number): BadgeVariant {
  if (index === 0) return "gold";
  if (index === 1) return "silver";
  if (index === 2) return "bronze";
  return "plain";
}

export function buildLeaderboard(loggedPeople: Person[], notLoggedPeople: Person[]) {
  const sortedLogged = [...loggedPeople].sort((a, b) => b.value - a.value);
  const sortedNotLogged = [...notLoggedPeople].sort((a, b) => b.value - a.value);

  const logged: StatEntry[] = sortedLogged.map((person, index) => ({
    ...person,
    rank: index + 1,
    badge: badgeForLoggedIndex(index),
  }));

  const notLogged: StatEntry[] = sortedNotLogged.map((person, index) => ({
    ...person,
    rank: sortedLogged.length + index + 1,
    badge: "plain",
  }));

  return { logged, notLogged };
}
