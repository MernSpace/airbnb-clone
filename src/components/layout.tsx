"use client"
import React, { useState } from 'react';
import Header from './header';
import PropertyCard from './propertyCard';

// Mock data for demonstration
const mockProperties = [
    {
        id: '1',
        images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        title: 'Cozy Mountain Cabin',
        location: 'Aspen, Colorado',
        host: 'Sarah',
        rating: 4.9,
        reviewCount: 127,
        price: 280,
        dates: 'Nov 15-20',
        isNew: true,
        isSuperhost: true,
    },
    {
        id: '2',
        images: [
            'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        title: 'Modern Beach House',
        location: 'Malibu, California',
        host: 'Michael',
        rating: 4.8,
        reviewCount: 89,
        price: 450,
        dates: 'Dec 1-6',
        isSuperhost: true,
    },
    {
        id: '3',
        images: [
            'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        title: 'Downtown Loft',
        location: 'New York, NY',
        host: 'Emma',
        rating: 4.7,
        reviewCount: 203,
        price: 320,
        dates: 'Nov 20-25',
    },
    {
        id: '4',
        images: [
            'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        title: 'Lakefront Cottage',
        location: 'Lake Tahoe, Nevada',
        host: 'David',
        rating: 4.9,
        reviewCount: 156,
        price: 195,
        dates: 'Dec 10-15',
        isNew: true,
    },
    {
        id: '5',
        images: [
            'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        title: 'Luxury Villa',
        location: 'Miami, Florida',
        host: 'Isabella',
        rating: 5.0,
        reviewCount: 67,
        price: 680,
        dates: 'Jan 5-10',
        isSuperhost: true,
    },
    {
        id: '6',
        images: [
            'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        title: 'Historic Townhouse',
        location: 'Charleston, South Carolina',
        host: 'Robert',
        rating: 4.6,
        reviewCount: 92,
        price: 240,
        dates: 'Nov 28 - Dec 3',
    },
];

function HomeView() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchFilters, setSearchFilters] = useState(null);

    const handleSearch = (filters: any) => {
        setSearchFilters(filters);
        console.log('Search filters:', filters);
    };

    const handleCategorySelect = (categoryId: string | null) => {
        setSelectedCategory(categoryId);
        console.log('Selected category:', categoryId);
    };

    const handleFilterClick = () => {
        console.log('Filter clicked');
    };

    const handleFavorite = (propertyId: string) => {
        console.log('Favorited property:', propertyId);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header onSearch={handleSearch} />
            {/* Main Content */}
            <main className="px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Results info */}
                    <div className="mb-6">
                        <h1 className="text-sm text-gray-600">
                            {selectedCategory
                                ? `${mockProperties.length} stays in ${selectedCategory}`
                                : `${mockProperties.length} stays`
                            }
                        </h1>
                    </div>

                    {/* Property Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {mockProperties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onFavorite={handleFavorite}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomeView;