"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Remove all existing is-visible classes from previous page
    document.querySelectorAll("[data-animate].is-visible").forEach((el) => {
      el.classList.remove("is-visible");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );

    // Small delay to ensure DOM is fully rendered after navigation
    const id = requestAnimationFrame(() => {
      document.querySelectorAll("[data-animate]").forEach((el) => {
        observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(id);
      observer.disconnect();
    };
  }, [pathname]); // Re-run on every route change

  return null;
}
