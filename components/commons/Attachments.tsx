"use client";

import useFetch from "@/hooks/useFetch";
import { Attachment } from "@prisma/client";
import Carousel from "../Carousel";

export default function Attachments({
  postId,
  emptyBoxClassName,
  callback,
}: {
  postId?: string;
  emptyBoxClassName?: string;
  callback?: () => void;
}) {
  const { data: attachments, loading } = useFetch<Attachment[]>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/attachments?postId=${postId}`,
  });

  if (loading && !attachments?.length) {
    return (
      <div className="p-8 bg-secondary-50 text-center mt-8">
        <p>Cargando archivos...</p>
      </div>
    );
  }

  if ((!loading && !attachments?.length) || !attachments) {
    return (
      <div
        className={emptyBoxClassName || "p-8 bg-secondary-50 text-center mt-8"}
      >
        <p>No hay archivos adjuntos</p>
      </div>
    );
  }

  return (
    <Carousel
      callback={callback}
      mediaItems={attachments?.map((attachment) => ({
        url: attachment.url,
        id: attachment.id,
        type: attachment.type,
      }))}
    />
  );
}
