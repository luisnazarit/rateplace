import AccountHeader from "../components/AccountHeader";
import { Header } from "./Header";

export default function AccountLayout({
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
