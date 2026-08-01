import { dateKey } from "./date";

export type Profile = {
  name: string;
  goal: string;
  avatarDataUrl: string | null;
  loggedDates: string[];
};

const STORAGE_KEY = "playn:profile";

export function todayKey(): string {
  return dateKey(new Date());
}

export function isLoggedOn(profile: Profile, date: Date): boolean {
  return profile.loggedDates.includes(dateKey(date));
}

export function withLoggedDate(profile: Profile, date: Date): Profile {
  const key = dateKey(date);
  if (profile.loggedDates.includes(key)) return profile;
  return { ...profile, loggedDates: [...profile.loggedDates, key] };
}

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return {
      name: parsed.name ?? "",
      goal: parsed.goal ?? "",
      avatarDataUrl: parsed.avatarDataUrl ?? null,
      loggedDates: Array.isArray(parsed.loggedDates) ? parsed.loggedDates : [],
    };
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
