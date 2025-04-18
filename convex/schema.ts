import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";




export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        parentDocumentId: v.optional(v.id('documents')),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
        lastEditedTime: v.optional(v.number()),
        createdTime: v.optional(v.number()),
        lastEditedBy: v.optional(v.id('users')),
    })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocumentId"]),
})