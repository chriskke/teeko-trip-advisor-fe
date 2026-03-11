"use client";

import { Star, MapPin, BadgePercent, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { calculateCombinedRating, calculateCombinedReviewCount } from "@/utils/rating";

interface RestaurantImage {
    caption?: string;
    isPrimary?: boolean;
    url: string;
}

export interface RestaurantCardProps {
    id: string | number;
    name: string;
    slug: string;
    description?: string;
    restaurantImages?: RestaurantImage[];
    rating?: number;
    reviewCount?: number;
    stats?: {
        id: string | number;
        googleStats: { link: string; rating: number; totalReviews: number };
        tripAdvisorStats: { link: string; rating: number; totalReviews: number };
    };
    cuisine?: string;
    priceRange?: string;
    address?: string;
    discount?: string;
    location?: { name: string; slug: string };
    isOpen?: boolean;
    showActions?: boolean;
}

export function RestaurantCard({
    id,
    name,
    slug,
    description,
    restaurantImages = [],
    rating = 4.5,
    reviewCount = 0,
    stats = {
        id,
        googleStats: { link: "", rating: 0, totalReviews: 0 },
        tripAdvisorStats: { link: "", rating: 0, totalReviews: 0 }
    },
    cuisine,
    priceRange = "$$",
    address,
    discount,
    location,
    isOpen,
    showActions = true,
}: RestaurantCardProps) {
    const router = useRouter();
    const imageUrl = restaurantImages[0]?.url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";

    const displayRating = stats ? calculateCombinedRating(stats.googleStats, stats.tripAdvisorStats) : (rating || 0);
    const displayReviewCount = stats ? calculateCombinedReviewCount(stats.googleStats, stats.tripAdvisorStats) : (reviewCount || 0);

    const handleReserveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/restaurant/${slug}#reserve`);
    };

    return (
        <Link
            href={`/restaurant/${slug}`}
            className="group block bg-[var(--card-bg)] rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[var(--brand-primary)]/8 hover:border-[var(--brand-primary)]/25 transition-all duration-300 overflow-hidden border border-[var(--border)] flex flex-col h-full cursor-pointer relative"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-[var(--card-bg)]/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-xs font-bold text-[var(--foreground)] shadow-lg flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[var(--brand-primary)] text-[var(--brand-primary)]" />
                    {displayRating.toFixed(1)}
                </div>

                {/* Discount Badge */}
                {discount && (
                    <div className="absolute top-3 left-3 bg-[var(--brand-primary)] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <BadgePercent className="w-4 h-4" />
                        {discount}
                    </div>
                )}

                {/* Open Status */}
                {isOpen !== undefined && (
                    <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md ${
                        isOpen ? "bg-green-500 text-white" : "bg-[var(--muted)] text-white"
                    }`}>
                        {isOpen ? "Open Now" : "Closed"}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Location / Tag */}
                <div className="flex items-center gap-2 mb-2">
                    {location?.name && (
                        <span className="px-2 py-0.5 bg-[var(--brand-primary)]/8 dark:bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] text-[9px] font-bold uppercase tracking-wider rounded-lg">
                            {location.name}
                        </span>
                    )}
                    {cuisine && (
                        <div className="flex items-center gap-1 text-[9px] font-bold text-[var(--muted)] uppercase tracking-wider">
                            <Utensils className="w-2.5 h-2.5" />
                            {cuisine}
                        </div>
                    )}
                </div>

                <h3
                    className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors duration-250 line-clamp-1 mb-1 leading-snug"
                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                    {name}
                </h3>

                {description && (
                    <p className="text-xs text-[var(--muted)] line-clamp-2 mb-3 leading-relaxed">
                        {description}
                    </p>
                )}

                {!description && address && (
                    <div className="flex items-start gap-1.5 text-[var(--muted)] text-[11px] mb-3">
                        <MapPin className="w-3 h-3 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{address}</span>
                    </div>
                )}

                <div className="mt-auto pt-3 border-t border-[var(--border)] flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest leading-none mb-0.5">Price</span>
                        <span className="text-xs font-bold text-[var(--foreground)]">{priceRange}</span>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest leading-none mb-0.5">Reviews</span>
                        <span className="text-xs font-bold text-[var(--foreground)]">{displayReviewCount} reviews</span>
                    </div>
                </div>

                {showActions && (
                    <div className="mt-3 flex gap-2">
                        <button
                            onClick={handleReserveClick}
                            className="flex-1 text-[10px] text-white font-bold py-2 rounded-xl transition-all shadow-sm active:scale-95"
                            style={{
                                background: "var(--brand-primary)",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "var(--color-primary-600)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "var(--brand-primary)";
                            }}
                        >
                            Reserve
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
}
