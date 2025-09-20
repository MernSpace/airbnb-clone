import React, { useState } from 'react';
import { HeaderRight } from './header/header-right';
import SearchBar from './header/search-bar';
interface HeaderProps {
    onSearch?: () => void;
}

export default function Header({ onSearch }: HeaderProps) {
    const [activeTab, setActiveTab] = useState('homes');

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* Top navigation */}
            <div className="px-6 py-2">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="text-2xl font-bold text-rose-500">airbnb</div>
                    </div>

                    {/* Center navigation tabs */}
                    <div className="hidden md:flex items-center py-2 px-2">
                        <button
                            onClick={() => setActiveTab('homes')}
                            className={`relative flex flex-col items-center transition-colors ${activeTab === 'homes'
                                ? 'text-gray-900'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {/* Icon + Label */}
                            <div className="flex items-center">
                                <video
                                    src="https://a0.muscache.com/videos/search-bar-icons/webm/house-selected.webm"
                                    className="w-16 h-16"
                                    autoPlay
                                    muted
                                    playsInline
                                />
                                <span className="text-sm font-semibold">Homes</span>
                            </div>

                            {/* Active underline with slide animation */}
                            <div
                                className={`absolute bottom-0 h-1 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${activeTab === 'homes' ? 'w-full transform translate-x-0' : 'w-0 transform -translate-x-full'
                                    }`}
                            />
                        </button>

                        <button
                            onClick={() => setActiveTab('experiences')}
                            className={`relative flex flex-col items-center transition-colors ${activeTab === 'experiences'
                                ? 'text-gray-900'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {/* Icon + Label with badge positioned on video */}
                            <div className="flex items-center space-x-1">
                                <div className="relative">
                                    <video
                                        src="https://a0.muscache.com/videos/search-bar-icons/webm/balloon-selected.webm"
                                        className="w-16 h-16 transition-transform duration-200 hover:scale-110"
                                        autoPlay
                                        muted
                                        playsInline
                                    />
                                    {/* Badge positioned on top-right of video */}
                                    <span className="absolute -top-1 -right-5 bg-rose-500 text-white text-xs px-1.5 py-1 font-semibold rounded-full rounded-bl-none ">
                                        NEW
                                    </span>
                                </div>
                                <span className="text-sm font-semibold">Experiences</span>
                            </div>

                            {/* Active underline with animation */}
                            <div
                                className={`absolute bottom-0 h-1 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${activeTab === 'experiences' ? 'w-full opacity-100' : 'w-0 opacity-0'
                                    }`}
                            />
                        </button>

                        <button
                            onClick={() => setActiveTab('services')}
                            className={`relative flex flex-col items-center transition-colors ${activeTab === 'services'
                                ? 'text-gray-900'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {/* Icon + Label with badge positioned on video */}
                            <div className="flex items-center space-x-1">
                                <div className="relative">
                                    <video
                                        src="https://a0.muscache.com/videos/search-bar-icons/webm/consierge-twirl.webm"
                                        className="w-16 h-16 transition-transform duration-200 hover:scale-110"
                                        autoPlay
                                        muted
                                        playsInline
                                    />
                                    {/* Badge positioned on top-right of video */}
                                    <span className="absolute -top-1 -right-5 bg-rose-500 text-white text-xs px-1.5 py-1 font-semibold rounded-full rounded-bl-none ">
                                        NEW
                                    </span>
                                </div>
                                <span className="text-sm font-semibold">Services</span>
                            </div>

                            {/* Active underline with animation */}
                            <div
                                className={`absolute bottom-0 h-1 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${activeTab === 'services' ? 'w-full opacity-100' : 'w-0 opacity-0'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Right side */}
                    <HeaderRight />
                </div>
            </div>

            {/* Search bar */}
            <SearchBar />
        </header>
    );
}