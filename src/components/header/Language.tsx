import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { Globe } from "lucide-react";

export const LanguageModal = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Globe size={18} className="text-gray-700" />
                </button>
            </DialogTrigger>
            <DialogContent className="w-full h-full max-w-[100vw] max-h-[90vh]">
                Helo
            </DialogContent>
        </Dialog>
    )
}