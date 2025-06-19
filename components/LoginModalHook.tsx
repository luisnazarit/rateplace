"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Card } from "./commons/ui/Card";
import WrapperModal from "./WrapperModal";
import dynamic from "next/dynamic";
import LoginModal from "./session/LoginModal";

const ModalClient = dynamic(() => import("./commons/Modal"), { ssr: false });

export default function LoginModalHook() {
  const searchParams = useSearchParams();
  const param = searchParams.get("login");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (param) {
      setOpen(true);
    }
  }, [param]);

  return (
    <ModalClient
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <WrapperModal
        title="Iniciar sesión"
        closeButton={() => {
          setOpen(false);
        }}
        className="w-2/4"
      >
        <Card className="py-24 w-2/3 mx-auto">
          <LoginModal />
        </Card>
      </WrapperModal>
    </ModalClient>
  );
}
