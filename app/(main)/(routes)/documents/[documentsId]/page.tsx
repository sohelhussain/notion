"use client"

import Toolbar from "@/components/toolbar"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useParams } from "next/navigation"


//! i can not use async function in page.tsx (client side)

// interface DocumentIdPageProps {
//     params: Promise<{
//         documentsId: Id<'documents'>
//     }>
// }

export default function DocumentIdPage() {

    // const pageId = (await params).documentsId
    const pageId = useParams().documentsId;

    const document = useQuery(api.documents.getById, {
        documentId: pageId as Id<'documents'>
    })


    if (document === undefined || document === null) {
        return (
            <div>Not found</div>
        )
    }
    if (!document) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <div className="pb-40">
            <div className="h-[35vh]" />
            <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
                <Toolbar initialData={document} />
            </div>
        </div>
    )
}