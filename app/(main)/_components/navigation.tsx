"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";

import UserItem from "./user-item";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hook/use-search";
import { Navbar } from "./navbar";
import { useRouter } from "next/navigation";
import { useSettings } from "@/hook/use-settings";

const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const create = useMutation(api.documents.create);
    const search = useSearch();
    const settings = useSettings()
    const params = useParams();
    const router = useRouter();

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Collapse sidebar on mobile by default
    useEffect(() => {
        setIsCollapsed(isMobile);

        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;

        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.left = `${newWidth}px`;
            navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            const sidebarWidth = isMobile ? "100%" : "240px";
            const navbarLeft = isMobile ? "0" : "240px";
            const navbarWidth = isMobile ? "0" : "calc(100% - 240px)";

            sidebarRef.current.style.width = sidebarWidth;
            navbarRef.current.style.left = navbarLeft;
            navbarRef.current.style.width = navbarWidth;

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.left = "0";
            navbarRef.current.style.width = "100%";

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const handleCreate = () => {
        const promise = create({
            title: "Untitled"
        }).then((documentId) => router.push(`/documents/${documentId}`))

        toast.promise(promise, {
            loading: "Creating note...",
            success: "Note created successfully",
            error: "Failed to create note",
        })
    }

    return (
        <>
            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col z-[99999]",
                    isCollapsed ? "w-0" : "w-60",
                    isResetting && "transition-all duration-300 ease-in-out"
                )}
            >
                {/* Collapse Button */}
                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100",
                        isCollapsed && "opacity-0",
                        isMobile && !isCollapsed && "opacity-100"
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>

                {/* Sidebar Content */}
                <div className="">
                    {/* <p className="text-muted-foreground font-medium">Action items</p> */}
                    <UserItem />
                    <Item onClick={search.onOpen} label="Search" isSearch icon={Search} />
                    <Item onClick={settings.onOpen} label="Settings" icon={Settings} />
                    <Item onClick={handleCreate} label="Add new" icon={Plus} />
                </div>
                <div className="p-4">
                    {/* <p className="text-muted-foreground font-medium">Documents</p> */}
                    <DocumentList />
                    <Item onClick={handleCreate} label="Add a page" icon={Plus} />
                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item label="Trash" icon={Trash} />
                        </PopoverTrigger>
                        <PopoverContent side={isMobile ? "bottom" : "right"} className="p-0 w-72">
                            {/* <p>Trash Box</p> */}
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Resizer */}
                {!isCollapsed && (
                    <div
                        onMouseDown={handleMouseDown}
                        onClick={resetWidth}
                        className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                    />
                )}
            </aside>

            {/* Navbar */}
            <div className={cn(`absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]`,
                isResetting && 'transition-all ease-in-out duration-300',
                isMobile && 'left-0 w-full')} ref={navbarRef}>
                {!!params.documentsId ? (
                    <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
                )
                    : (
                        <nav className="bg-transparent px-3 py-2 w-full">
                            {isCollapsed && <MenuIcon className="w-6 h-6 text-muted-foreground" onClick={resetWidth} role="button" />}
                        </nav>
                    )}
            </div>
        </>
    );
};

export default Navigation;