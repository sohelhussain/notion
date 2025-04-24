"use client"

import Toolbar from "@/components/toolbar"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { mutation } from "@/convex/_generated/server"
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
    console.log(`pageId: ${pageId}`)
    const document = useQuery(api.documents.getById, {
        documentId: pageId as Id<'documents'>
    })


    if (document === undefined) {
        return (
            <div>Not found</div>
        )
    }
    if (document === null) {
        return (
            <div>Not found</div>
        )
    }

    return (
        <div className="pb-40">
            <div className="h-[35%] bg-red-400" />
            <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
                <Toolbar initialData={document} />
            </div>
        </div>
    )
}