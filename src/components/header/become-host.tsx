import React, { useState } from 'react';
import { Globe, Menu, User, Home, DollarSign, Shield, Star, ArrowRight, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const BecomeHostModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const hostingOptions = [
        {
            id: 'home',
            title: 'Home',
            icon: '🏠',
            description: 'Share your entire place or spare room'
        },
        {
            id: 'experience',
            title: 'Experience',
            icon: '🎈',
            description: 'Host unique activities and tours'
        },
        {
            id: 'service',
            title: 'Service',
            icon: '🛎️',
            description: 'Offer professional services'
        }
    ];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors">
                    Become a host
                </button>
            </DialogTrigger>
            <DialogContent className="p-2 gap-0 ">
                <div className="relative max-w-[525px] max-h-[525px]">
                    {/* Header */}
                    <div className="px-12 py-40 pt-12 pb-6 text-center">
                        <DialogTitle className="text-2xl font-semibold text-gray-900">
                            What would you like to host?
                        </DialogTitle>
                    </div>

                    {/* Hosting options */}
                    <div className="px-8 pb-8">
                        <div className="grid grid-cols-3 gap-4">
                            {hostingOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setSelectedOption(option.id)}
                                    className={`group relative flex flex-col items-center p-8 rounded-xl border-2 transition-all hover:border-gray-400 hover:shadow-md ${selectedOption === option.id
                                        ? 'border-gray-900 bg-gray-50'
                                        : 'border-gray-200'
                                        }`}
                                >
                                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                        {option.icon}
                                    </div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                        {option.title}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer with Next button */}
                    <div className="px-8 pb-8 flex justify-end">
                        <Button
                            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg disabled:bg-gray-300"
                            disabled={!selectedOption}
                            onClick={() => {
                                // Handle next step
                                console.log('Selected:', selectedOption);
                                setIsOpen(false);
                            }}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};