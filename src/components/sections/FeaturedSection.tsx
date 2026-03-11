"use client";

import { useRef } from "react";
import { ArrowRight, Star, MapPin, Bookmark, BadgePercent } from "lucide-react";
import Link from "next/link";
import { calculateCombinedRating, calculateCombinedReviewCount } from "@/utils/rating";

interface FeaturedSectionProps {
    restaurants: any[];
}

function FeaturedCard({ restaurant }: { restaurant: any }) {
    const imageUrl = restaurant.restaurantImages?.[0]?.url ||
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";

    const displayRating = restaurant.stats
        ? calculateCombinedRating(restaurant.stats.googleStats, restaurant.stats.tripAdvisorStats)
        : (restaurant.rating || 0);
    const displayReviewCount = restaurant.stats
        ? calculateCombinedReviewCount(restaurant.stats.googleStats, restaurant.stats.tripAdvisorStats)
        : (restaurant.reviewCount || 0);

    return (
        <Link
            href={`/restaurant/${restaurant.slug}`}
            className="group flex-shrink-0 block"
            style={{ width: "272px" }}
        >
            <div
                className="relative rounded-[1.6rem] overflow-hidden transition-all duration-400"
                style={{
                    background: "var(--card-bg)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                    transform: "translateY(0px)",
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-7px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 24px 56px rgba(0,0,0,0.13), 0 8px 24px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)";
                }}
            >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "240px" }}>
                    <img
                        src={imageUrl}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transform group-hover:scale-107 transition-transform duration-700 ease-out"
                        style={{ transformOrigin: "center center" }}
                    />

                    {/* Gradient overlay — creates depth and frames the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        {restaurant.discount ? (
                            <div
                                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                                style={{ background: "var(--brand-primary)", boxShadow: "0 2px 8px rgba(216,0,50,0.4)" }}
                            >
                                <BadgePercent className="w-3 h-3" />
                                {restaurant.discount}
                            </div>
                        ) : (
                            <div />
                        )}
                        <button
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group-hover:opacity-100 opacity-85"
                            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)" }}
                            onClick={(e) => e.preventDefault()}
                        >
                            <Bookmark className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                    </div>

                    {/* Bottom-right rating badge */}
                    <div
                        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                        style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", color: "#1a1c2e" }}
                    >
                        <Star className="w-3 h-3 fill-[var(--brand-primary)] text-[var(--brand-primary)]" />
                        {displayRating > 0 ? displayRating.toFixed(1) : "–"}
                    </div>

                    {/* Open/Closed status */}
                    {restaurant.isOpen !== undefined && (
                        <div
                            className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                restaurant.isOpen ? "bg-emerald-500 text-white" : "bg-gray-500/80 text-white"
                            }`}
                        >
                            {restaurant.isOpen ? "Open" : "Closed"}
                        </div>
                    )}
                </div>

                {/* Card content */}
                <div className="p-4 pb-5">
                    {/* Location + Cuisine tags */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                        {restaurant.location?.name && (
                            <span
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide"
                                style={{ background: "rgba(216,0,50,0.07)", color: "var(--brand-primary)" }}
                            >
                                {restaurant.location.name}
                            </span>
                        )}
                        {restaurant.cuisine && (
                            <span className="text-[10px] text-[var(--muted)] font-medium uppercase tracking-wide">
                                · {restaurant.cuisine}
                            </span>
                        )}
                    </div>

                    {/* Name */}
                    <h3
                        className="text-[var(--foreground)] font-bold leading-snug line-clamp-1 group-hover:text-[var(--brand-primary)] transition-colors duration-250 mb-1.5"
                        style={{
                            fontFamily: "var(--font-fraunces), serif",
                            fontSize: "15px",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {restaurant.name}
                    </h3>

                    {/* Address */}
                    {restaurant.address && (
                        <div className="flex items-center gap-1 text-[var(--muted)] text-xs mb-3.5">
                            <MapPin className="w-3 h-3 text-[var(--brand-primary)]/70 shrink-0" />
                            <span className="line-clamp-1">{restaurant.address}</span>
                        </div>
                    )}

                    {/* Footer */}
                    <div
                        className="flex items-center justify-between pt-3"
                        style={{ borderTop: "1px solid var(--border)" }}
                    >
                        <span className="text-xs font-bold text-[var(--foreground)]">{restaurant.priceRange || "$$"}</span>
                        <span className="text-xs text-[var(--muted)]">
                            {displayReviewCount > 0 ? `${displayReviewCount.toLocaleString()} reviews` : "No reviews yet"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function FeaturedSection({ restaurants }: FeaturedSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    if (restaurants.length === 0) return null;

    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
        scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
        if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
    };

    const onMouseLeave = () => {
        isDragging.current = false;
        if (scrollRef.current) scrollRef.current.style.cursor = "grab";
    };

    const onMouseUp = () => {
        isDragging.current = false;
        if (scrollRef.current) scrollRef.current.style.cursor = "grab";
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
        const walk = (x - startX.current) * 1.5;
        if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <section className="bg-[var(--background)] pt-16 pb-6 sm:pt-20 sm:pb-8 lg:pt-24 overflow-hidden">
            <div className="max-w-container mx-auto px-6 lg:px-8">

                {/* Section header */}
                <div className="flex items-end justify-between mb-9">
                    <div>
                        {/* Editorial eyebrow */}
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <span
                                className="w-5 h-px rounded-full"
                                style={{ background: "var(--brand-primary)" }}
                            />
                            <p className="text-[var(--brand-primary)] text-[11px] font-bold uppercase tracking-[0.2em]">
                                Hand-picked for you
                            </p>
                        </div>
                        <h2
                            className="text-[var(--foreground)] leading-tight"
                            style={{
                                fontFamily: "var(--font-fraunces), serif",
                                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                                fontWeight: 700,
                                letterSpacing: "-0.04em",
                            }}
                        >
                            Featured Places
                        </h2>
                    </div>

                    <Link
                        href="/restaurants"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-primary)] transition-all duration-200 group/link pb-0.5"
                        style={{ borderBottom: "1px solid rgba(216,0,50,0.25)" }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "rgba(216,0,50,0.7)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "rgba(216,0,50,0.25)";
                        }}
                    >
                        View All
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                </div>
            </div>

            {/* Drag-to-scroll carousel */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-7 px-6 lg:px-8"
                style={{
                    cursor: "grab",
                    paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
                    paddingRight: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                }}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} style={{ scrollSnapAlign: "start" }}>
                        <FeaturedCard restaurant={restaurant} />
                    </div>
                ))}

                {/* "See all" ghost card */}
                <div className="flex-shrink-0" style={{ width: "160px" }}>
                    <Link
                        href="/restaurants"
                        className="group h-full flex flex-col items-center justify-center rounded-[1.6rem] border-2 border-dashed border-[var(--border)] hover:border-[var(--brand-primary)]/35 transition-all duration-300 gap-3 text-center p-6"
                        style={{ minHeight: "372px" }}
                    >
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{ background: "rgba(216,0,50,0.07)" }}
                        >
                            <ArrowRight className="w-4 h-4 text-[var(--brand-primary)]" />
                        </div>
                        <p className="text-xs font-semibold text-[var(--muted)] group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                            See All Places
                        </p>
                    </Link>
                </div>
            </div>

            {/* Mobile "View All" */}
            <div className="sm:hidden text-center mt-4">
                <Link
                    href="/restaurants"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-primary)]"
                >
                    View All Places <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
