"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hook/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";



interface CoverProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({
    url, preview
}: CoverProps) => {
    const coverImage = useCoverImage();
    const params = useParams();
    const { edgestore } = useEdgeStore();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);

    const onRemoveCoverImage = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url
            })
        }
        removeCoverImage({
            id: params.documentsId as Id<'documents'>
        })
    }
    return (
        <div className={cn(`relative w-full h-[35vh] group ${!url && "h-[12vh]"} ${url && "bg-muted"}`)}>
            {!!url && (
                <Image src={url} fill alt="cover image" className="object-cover w-full h-full" />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button className="text-muted-foreground text-xs" variant={"outline"} size={"sm"} onClick={() => coverImage.onReplace(url)}>
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Change cover
                    </Button>
                    <Button className="text-muted-foreground text-xs" variant={"outline"} size={"sm"} onClick={onRemoveCoverImage}>
                        <X className="w-4 h-4 mr-2" />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
}


Cover.Skeleton = function CoverSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}