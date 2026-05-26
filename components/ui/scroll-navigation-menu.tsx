"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: number;
  title: string;
  url: string;
}

interface ScrollNavbarProps {
  menuItems?: MenuItem[];
  className?: string;
}

const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Projects",
    url: "/properties",
  },
  {
    id: 4,
    title: "Careers",
    url: "/careers",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
];

export const Component: React.FC<ScrollNavbarProps> = ({
  menuItems = defaultMenuItems,
  className = "",
}) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const toggleMenu = () => setIsMenuOpen((value) => !value);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      scale: 0.88,
      y: -36,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants: Variants = {
    closed: {
      y: 18,
      opacity: 0,
      scale: 0.92,
    },
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 540,
        damping: 30,
      },
    },
  };

  const hamburgerVariants: Variants = {
    normal: { rotate: 0, scale: 1 },
    scrolled: { rotate: 360, scale: 1 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isScrolled ? -110 : 0,
          opacity: isScrolled ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-5 py-5 md:px-8 lg:px-12",
          className,
        )}
      >
        <div className="mx-auto flex max-w-[112rem] items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center">
            <motion.div
              className="shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/" className="block" aria-label="Kedia Group home">
                <Image
                  src={
                    isHome
                      ? "/kedia-logo-white-transparent.png"
                      : "/kedia-logo-transparent.png"
                  }
                  alt="Kedia Group"
                  width={260}
                  height={147}
                  priority
                  className={cn(
                    "h-14 w-auto object-contain md:h-16 lg:h-[4.5rem]",
                    isHome && "brightness-0 invert",
                  )}
                />
              </Link>
            </motion.div>

            <div className="hidden flex-1 justify-center lg:flex">
              <div className="flex items-center gap-9">
                {menuItems.map((item) => {
                  const active =
                    item.url === "/" ? pathname === item.url : pathname.startsWith(item.url);

                  return (
                    <motion.div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        href={item.url}
                        className={cn(
                          "relative flex items-center px-1 py-3 text-base font-medium tracking-[-0.01em] transition-colors",
                          isHome
                            ? "text-white/88 hover:text-white"
                            : "text-charcoal-text hover:text-primary-navy",
                          active && (isHome ? "text-white" : "text-primary-navy"),
                        )}
                      >
                        <span>{item.title}</span>
                      </Link>
                      <AnimatePresence>
                        {hoveredItem === item.id ? (
                          <motion.div
                            layoutId="navbar-hover"
                            className={cn(
                              "absolute inset-x-1 bottom-1 -z-10 h-px",
                              isHome ? "bg-white/65" : "bg-primary-navy/45",
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <motion.button
              type="button"
              onClick={toggleMenu}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border",
                isHome
                  ? "border-white/40 text-white"
                  : "border-border-gray text-primary-navy",
              )}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <MenuToggleIcon open={isMenuOpen} className="size-6" duration={500} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isScrolled ? 1 : 0,
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed right-5 top-5 z-50 md:right-8 md:top-6"
      >
        <motion.button
          type="button"
          onClick={toggleMenu}
          className="flex size-14 items-center justify-center rounded-full bg-primary-navy text-white shadow-[0_18px_45px_rgba(4,43,76,0.24)]"
          variants={hamburgerVariants}
          animate={isScrolled ? "scrolled" : "normal"}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <MenuToggleIcon open={isMenuOpen} className="size-7" duration={500} />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-architectural-black/40 backdrop-blur-sm"
              onClick={toggleMenu}
            />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed left-1/2 top-1/2 z-50 w-[min(calc(100vw-3rem),17rem)] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative border border-border-gray bg-white px-4 py-11 text-center shadow-[0_30px_100px_rgba(4,43,76,0.25)]">
                <motion.button
                  type="button"
                  onClick={toggleMenu}
                  className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-charcoal-text hover:bg-cool-mist"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Close menu"
                >
                  <MenuToggleIcon open className="size-6" duration={500} />
                </motion.button>

                <div className="mx-auto flex max-w-44 flex-col items-center gap-1.5">
                  {menuItems.map((item) => {
                    const active =
                      item.url === "/"
                        ? pathname === item.url
                        : pathname.startsWith(item.url);

                    return (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="w-full"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Link
                          href={item.url}
                          onClick={toggleMenu}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex min-h-11 w-full items-center justify-center border-b border-border-gray/70 px-4 py-2.5 transition-colors last:border-b-0 hover:bg-cool-mist",
                            active && "bg-cool-mist",
                          )}
                        >
                          <span
                            className={cn(
                              "text-xs font-semibold uppercase tracking-[0.2em] group-hover:text-primary-navy",
                              active ? "text-primary-navy" : "text-charcoal-text",
                            )}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};
