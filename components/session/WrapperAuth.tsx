import React from "react";
import { Card } from "../commons/ui/Card";

type Props = {
  className?: string;
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
};

export default function WrapperAuth({
  className,
  title,
  subTitle,
  children,
}: Props) {
  return (
    <div className="">
      <img
        src="/logo.png"
        alt="logo"
        className="w-[100px] mx-auto mb-8 text-center"
      />

      <Card
        className={`mt-8 p-0 mx-auto lg:w-1/3 md:w-2/3 sm: h-3/5 ${className} rounded-lg shadow-sm`}
      >
        <div className="p-8 md:px-20">
          {title && (
            <h1 className="text-center mb-8 font-bold">{title}</h1>
          )}
          {subTitle && (
            <p className="text-center text-lg text-slate-500 -mt-8 mb-8">
              {subTitle}
            </p>
          )}
          {children}
          <hr className="my-8" />
          <small className="text-center block text-slate-500">
            Si tienes problemas para ingresar, contáctese con el administrador
          </small>
        </div>
      </Card>
    </div>
  );
}
