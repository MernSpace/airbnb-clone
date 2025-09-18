import React, { useState } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyCardProps {
    property: {
        id: string;
        images: string[];
        title: string;
        location: string;
        host: string;
        rating: number;
        reviewCount: number;
        price: number;
        dates: string;
        isNew?: boolean;
        isSuperhost?: boolean;
    };
    onFavorite?: (id: string) => void;
}

export default function PropertyCard({ property, onFavorite }: PropertyCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === property.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? property.images.length - 1 : prev - 1
        );
    };

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorited(!isFavorited);
        onFavorite?.(property.id);
    };

    return (
        <div className="group cursor-pointer">
            {/* Image Carousel */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 mb-3">
                <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Loading placeholder */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}

                {/* Navigation arrows */}
                {property.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                        >
                            <ChevronLeft size={16} className="text-gray-800" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                        >
                            <ChevronRight size={16} className="text-gray-800" />
                        </button>
                    </>
                )}

                {/* Heart button */}
                <button
                    onClick={handleFavorite}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                >
                    <Heart
                        size={20}
                        className={`${isFavorited
                                ? 'fill-rose-500 text-rose-500'
                                : 'fill-black/20 text-white hover:fill-black/40'
                            } transition-colors duration-200`}
                    />
                </button>

                {/* Image indicators */}
                {property.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                        {property.images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-1">
                    {property.isNew && (
                        <span className="bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                            New
                        </span>
                    )}
                    {property.isSuperhost && (
                        <span className="bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                            Superhost
                        </span>
                    )}
                </div>
            </div>

            {/* Property details */}
            <div className="space-y-1">
                <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900 truncate flex-1 mr-2">
                        {property.title}
                    </h3>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                        <Star size={12} className="fill-black text-black" />
                        <span className="text-sm font-medium text-gray-900">
                            {property.rating}
                        </span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm truncate">
                    {property.location}
                </p>

                <p className="text-gray-500 text-sm">
                    Hosted by {property.host}
                </p>

                <p className="text-gray-500 text-sm">
                    {property.dates}
                </p>

                <div className="flex items-center space-x-1 pt-1">
                    <span className="font-semibold text-gray-900">
                        ${property.price}
                    </span>
                    <span className="text-gray-500 text-sm">
                        night
                    </span>
                </div>
            </div>
        </div>
    );
}