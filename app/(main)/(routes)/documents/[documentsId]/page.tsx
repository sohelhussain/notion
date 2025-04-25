"use client"

import { Cover } from "@/components/cover"
// import { Editor } from "@/components/editor"
import Toolbar from "@/components/toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"


//! i can not use async function in page.tsx (client side)

// interface DocumentIdPageProps {
//     params: Promise<{
//         documentsId: Id<'documents'>
//     }>
// }

export default function DocumentIdPage() {
    const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
    // const pageId = (await params).documentsId
    const pageId = useParams().documentsId;
    const update = useMutation(api.documents.update)

    const [content, setContent] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const document = useQuery(api.documents.getById, {
        documentId: pageId as Id<'documents'>
    })

    useEffect(() => {
        if (content == null) return
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            update({
                id: pageId as Id<"documents">,
                content,
            });
        }, 1000)
    }, [content, update, pageId])

    if (document === null) {
        return (
            <div>Not found</div>
        )
    }
    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="pb-40">
            {/* <div className="h-[35vh]" /> */}
            <Cover url={document.coverImage} />
            <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
                <Toolbar initialData={document} />
                <Editor onChange={(newContent) => setContent(newContent)} initialContent={document.content} />
            </div>
        </div>
    )
}