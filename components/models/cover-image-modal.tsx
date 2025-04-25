"use client";

import { useCoverImage } from "@/hook/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";


const CoverImageModal = () => {
    const coverImage = useCoverImage();
    return ( 
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
            </DialogContent>

        </Dialog>
     );
}
 
export default CoverImageModal;