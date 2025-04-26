"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
import { useEdgeStore } from "@/lib/edgestore";

export function Editor({
  onChange,
  initialContent,
  editable = true,
}: {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();


  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const res = await edgestore.publicFiles.upload({ file });
      return res.url
    },
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={() => {
        onChange(JSON.stringify(editor.document));
      }}
    />
  );
}