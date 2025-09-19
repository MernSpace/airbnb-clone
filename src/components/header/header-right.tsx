import { Globe, Menu, User } from "lucide-react";
import { BecomeHostModal } from "./become-host";
import { LanguageModal } from "./Language";

export const HeaderRight = () => {
    return (
        <div className="flex items-center space-x-4">
            <BecomeHostModal />
            <LanguageModal />
            <div className="flex items-center space-x-2 border border-gray-300 rounded-full px-2 py-1 hover:shadow-md transition-shadow cursor-pointer">
                <Menu size={16} className="text-gray-700" />
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                </div>
            </div>
        </div>
    );
};