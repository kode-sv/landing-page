"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { scrollToId, setPendingScroll } from "@/lib/scroll-to";

import "./AccordionGallery.css";

export type AccordionGalleryItem = {
  id: string;
  label: string;
  description: string;
  href: string;
  /** Longer supporting copy shown when expanded. */
  detail?: string;
  /** Short highlights shown when expanded. */
  points?: string[];
  /** Anchor id on the destination page; falls back to `id`. */
  section?: string;
  icon?: ReactNode;
};

type AccordionGalleryProps = {
  items: AccordionGalleryItem[];
  ctaLabel: string;
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  duration?: number;
  ease?: string;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  className?: string;
};

function pathOnly(href: string): string {
  return href.split("?")[0] ?? "";
}

export function AccordionGallery({
  items,
  ctaLabel,
  defaultIndex = 1,
  accentColor = "#a6e1fa",
  overlayColor = "#001c55",
  textColor = "#ffffff",
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = "horizontal",
  duration = 0.6,
  ease = "power3.out",
  tilt = 8,
  stagger = 0.06,
  trigger = "hover",
  className = "",
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const collapsedRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const watermarkRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const detailRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const pointsRefs = useRef<(HTMLUListElement | null)[]>([]);
  const ctaRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const prefersReducedRef = useRef(false);

  const pathname = usePathname();
  const router = useRouter();

  const vertical = orientation === "vertical";
  const count = items.length;
  const [active, setActive] = useState(() =>
    count === 0 ? 0 : Math.min(Math.max(defaultIndex, 0), count - 1),
  );

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;

      tlRef.current?.kill();
      const reduce = prefersReducedRef.current;
      const dur = animate && !reduce ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const overlay = overlayRefs.current[i];
        const collapsed = collapsedRefs.current[i];
        const bar = barRefs.current[i];
        const watermark = watermarkRefs.current[i];
        const text = textRefs.current[i];
        const desc = descRefs.current[i];
        const detail = detailRefs.current[i];
        const points = pointsRefs.current[i];
        const cta = ctaRefs.current[i];

        const rot = tilt === 0 ? 0 : isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp =
          rot === 0
            ? { rotateX: 0, rotateY: 0 }
            : vertical
              ? { rotateX: -rot, rotateY: 0 }
              : { rotateY: rot, rotateX: 0 };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (overlay) {
          tl.to(overlay, { "--ag-dim": isActive ? 0 : 0.35, duration: dur, ease }, 0);
        }

        if (collapsed) {
          tl.to(collapsed, { opacity: isActive ? 0 : 1, duration: dur * 0.5, ease }, 0);
        }

        if (watermark) {
          tl.to(
            watermark,
            {
              opacity: isActive ? 0.95 : 0,
              duration: dur,
              ease,
            },
            0,
          );
        }

        const reveal = [bar, text, desc, detail, points, cta].filter(Boolean);
        if (reveal.length) {
          if (isActive) {
            tl.to(
              reveal,
              {
                opacity: 1,
                x: 0,
                duration: dur,
                ease,
                stagger: reduce ? 0 : stagger,
              },
              0,
            );
          } else {
            tl.to(reveal, { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [active, count, expandRatio, duration, ease, vertical, tilt, stagger],
  );

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    [],
  );

  const handleEnter = (i: number) => {
    if (trigger === "hover") setActive(i);
  };

  const handleClick = (i: number, item: AccordionGalleryItem, e: MouseEvent<HTMLAnchorElement>) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
      return;
    }

    const section = item.section ?? item.id;
    const samePage = pathOnly(item.href) === pathname;
    if (samePage) {
      e.preventDefault();
      scrollToId(section);
      return;
    }

    e.preventDefault();
    setPendingScroll(section);
    router.push(item.href);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  if (count === 0) return null;

  const rootStyle = {
    "--ag-accent": accentColor,
    "--ag-overlay": overlayColor,
    "--ag-text": textColor,
    "--ag-gap": `${gap}px`,
    "--ag-radius": `${radius}px`,
    height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? " accordion-gallery--vertical" : ""}${className ? ` ${className}` : ""}`}
      style={rootStyle}
      role="list"
      aria-label="Services"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <div
            key={item.id}
            role="listitem"
            className={`ag-panel-wrap${isActive ? " ag-panel-wrap--active" : ""}`}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
          >
          <Link
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.href}
            onClick={(e) => handleClick(i, item, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            aria-current={isActive ? "true" : undefined}
            aria-label={`${item.label}. ${item.description}`}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__overlay"
                ref={(el) => {
                  overlayRefs.current[i] = el;
                }}
                aria-hidden="true"
              />
            </span>

            {item.icon ? (
              <span
                className="ag-panel__watermark"
                ref={(el) => {
                  watermarkRefs.current[i] = el;
                }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
            ) : null}

            <span
              className="ag-panel__collapsed"
              ref={(el) => {
                collapsedRefs.current[i] = el;
              }}
              aria-hidden="true"
            >
              {item.icon ? <span className="ag-panel__collapsed-icon">{item.icon}</span> : null}
              <span className="ag-panel__collapsed-title">{item.label}</span>
            </span>

            <span className="ag-panel__body">
              <span className="ag-panel__label" aria-hidden="true">
                <span
                  className="ag-panel__bar"
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                />
                <span className="ag-panel__copy">
                  <span
                    className="ag-panel__text"
                    ref={(el) => {
                      textRefs.current[i] = el;
                    }}
                  >
                    {item.label}
                  </span>
                  <p
                    className="ag-panel__desc"
                    ref={(el) => {
                      descRefs.current[i] = el;
                    }}
                  >
                    {item.description}
                  </p>
                  {item.detail ? (
                    <p
                      className="ag-panel__detail"
                      ref={(el) => {
                        detailRefs.current[i] = el;
                      }}
                    >
                      {item.detail}
                    </p>
                  ) : null}
                  {item.points && item.points.length > 0 ? (
                    <ul
                      className="ag-panel__points"
                      ref={(el) => {
                        pointsRefs.current[i] = el;
                      }}
                    >
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                  <span
                    className="ag-panel__cta"
                    ref={(el) => {
                      ctaRefs.current[i] = el;
                    }}
                  >
                    {ctaLabel}
                    <FaLongArrowAltRight aria-hidden className="ag-panel__cta-icon" />
                  </span>
                </span>
              </span>
            </span>
          </Link>
          </div>
        );
      })}
    </div>
  );
}
