import React from "react";
import AccountHeader from "../components/AccountHeader";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AccountHeader />
      {children}
    </>
  );
}
