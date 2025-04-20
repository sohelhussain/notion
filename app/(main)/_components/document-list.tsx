"use client"

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProp {
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">[];
}

export const DocumentList = ({
    parentDocumentId, level = 0
}: DocumentListProp) => {

    const params = useParams();
    const router = useRouter();


    const [expended, setExpended] = useState<Record<string, boolean>>({});


    const onExpand = (documentId: string) => {
        setExpended(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    }


    const documents = useQuery(api.documents.getSidbar, {
        parentDocument: parentDocumentId
    })

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    };


    if (documents === undefined) {
        return <>
            <Item.Skeleton level={level} />
            {level === 0 && (
                <>
                    <Item.Skeleton level={level} />
                    <Item.Skeleton level={level} />
                </>
            )}
        </>
    }


    console.log(`documents`, level)

    return <>
        <p
            style={{
                paddingLeft: level ? `${level * 12 + 25}px` : undefined
            }}
            className={cn(
                `hidden text-sm font-medium text-muted-foreground/80 ${expended && "last:block"} ${level === 0 && "hidden"}`
            )}
        >
            No pages inside
        </p>
        {documents.map((document) => (
            <div key={document._id}>
                <Item id={document._id} onClick={() => onRedirect(document._id)} level={level} label="document.title" icon={FileIcon} documentIcon={document.icon} active={params.documentId === document._id} onExpand={() => onExpand(document._id)} expanded={expended[document._id]} />
                {expended[document._id] && (
                    <DocumentList
                        parentDocumentId={document._id}
                        level={level + 1}
                    />
                )}
            </div>
        ))}
    </>
}