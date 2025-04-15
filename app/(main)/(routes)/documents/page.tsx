"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";

const Documents = () => {
    const { user } = useUser();
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-lg font-medium">
                welcome to {user?.firstName} {user?.lastName}&apos;s Notion
            </h2>
            <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>
    );
}

export default Documents;