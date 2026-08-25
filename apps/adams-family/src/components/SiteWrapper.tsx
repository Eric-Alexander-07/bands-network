"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface Props {
  nav: ReactNode;
  footer: ReactNode;
  scrollAnimations: ReactNode;
  children: ReactNode;
}

export default function SiteWrapper({ nav, footer, scrollAnimations, children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && nav}
      {!isAdmin && scrollAnimations}
      {children}
      {!isAdmin && footer}
    </>
  );
}
