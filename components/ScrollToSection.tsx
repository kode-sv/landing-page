"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { consumePendingScroll, scrollToId } from "@/lib/scroll-to";

export function ScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    const id = consumePendingScroll();
    if (id) scrollToId(id);
  }, [pathname]);

  return null;
}
