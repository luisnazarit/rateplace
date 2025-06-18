"use client"; // Asegúrate de marcar este componente como del lado del cliente

import { signOut } from "next-auth/react";
import Button from "./commons/Button";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Button
      onClick={handleSignOut}
      color="primary"
      variant="outlined"
      style={{ paddingLeft: "10px", paddingRight: "10px" }}
    >
      Cerrar Sesión
      <LogOut size={16} className="ml-2" />
    </Button>
  );
};

export default SignOutButton;
