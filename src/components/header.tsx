import React, { useState } from 'react';
import { Search, Globe, Menu, User, MapPin, Building, Plane } from 'lucide-react';

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
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="text-2xl font-bold text-rose-500">airbnb</div>
                    </div>

                    {/* Center navigation tabs */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => setActiveTab('homes')}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium transition-colors relative ${activeTab === 'homes'
                                    ? 'text-gray-900'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="w-5 h-5 bg-gray-400 rounded"></div>
                            <span>Homes</span>
                            {activeTab === 'homes' && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gray-900 rounded-full"></div>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab('experiences')}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium transition-colors relative ${activeTab === 'experiences'
                                    ? 'text-gray-900'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="w-5 h-5 bg-rose-400 rounded-full"></div>
                            <span>Experiences</span>
                            <span className="bg-rose-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">NEW</span>
                            {activeTab === 'experiences' && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gray-900 rounded-full"></div>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab('services')}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium transition-colors relative ${activeTab === 'services'
                                    ? 'text-gray-900'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                            <span>Services</span>
                            <span className="bg-rose-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">NEW</span>
                            {activeTab === 'services' && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gray-900 rounded-full"></div>
                            )}
                        </button>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        <button className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors">
                            Become a host
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Globe size={18} className="text-gray-700" />
                        </button>
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-full px-2 py-1 hover:shadow-md transition-shadow cursor-pointer">
                            <Menu size={16} className="text-gray-700" />
                            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                                <User size={16} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search bar */}
            <div className="px-6 pb-6">
                <div className="max-w-2xl mx-auto relative">
                    <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center">
                        {/* Where */}
                        <div className="flex-1 px-6 py-3 cursor-pointer hover:bg-gray-50 rounded-full transition-colors">
                            className={`flex-1 px-6 py-3 cursor-pointer rounded-full transition-colors ${showLocationDropdown ? 'bg-white shadow-md' : 'hover:bg-gray-50'
                                }`}
                            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
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