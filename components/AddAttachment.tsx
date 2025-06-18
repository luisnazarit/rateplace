"use client";
import Button from "@/components/commons/Button";
import FileUploaderMultiple, {
  FileType,
} from "@/components/commons/FileUploaderMultiple";
import { createAttachments, deleteAttachments } from "@/services/attachments";
import { Attachment, Post } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Card } from "./commons/ui/Card";

type Props = {
  post?: Post & {
    attachments: Attachment[];
  };
};

export default function AddAttachment({ post }: Props) {
  const [files, setFiles] = useState<FileType[]>(
    post?.attachments.map((attachment) => ({
      id: attachment.id,
      publicId: attachment.publicId,
      url: attachment.url,
      deleted: false,
    }))
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!files) return;
    try {
      setLoading(true);
      const deleteFiles = files.filter((file) => file.deleted && file.id);

      const newFiles = files
        .filter((file) => file.file)
        .map((file) => file.file);

      try {
        if (deleteFiles.length) {
          const resDelete = await deleteAttachments({
            ids: deleteFiles.map((file) => file.id),
            publicIds: deleteFiles.map((file) => file.publicId),
            activityId: activity.id,
          });

          if (resDelete.status > 399) {
            const data = await resDelete.json();
            if (data.message) {
              toast.error(data.message);
              return;
            }
            toast.error("Hubo un error");
            return;
          }
        }

        if (newFiles.length) {
          await createAttachments({
            activityId: activity.id,
            files: newFiles as File[],
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Hubo un error inesperado");
        return;
      }

      toast.success("Archivos agregados correctamente");
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 md:p-8">
      <h3 className="font-bold text-xl mb-4">Agregar fotos/videos</h3>
      <FileUploaderMultiple
        label="Seleccionar archivos"
        className="mb-4"
        value={files}
        hint="Máximo 10 archivos, pueden ser fotos o videos"
        maxFiles={10}
        onChange={(files) => setFiles(files)}
      />
      <Button color="primary" isLoading={loading} onClick={handleSubmit}>
        Guardar
      </Button>
    </Card>
  );
}
