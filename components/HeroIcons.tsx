"use client";

import type { IconType } from "react-icons";
import { useTranslations } from "next-intl";
import { AiFillDatabase } from "react-icons/ai";
import { BsLaptop } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { FaMobile, FaPencil } from "react-icons/fa6";
import { GrGenai } from "react-icons/gr";
import { IoDesktop } from "react-icons/io5";
import { MdCloud } from "react-icons/md";
import { TbShieldLockFilled } from "react-icons/tb";

const TILE =
  "relative grid h-11 w-11 shrink-0 place-items-center rounded-md " +
  "border border-white/70 " +
  "bg-[linear-gradient(145deg,rgba(255,255,255,0.92)_0%,rgba(166,225,250,0.55)_38%,rgba(201,212,238,0.4)_68%,rgba(255,255,255,0.25)_100%)] " +
  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-10px_18px_rgba(10,36,114,0.12)] " +
  "backdrop-blur-xl " +
  "transition-transform duration-300 " +
  "group-hover/icon:-translate-y-1";

const TOOLTIP =
  "pointer-events-none absolute bottom-[calc(100%+0.65rem)] left-1/2 z-20 -translate-x-1/2 " +
  "whitespace-nowrap rounded-md px-3.5 py-1.5 " +
  "border border-white/70 " +
  "bg-[linear-gradient(145deg,rgba(255,255,255,0.95)_0%,rgba(166,225,250,0.65)_45%,rgba(201,212,238,0.45)_100%)] " +
  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-6px_12px_rgba(10,36,114,0.1)] " +
  "backdrop-blur-xl " +
  "font-sans text-xs font-semibold tracking-wide text-royal " +
  "opacity-0 scale-95 translate-y-1 " +
  "transition-[opacity,transform] duration-200 " +
  "group-hover/icon:opacity-100 group-hover/icon:scale-100 group-hover/icon:translate-y-0 " +
  "group-focus-within/icon:opacity-100 group-focus-within/icon:scale-100 group-focus-within/icon:translate-y-0";

const ICONS: { Icon: IconType; key: "database" | "development" | "mobile" | "ai" | "design" | "security" | "cloud" | "desktop" | "web" }[] = [
  { Icon: AiFillDatabase, key: "database" },
  { Icon: FaCode, key: "development" },
  { Icon: BsLaptop, key: "web" },
  { Icon: IoDesktop, key: "desktop" },
  { Icon: FaMobile, key: "mobile" },
  { Icon: GrGenai, key: "ai" },
  { Icon: FaPencil, key: "design" },
  { Icon: TbShieldLockFilled, key: "security" },
  { Icon: MdCloud, key: "cloud" },
];

function GlassShine() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-md"
      >
        <span className="absolute -left-1/4 -top-1/3 h-[70%] w-[150%] rotate-[-18deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.35)_42%,transparent_70%)] opacity-90" />
        <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white/80 blur-md opacity-90" />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[2px] rounded-[0.3rem] border border-white/50"
      />
    </>
  );
}

export function HeroIcons() {
  const t = useTranslations("home.hero.icons");

  return (
    <ul className="mt-8 flex flex-nowrap items-center gap-1.5 sm:gap-2">
      {ICONS.map(({ Icon, key }) => (
        <li key={key} className="group/icon relative shrink-0">
          <button
            type="button"
            className={`${TILE} cursor-default`}
            aria-label={t(key)}
          >
            <GlassShine />
            <Icon className="relative z-[1] text-[1.15rem] text-royal drop-shadow-[0_1px_0_rgba(255,255,255,0.75)] sm:text-[1.25rem]" />
          </button>
          <span className={TOOLTIP} role="tooltip">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[1px] rounded-md border border-white/45"
            />
            <span className="relative z-[1]">{t(key)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
