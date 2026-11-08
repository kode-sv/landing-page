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
import { AccordionGallery } from "./AccordionGallery";

type CapabilityId =
  | "database"
  | "development"
  | "web"
  | "desktop"
  | "mobile"
  | "ai"
  | "design"
  | "security"
  | "cloud";

type Capability = {
  id: CapabilityId;
  section: string;
  short: string;
  detail: string;
  points: string[];
};

const CAPABILITY_ICONS: Record<CapabilityId, IconType> = {
  database: AiFillDatabase,
  development: FaCode,
  web: BsLaptop,
  desktop: IoDesktop,
  mobile: FaMobile,
  ai: GrGenai,
  design: FaPencil,
  security: TbShieldLockFilled,
  cloud: MdCloud,
};

export function ServiceCards() {
  const t = useTranslations();
  const icons = useTranslations("home.hero.icons");
  const capabilities = t.raw("home.services.capabilities") as Capability[];

  return (
    <AccordionGallery
      items={capabilities.map((s) => {
        const Icon = CAPABILITY_ICONS[s.id];
        return {
          id: s.id,
          section: s.section,
          label: icons(s.id),
          description: s.short,
          detail: s.detail,
          points: s.points,
          href: "/services",
          icon: <Icon aria-hidden />,
        };
      })}
      ctaLabel={t("common.learnMore")}
      defaultIndex={0}
      height={580}
      expandRatio={0.4}
      trigger="hover"
      gap={8}
      radius={16}
      tilt={0}
      accentColor="#a6e1fa"
      overlayColor="#001c55"
      textColor="#ffffff"
    />
  );
}
