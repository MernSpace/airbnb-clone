import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Minus, Plus } from 'lucide-react';

interface SearchBarProps {
    onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: {
        adults: number;
        children: number;
        infants: number;
    };
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [activeInput, setActiveInput] = useState<string | null>(null);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: { adults: 2, children: 0, infants: 0 }
    });

    const handleGuestChange = (type: keyof SearchFilters['guests'], operation: 'increment' | 'decrement') => {
        setFilters(prev => ({
            ...prev,
            guests: {
                ...prev.guests,
                [type]: operation === 'increment'
                    ? prev.guests[type] + 1
                    : Math.max(0, prev.guests[type] - 1)
            }
        }));
    };

    const getTotalGuests = () => {
        return filters.guests.adults + filters.guests.children;
    };

    const handleSearch = () => {
        onSearch?.(filters);
        setActiveInput(null);
        setShowGuestModal(false);
    };

    return (
        <div className="relative">
            <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center max-w-4xl mx-auto">
                {/* Location */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer rounded-full transition-colors ${activeInput === 'location' ? 'bg-white shadow-md' : 'hover:bg-gray-50'
                        }`}
                    onClick={() => setActiveInput(activeInput === 'location' ? null : 'location')}
                >
                    <div className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Where</div>
                    <input
                        type="text"
                        placeholder="Search destinations"
                        className="text-sm text-gray-600 bg-transparent border-none outline-none w-full placeholder-gray-400"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    />
                </div>

                <div className="w-px h-8 bg-gray-300"></div>

                {/* Check In */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer rounded-full transition-colors ${activeInput === 'checkin' ? 'bg-white shadow-md' : 'hover:bg-gray-50'
                        }`}
                    onClick={() => setActiveInput(activeInput === 'checkin' ? null : 'checkin')}
                >
                    <div className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Check In</div>
                    <input
                        type="date"
                        className="text-sm text-gray-600 bg-transparent border-none outline-none w-full"
                        value={filters.checkIn}
                        onChange={(e) => setFilters(prev => ({ ...prev, checkIn: e.target.value }))}
                    />
                </div>

                <div className="w-px h-8 bg-gray-300"></div>

                {/* Check Out */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer rounded-full transition-colors ${activeInput === 'checkout' ? 'bg-white shadow-md' : 'hover:bg-gray-50'
                        }`}
                    onClick={() => setActiveInput(activeInput === 'checkout' ? null : 'checkout')}
                >
                    <div className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Check Out</div>
                    <input
                        type="date"
                        className="text-sm text-gray-600 bg-transparent border-none outline-none w-full"
                        value={filters.checkOut}
                        onChange={(e) => setFilters(prev => ({ ...prev, checkOut: e.target.value }))}
                    />
                </div>

                <div className="w-px h-8 bg-gray-300"></div>

                {/* Guests */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer rounded-full transition-colors ${showGuestModal ? 'bg-white shadow-md' : 'hover:bg-gray-50'
                        }`}
                    onClick={() => setShowGuestModal(!showGuestModal)}
                >
                    <div className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Who</div>
                    <div className="text-sm text-gray-600">
                        {getTotalGuests() === 0 ? 'Add guests' : `${getTotalGuests()} guest${getTotalGuests() > 1 ? 's' : ''}`}
                    </div>
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full ml-2 transition-colors duration-200 flex items-center justify-center"
                >
                    <Search size={18} />
                </button>
            </div>

            {/* Guest Modal */}
            {showGuestModal && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 w-96 z-50">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold text-gray-800">Adults</div>
                                <div className="text-sm text-gray-500">Ages 13 or above</div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleGuestChange('adults', 'decrement')}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 transition-colors"
                                    disabled={filters.guests.adults <= 1}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-8 text-center">{filters.guests.adults}</span>
                                <button
                                    onClick={() => handleGuestChange('adults', 'increment')}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold text-gray-800">Children</div>
                                <div className="text-sm text-gray-500">Ages 2-12</div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleGuestChange('children', 'decrement')}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 transition-colors"
                                    disabled={filters.guests.children <= 0}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-8 text-center">{filters.guests.children}</span>
                                <button
                                    onClick={() => handleGuestChange('children', 'increment')}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold text-gray-800">Infants</div>
                                <div className="text-sm text-gray-500">Under 2</div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleGuestChange('infants', 'decrement')}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 transition-colors"
                                    disabled={filters.guests.infants <= 0}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-8 text-center">{filters.guests.infants}</span>
                                <button
                                    onClick={() => handleGuestChange('infants', 'increment')}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}