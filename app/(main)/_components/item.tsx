"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: boolean;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    onClick: () => void;
    label: string;
    icon: LucideIcon;
}

export const Item = ({ onClick, label, icon: Icon, active, expanded, documentIcon, isSearch, id, onExpand, level = 0 }: ItemProps) => {

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div onClick={onClick} role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}` : "12px"
            }}
            className={cn(`group min-h-[27px] text-sm py-1 pr-3 cursor-pointer w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium ${active && "bg-primary/5 text-primary"}`)}>
            {!!id && (
                <div role="button" onClick={() => { }} className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1">
                    <ChevronIcon className="shrink-0 h-[18px] mr-2 text-muted-foreground w-4" />
                </div>
            )}

            {documentIcon ? (
                <div className="shrink-0 text-[18px] mr-2">
                    {documentIcon}
                </div>
            ) :

                <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground w-4" />
            }

            <span>
                {label}
            </span>

            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>
                    <span className="text-xs">K</span>
                </kbd>
            )}
        </div>
    );
}