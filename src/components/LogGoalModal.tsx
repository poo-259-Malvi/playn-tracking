"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { StatEntry } from "@/lib/types";
import { saveProfile, todayKey, type Profile } from "@/lib/profile";
import { RankBadge } from "./RankBadge";

const fieldClass =
  "w-full rounded-[24px] border border-white/12 bg-white/10 px-[21px] py-[11px] text-[16px] text-white outline-none placeholder:text-[#717680] focus:border-white/30";

const actionButtonClass =
  "flex w-full items-center justify-center gap-4 rounded-[24px] border border-white/12 bg-white/10 px-[21px] py-[11px] transition-colors hover:bg-white/15";

const actionLabelClass =
  "font-[family-name:var(--font-inter-tight)] text-xs font-semibold tracking-[3px] text-white uppercase";

export function LogGoalModal({
  profile,
  youEntry,
  onClose,
  onSaved,
}: {
  profile: Profile | null;
  youEntry: StatEntry | null;
  onClose: () => void;
  onSaved: (profile: Profile) => void;
}) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !goal.trim()) return;
    const next: Profile = {
      name: name.trim(),
      goal: goal.trim(),
      avatarDataUrl,
      streak: 1,
      lastLoggedDate: todayKey(),
    };
    saveProfile(next);
    onSaved(next);
  }

  function handleDoneForToday() {
    if (!profile) return;
    const today = todayKey();
    const next: Profile =
      profile.lastLoggedDate === today
        ? profile
        : { ...profile, streak: profile.streak + 1, lastLoggedDate: today };
    saveProfile(next);
    onSaved(next);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(2,3,3,0.4)] p-4 backdrop-blur-[17px]"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[400px] flex-col items-center gap-6 rounded-[24px] border border-white/12 bg-white/10 px-[21px] pt-[33px] pb-[21px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="font-[family-name:var(--font-bitcount)] text-[32px] leading-none font-normal text-white"
          style={{ fontVariationSettings: '"CRSV" 0, "ELSH" 0, "ELXP" 0' }}
        >
          Log on Playn
        </p>

        {profile ? (
          <>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-[#e9eaeb]">
                  <Image
                    src={profile.avatarDataUrl ?? "/design/avatar.png"}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[17px] font-medium text-[#e9eaeb]">
                    {profile.name}
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] tracking-[-0.14px] text-[#929098]">
                    {profile.goal}
                  </p>
                </div>
              </div>
              {youEntry && <RankBadge variant={youEntry.badge} value={youEntry.value} />}
            </div>

            <button type="button" onClick={handleDoneForToday} className={actionButtonClass}>
              <Image src="/design/check.svg" alt="" width={18} height={13} />
              <span className={actionLabelClass}>Done for today</span>
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-6">
            <div className="relative size-[108px] shrink-0">
              <div className="size-full overflow-hidden rounded-full border-[2.5px] border-white bg-[#C4C4C4]">
                {avatarDataUrl && (
                  <Image src={avatarDataUrl} alt="" width={108} height={108} className="size-full object-cover" />
                )}
              </div>
              <button
                type="button"
                aria-label="Upload photo"
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-0 bottom-0 flex items-center justify-center rounded-full border-2 border-[#e9eaeb] bg-white p-[6px]"
              >
                <Image src="/design/edit-image.svg" alt="" width={14} height={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-[6px]">
                <label htmlFor="log-goal-name" className="text-[14px] font-medium text-white">
                  Your Name
                </label>
                <input
                  id="log-goal-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className={fieldClass}
                />
              </div>

              <div className="flex w-full flex-col items-start gap-[6px]">
                <label htmlFor="log-goal-goal" className="text-[14px] font-medium text-white">
                  Your Goal
                </label>
                <input
                  id="log-goal-goal"
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Enter your goal"
                  required
                  className={fieldClass}
                />
              </div>
            </div>

            <button type="submit" className={actionButtonClass}>
              <Image src="/design/plus.svg" alt="" width={20} height={20} />
              <span className={actionLabelClass}>Log your goal</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
