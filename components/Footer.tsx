import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="footer p-12 text-sm">
      <div className="flex gap-4 items-start">
        <img src="/logo-white.png" width={130} alt="Cover" />
        <div>
          <div className="">©2025 Kitchen Apply</div>
          <p>All rights reserved - Privacy Policy - Santiago - Chile</p>
          <div className="flex gap-4 mt-4">
            <Link href="/terms">Terms and Conditions</Link>
            <Link href="/company" className="underline">
              Register as company
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
