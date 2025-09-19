import React, { useState } from 'react';
import { Search, Globe, Menu, User, MapPin, Building, Plane } from 'lucide-react';
import { HeaderRight } from './header/header-right';

interface HeaderProps {
    onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: string;
}

export default function Header({ onSearch }: HeaderProps) {
    const [activeTab, setActiveTab] = useState('homes');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: ''
    });

    const suggestedDestinations = [
        {
            id: 'nearby',
            icon: MapPin,
            title: 'Nearby',
            subtitle: "Find what's around you"
        },
        {
            id: 'toronto',
            icon: Building,
            title: 'Toronto, Canada',
            subtitle: 'For sights like CN Tower'
        },
        {
            id: 'bangkok',
            icon: Building,
            title: 'Bangkok, Thailand',
            subtitle: 'For its bustling nightlife'
        },
        {
            id: 'london',
            icon: Building,
            title: 'London, United Kingdom',
            subtitle: 'For its stunning architecture'
        },
        {
            id: 'newyork',
            icon: Building,
            title: 'New York, NY',
            subtitle: 'For its top-notch dining'
        },
        {
            id: 'vancouver',
            icon: Building,
            title: 'Vancouver, Canada',
            subtitle: 'For nature-lovers'
        }
    ];

    const handleSearch = () => {
        onSearch?.(filters);
        setShowLocationDropdown(false);
    };

    const handleLocationClick = (destination: any) => {
        setFilters(prev => ({ ...prev, location: destination.title }));
        setShowLocationDropdown(false);
    };

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
            <div className="px-6 pb-6">
                <div className="max-w-2xl mx-auto relative">
                    <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center">
                        {/* Where */}
                        <div
                            className={`flex-1 px-6 py-3 cursor-pointer rounded-full transition-colors ${showLocationDropdown ? 'bg-white shadow-md' : 'hover:bg-gray-50'
                                }`}
                            onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                            <input
                                type="text"
                                placeholder={filters.location || "Search destinations"}
                                className="text-sm text-gray-600 bg-transparent border-none outline-none w-full placeholder-gray-400"
                                value={filters.location}
                                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        <div className="w-px h-8 bg-gray-300"></div>

                        {/* Check in */}
                        <div className="flex-1 px-6 py-3 cursor-pointer hover:bg-gray-50 rounded-full transition-colors">
                            <div className="text-xs font-semibold text-gray-800 mb-1">Check in</div>
                            <div className="text-sm text-gray-400">Add dates</div>
                        </div>

                        <div className="w-px h-8 bg-gray-300"></div>

                        {/* Check out */}
                        <div className="flex-1 px-6 py-3 cursor-pointer hover:bg-gray-50 rounded-full transition-colors">
                            <div className="text-xs font-semibold text-gray-800 mb-1">Check out</div>
                            <div className="text-sm text-gray-400">Add dates</div>
                        </div>

                        <div className="w-px h-8 bg-gray-300"></div>

                        {/* Who */}
                        <div className="flex-1 px-6 py-3 cursor-pointer hover:bg-gray-50 rounded-full transition-colors">
                            <div className="text-xs font-semibold text-gray-800 mb-1">Who</div>
                            <div className="text-sm text-gray-400">Add guests</div>
                        </div>

                        {/* Search button */}
                        <button
                            onClick={handleSearch}
                            className="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-full ml-2 transition-colors duration-200 flex items-center justify-center"
                        >
                            <Search size={16} />
                        </button>
                    </div>

                    {/* Location Dropdown */}
                    {showLocationDropdown && (
                        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50">
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold text-gray-800 mb-4">Suggested destinations</h3>
                                <div className="space-y-3">
                                    {suggestedDestinations.map((destination) => {
                                        const IconComponent = destination.icon;
                                        return (
                                            <button
                                                key={destination.id}
                                                onClick={() => handleLocationClick(destination)}
                                                className="w-full flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                                            >
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <IconComponent size={20} className="text-gray-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">{destination.title}</div>
                                                    <div className="text-sm text-gray-500">{destination.subtitle}</div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}