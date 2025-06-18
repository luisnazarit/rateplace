import { Attachment as AttachmentType } from "@prisma/client";
import React from "react";

type Props = {
  attachment: AttachmentType;
  onClick?: () => void;
};

export default function Attachment({ attachment, onClick }: Props) {
  if (attachment.type === "video") {
    return (
      <div>
        {attachment.url && (
          <video src={attachment.url} className="aspect-square" controls />
        )}
      </div>
    );
  }
  return (
    <div>
      {attachment.url && (
        <img
          className="aspect-square object-cover cursor-pointer"
          src={attachment.url}
          onClick={onClick}
          alt=""
        />
      )}
    </div>
  );
}
