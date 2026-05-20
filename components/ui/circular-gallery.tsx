"use client";

import React, {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

export interface GalleryItem {
  common: string;
  binomial: string;
  icon?: ReactNode;
  note?: string;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const autoRotate = () => {
        setRotation((previousRotation) => previousRotation + autoRotateSpeed);

        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed]);

    if (items.length === 0) {
      return null;
    }

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative flex h-full w-full items-center justify-center",
          className,
        )}
        style={{ perspective: "2000px" }}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, index) => {
            const itemAngle = index * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle,
            );
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={`${item.common}-${index}`}
                role="group"
                aria-label={item.common}
                className="absolute h-[18rem] w-[15rem] sm:h-[22rem] sm:w-[18rem]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "clamp(-9rem, -37vw, -7.5rem)",
                  marginTop: "clamp(-11rem, -42vw, -9rem)",
                  opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden border border-white/18 bg-white/[0.08] p-6 text-white shadow-2xl shadow-architectural-black/25 backdrop-blur-lg">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_38%)]" />
                  <div className="relative flex size-16 items-center justify-center border border-white/20 bg-white/10 text-white">
                    {item.icon}
                  </div>
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/62">
                      {item.binomial}
                    </p>
                    <h2 className="mt-3 font-display text-3xl leading-tight">
                      {item.common}
                    </h2>
                    {item.note ? (
                      <p className="mt-4 text-sm leading-6 text-white/65">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
