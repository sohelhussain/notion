"use client"

import { ConfirmModal } from "@/components/models/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProp {
    documentId: Id<'documents'>
}

const Banner = ({ documentId }: BannerProp) => {

    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId })

        toast.promise(promise, {
            loading: "Deleting...",
            success: "Deleted!",
            error: "Failed to delete!"
        })
        router.push("/documents")
    }
    const onRestore = () => {
        const promise = restore({ id: documentId })

        toast.promise(promise, {
            loading: "Restoring...",
            success: "Restoring...",
            error: "Failed to Restoring...",
        })

    }

    return (<div className="w-full bg-red-600 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
        <p>This page is on a trash can</p>
        <Button variant="outline" className="boarder-white cursor-pointer bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 font-normal" size="sm" onClick={onRestore}>
            Restore this page
        </Button>
        <ConfirmModal onConfirm={onRemove}>
            <Button variant="outline" className="boarder-white cursor-pointer bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 font-normal" size="sm">
                Delete forever
            </Button>
        </ConfirmModal>
    </div>)
}

export default Banner;