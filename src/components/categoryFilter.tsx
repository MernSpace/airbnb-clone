import React, { useState } from 'react';
import {
    Mountain,
    Waves,
    TreePine,
    Home,
    Building,
    Tent,
    Castle,
    Palmtree,
    Snowflake,
    Coffee,
    Filter,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const categories = [
    { id: 'trending', label: 'Trending', icon: Home },
    { id: 'beach', label: 'Beachfront', icon: Waves },
    { id: 'mountain', label: 'Mountains', icon: Mountain },
    { id: 'cabin', label: 'Cabins', icon: TreePine },
    { id: 'city', label: 'Urban', icon: Building },
    { id: 'camping', label: 'Camping', icon: Tent },
    { id: 'castle', label: 'Castles', icon: Castle },
    { id: 'tropical', label: 'Tropical', icon: Palmtree },
    { id: 'arctic', label: 'Arctic', icon: Snowflake },
    { id: 'breakfast', label: 'Bed & Breakfast', icon: Coffee },
];

interface CategoryFilterProps {
    onCategorySelect?: (categoryId: string | null) => void;
    onFilterClick?: () => void;
}

export default function CategoryFilter({ onCategorySelect, onFilterClick }: CategoryFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleCategoryClick = (categoryId: string) => {
        const newCategory = selectedCategory === categoryId ? null : categoryId;
        setSelectedCategory(newCategory);
        onCategorySelect?.(newCategory);
    };

    const scrollLeft = () => {
        setScrollPosition(prev => Math.max(0, prev - 300));
    };

    const scrollRight = () => {
        setScrollPosition(prev => prev + 300);
    };

    return (
        <div className="relative border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex-1 relative">
                    {/* Scroll buttons */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* Categories */}
                    <div className="overflow-hidden mx-10">
                        <div
                            className="flex space-x-8 transition-transform duration-300"
                            style={{ transform: `translateX(-${scrollPosition}px)` }}
                        >
                            {categories.map((category) => {
                                const IconComponent = category.icon;
                                const isSelected = selectedCategory === category.id;

                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className={`flex-shrink-0 flex flex-col items-center space-y-2 pb-3 border-b-2 transition-colors duration-200 ${isSelected
                                                ? 'border-black text-black'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <IconComponent size={24} />
                                        <span className="text-xs font-medium whitespace-nowrap">
                                            {category.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Filter button */}
                <button
                    onClick={onFilterClick}
                    className="ml-4 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                    <Filter size={16} />
                    <span className="text-sm font-medium">Filters</span>
                </button>
            </div>
        </div>
    );
}