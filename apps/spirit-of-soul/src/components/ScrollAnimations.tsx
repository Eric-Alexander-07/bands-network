"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );

    const observe = () => {
      document.querySelectorAll("[data-animate]").forEach((el) => {
        observer.observe(el);
      });
    };

    observe();

    return () => observer.disconnect();
  }, []);

  return null;
}
