"use client";

import type { ComponentProps, MouseEvent } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { scrollToId, setPendingScroll } from "@/lib/scroll-to";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  section: string;
};

function pathOnly(href: string): string {
  return href.split("?")[0] ?? "";
}

export function SectionLink({ href, section, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const samePage = pathOnly(href) === pathname;
    if (samePage) {
      e.preventDefault();
      scrollToId(section);
      return;
    }

    e.preventDefault();
    setPendingScroll(section);
    router.push(href);
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}
