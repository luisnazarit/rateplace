"use client"
import React from "react";
import clsx from "clsx";

type AvatarProps = {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
};

export const Avatar: React.FC<AvatarProps> = ({ name = "", src, size = "md" }) => {
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "??";

  return (
    <div
      className={clsx(
        "rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold overflow-hidden",
        sizeClasses[size]
      )}
    >
      {src ? (
        <img
          src={src}
          alt={name || "User avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
