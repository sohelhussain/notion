"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useQuery } from "convex/react";

import UserItem from "./user-item";
import { api } from "@/convex/_generated/api";

const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const documents = useQuery(api.documents.get);



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
                </div>
                <div className="p-4">
                    {/* <p className="text-muted-foreground font-medium">Documents</p> */}
                    {documents?.map((doc: any) => (
                        <div key={doc.id} className="p-4">
                            <p className="text-muted-foreground font-medium">{doc.title}</p>
                        </div>
                    ))}
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
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999]",
                    isCollapsed ? "left-0 w-full" : "left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all duration-300 ease-in-out"
                )}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && (
                        <MenuIcon
                            role="button"
                            onClick={resetWidth}
                            className="h-6 w-6 text-muted-foreground"
                        />
                    )}
                </nav>
            </div>
        </>
    );
};

export default Navigation;