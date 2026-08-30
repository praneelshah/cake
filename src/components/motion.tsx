import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Fires once, when the node first scrolls into view. */
export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

/**
 * Writes a -1 to 1 scroll position onto the node as `--p`, where 0 means the
 * element sits dead centre of the viewport. Every scroll-linked effect on the
 * home page reads from this one variable.
 */
function useScrollProgressVar<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const centre = rect.top + rect.height / 2 - viewport / 2;
      const range = (viewport + rect.height) / 2;
      node.style.setProperty("--p", Math.max(-1, Math.min(1, centre / range)).toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return ref;
}

/* ------------------------------------------------------------------ */

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** How far the image drifts against the scroll, in px. */
  speed?: number;
  /** Overscale, so the drift never exposes an edge. Keep above 1 + speed / height. */
  scale?: number;
  /** Adds a clip-path wipe the first time the frame enters view. */
  wipe?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
};

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 70,
  scale = 1.3,
  wipe = true,
  priority = false,
  width = 1400,
  height = 1000,
}: ParallaxImageProps) {
  const parallaxRef = useScrollProgressVar<HTMLDivElement>();
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      parallaxRef.current = node;
      viewRef.current = node;
    },
    [parallaxRef, viewRef],
  );

  return (
    <div
      ref={setRefs}
      className={`parallax-frame ${inView ? "is-in" : ""} ${className}`}
      style={{ "--px-speed": `${speed}px`, "--px-scale": scale } as CSSProperties}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // The wipe goes on the image, never on the frame the observer watches:
        // an element clipped to zero height reports a zero intersection ratio,
        // so a non-zero threshold would never fire and it could never reveal
        // itself.
        className={`parallax-img ${wipe ? "parallax-wipe" : ""}`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Words from this index on render in italic. */
  italicFrom?: number;
};

/** Heading that lifts in word by word from behind a mask. */
export function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 55,
  italicFrom = -1,
}: SplitTextProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`split-text ${inView ? "is-in" : ""} ${className}`}>
      {words.map((word, i) => (
        // The space sits outside the mask on purpose. Inside an
        // overflow-hidden inline-block a trailing space is trimmed away, which
        // runs every word in the heading together.
        <Fragment key={`${word}-${i}`}>
          <span className="st-mask">
            <span className="st-word" style={{ transitionDelay: `${delay + i * stagger}ms` }}>
              {italicFrom >= 0 && i >= italicFrom ? <em>{word}</em> : word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */

/** Card that tips toward the pointer in 3D. No-ops on touch and reduced motion. */
export function TiltCard({
  children,
  className = "",
  strength = 7,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--rx", `${(-y * strength).toFixed(2)}deg`);
      node.style.setProperty("--ry", `${(x * strength).toFixed(2)}deg`);
      node.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
      node.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
    };
    const reset = () => {
      node.style.setProperty("--rx", "0deg");
      node.style.setProperty("--ry", "0deg");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Wrapper that leans its child toward the cursor as it approaches. */
export function Magnetic({
  children,
  className = "",
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      node.style.setProperty("--mag-x", `${(x * strength).toFixed(2)}px`);
      node.style.setProperty("--mag-y", `${(y * strength).toFixed(2)}px`);
    };
    const reset = () => {
      node.style.setProperty("--mag-x", "0px");
      node.style.setProperty("--mag-y", "0px");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1600,
  className = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setShown(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo: quick off the line, long settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setShown(value * eased);
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */

/** Seamless scrolling band. Pauses on hover so the words stay readable. */
export function Marquee({
  items,
  className = "",
  seconds = 38,
  reverse = false,
}: {
  items: string[];
  className?: string;
  seconds?: number;
  reverse?: boolean;
}) {
  return (
    <div className={`home-marquee ${className}`} aria-hidden="true">
      <div
        className={`home-marquee-track ${reverse ? "is-reverse" : ""}`}
        style={{ animationDuration: `${seconds}s` }}
      >
        {[0, 1].map((pass) => (
          <div key={pass} className="home-marquee-group">
            {items.map((item, i) => (
              <span key={`${pass}-${item}-${i}`} className="home-marquee-item">
                {item}
                <i className="home-marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Vertical rule that draws itself as the section scrolls past. */
export function DrawLine({ className = "" }: { className?: string }) {
  const ref = useScrollProgressVar<HTMLSpanElement>();
  return <span ref={ref} className={`draw-line ${className}`} aria-hidden="true" />;
}
