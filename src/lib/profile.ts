export type Profile = {
  name: string;
  goal: string;
  avatarDataUrl: string | null;
  streak: number;
  lastLoggedDate: string;
};

const STORAGE_KEY = "playn:profile";

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
