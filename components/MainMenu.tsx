"use client"

import { usePathname } from 'next/navigation';
import React from 'react'

const options = [
  {
    id: "home",
    label: "Home",
    link: "/",
  },
  {
    id: "jobs",
    label: "Trabajos",
    link: "/jobs",
  },
  {
    id: "blog",
    label: "Blog",
    link: "/blog",
  },
]

export default function MainMenu() {
  const pathname = usePathname();
  const parsePathname = pathname.split("/");

  return (
    <div className="flex items-center gap-4">
      {options.map((option) => {
        if (option.label === null) {
          return (
            <hr key={option.id} className="my-2 opacity-25 hidden md:block" />
          );
        }
        const parsePath = option.link.split("/");
        return (
          <a
            href={option.link}
            key={option.id}
            className={`p-1 rounded-md ${
              (pathname.includes(option.link) && parsePath.length > 2) ||
              (parsePath.length === parsePathname.length &&
                option.label === "Home")
                ? "bg-white/10 text-black font-bold"
                : "text-black/70"
            }`}
          >
            {option.label}
          </a>
        );
      })}
    </div>
  )
}
