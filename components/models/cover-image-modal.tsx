"use client";

import { useCoverImage } from "@/hook/use-cover-image";
import { SingleImageDropzone } from '@/components/upload/single-image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState, useCallback } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { UploaderProvider, type UploadFn } from "../upload/uploader-provider";

const CoverImageModal = () => {
    const params = useParams();
    const update = useMutation(api.documents.update);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();

    const onClose = useCallback(() => {
        setIsSubmitting(false);
        coverImage.onClose();
    }, [coverImage]);

    const uploadFn: UploadFn = useCallback(
        async ({ file, onProgressChange, signal }) => {
            setIsSubmitting(true);

            let res;
            if (coverImage.url) {
                // Replace existing file
                res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: coverImage.url,
                    },
                    onProgressChange,
                    signal,
                });
            } else {
                res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange,
                    signal,
                });
            }

            await update({
                id: params.documentsId as Id<"documents">,
                coverImage: res.url,
            });

            setIsSubmitting(false);
            onClose();
            return res;
        },
        [edgestore, update, params.documentsId, coverImage.url, onClose]
    );

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cover Image</DialogTitle>
                </DialogHeader>

                <UploaderProvider uploadFn={uploadFn} autoUpload>
                    <SingleImageDropzone
                        className="w-full outline-none"
                        width={400}
                        height={600}
                        dropzoneOptions={{
                            maxSize: 1024 * 1024 * 2, // 2 MB
                        }}
                        disabled={isSubmitting}
                    />
                </UploaderProvider>
            </DialogContent>
        </Dialog>
    );
};

export default CoverImageModal;