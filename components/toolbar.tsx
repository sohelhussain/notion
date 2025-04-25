/* trunk-ignore-all(prettier) */
"use client";

import { Doc } from "@/convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";
import { Icon, ImageIcon, Smile, X } from "lucide-react";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hook/use-cover-image";


interface ToolbarProps {
    initialData: Doc<'documents'>
    preview?: boolean
}



const Toolbar = ({ initialData, preview }: ToolbarProps) => {


    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);
    const coverImage = useCoverImage();
    const update = useMutation(api.documents.update);
    const removeIconMutation = useMutation(api.documents.removeIcon);

    const enableInput = () => {
        if (preview) return;
        setIsEditing(true);;
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    }

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || 'Untitled'
        });
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    }

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon
        })
    }

    const removeIcon = () => {
        removeIconMutation({
            id: initialData._id
        })
    }

    console.log(`initialData.icon: ${initialData.title}`)
    console.log(`initialData.icon: ${initialData.icon}`)
    console.log("icon typeof:", typeof initialData.icon)
    console.log(`preview: ${preview}`)

    return (
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconSelect} asChild>
                        <p className="text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={removeIcon}
                        variant="outline"
                        size="icon"
                        className="text-xs rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
            <div className="flex items-center gap-x-1 py-4">
                {!initialData.icon && !preview && (
                    <>
                        <IconPicker asChild onChange={onIconSelect} >
                            <Button className="text-muted-foreground text-sm" variant={"outline"} size={"sm"}>
                                <Smile className="h-4 w-4 mr-2" />
                                Add icon
                            </Button>
                        </IconPicker>
                    </>
                )}
                {!initialData.coverImage && !preview && (
                    <Button onClick={coverImage.onOpen}
                        className="text-muted-foreground text-xs"
                        variant={"outline"}
                        size={"sm"}
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add cover image
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
                />
            ) : (
                <div onClick={enableInput} className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]">
                    {initialData.title}
                </div>
            )}
        </div>
    );
}

export default Toolbar;