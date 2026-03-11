"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Star, Bookmark, MapPin, Search, ChevronDown } from "lucide-react";

const heroImages = [
    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1920&q=85",
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&q=85",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=85",
];

const floatingCards = [
    {
        name: "Kuala Lumpur",
        type: "Metropolis",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=480&q=80",
        rating: "4.9",
    },
    {
        name: "Penang",
        type: "Heritage City",
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=480&q=80",
        rating: "4.8",
    },
    {
        name: "Langkawi",
        type: "Island Paradise",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
        rating: "4.7",
    },
];

const cuisineOptions = [
    "All Cuisines",
    "Malaysian",
    "Chinese",
    "Indian",
    "Western",
    "Japanese",
    "Korean",
];

export function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [destination, setDestination] = useState("");
    const [cuisineOpen, setCuisineOpen] = useState(false);
    const [selectedCuisine, setSelectedCuisine] = useState("Cuisine");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setCuisineOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        const q = [destination.trim(), selectedCuisine !== "Cuisine" && selectedCuisine !== "All Cuisines" ? selectedCuisine : ""]
            .filter(Boolean)
            .join(" ");
        if (q) params.set("search", q);
        router.push(`/restaurants${params.toString() ? `?${params.toString()}` : ""}`);
    };

    return (
        <section
            className="relative overflow-hidden"
            style={{ minHeight: "600px", height: "calc(100svh - 64px)", maxHeight: "900px" }}
        >
            {/* Background images */}
            {heroImages.map((image, index) => (
                <div
                    key={index}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${image}')`,
                        opacity: currentImageIndex === index ? 1 : 0,
                        transition: "opacity 1.5s ease-in-out",
                    }}
                />
            ))}

            {/* Gradient overlays — deeper on left for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#060810]/94 via-[#0c0d1a]/72 to-[#0c0d1a]/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d1a]/65 via-transparent to-transparent" />

            {/* Film grain for premium texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "160px 160px",
                }}
            />

            {/* Atmospheric crimson glow */}
            <div
                className="absolute top-1/3 left-1/5 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(216,0,50,0.07) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            {/* Main content grid */}
            <div className="relative z-10 h-full max-w-container mx-auto px-6 lg:px-8 flex items-center">

                {/* ─── LEFT COLUMN ─── */}
                <div className="w-full lg:w-[54%] flex flex-col justify-center py-12">

                    {/* Eyebrow — editorial treatment */}
                    <div className="hero-animate-1 inline-flex items-center gap-3 mb-7 w-fit">
                        <span
                            className="w-6 h-px rounded-full"
                            style={{ background: "rgba(216,0,50,0.7)" }}
                        />
                        <span className="text-white/50 text-[11px] font-semibold tracking-[0.24em] uppercase">
                            Discover Malaysia
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="hero-animate-2 text-white mb-5 leading-[0.91] tracking-tight"
                        style={{
                            fontFamily: "var(--font-fraunces), serif",
                            fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                            fontWeight: 700,
                            fontVariationSettings: "'opsz' 144",
                        }}
                    >
                        Travel{" "}
                        <em
                            className="not-italic"
                            style={{
                                color: "transparent",
                                WebkitTextStroke: "2px #d80032",
                                textShadow: "0 0 72px rgba(216,0,50,0.5)",
                            }}
                        >
                            Easy
                        </em>
                        <br />
                        with Teeko
                    </h1>

                    <p className="hero-animate-3 text-white/52 text-sm sm:text-base mb-7 max-w-[26rem] leading-relaxed">
                        Restaurants, hidden gems, and curated experiences — all of Malaysia in one place.
                    </p>

                    {/* ─── Floating Glassmorphic Search Bar ─── */}
                    <form onSubmit={handleSearch} className="hero-animate-3 mb-9 w-full max-w-[28rem]">
                        <div className="search-pill flex items-center rounded-full">

                            {/* Destination text input */}
                            <div className="flex-1 flex items-center gap-2.5 px-5 py-[14px] min-w-0">
                                <MapPin className="w-[15px] h-[15px] text-white/45 shrink-0" />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Where to go?"
                                    className="bg-transparent text-white text-[13px] placeholder:text-white/33 outline-none w-full"
                                />
                            </div>

                            {/* Divider */}
                            <div className="w-px h-5 bg-white/12 shrink-0" />

                            {/* Cuisine dropdown */}
                            <div ref={dropdownRef} className="relative flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setCuisineOpen(!cuisineOpen)}
                                    className="flex items-center gap-1.5 px-4 py-[14px] text-[13px] text-white/45 hover:text-white/75 transition-colors duration-200 whitespace-nowrap"
                                >
                                    <span className="hidden sm:block">{selectedCuisine}</span>
                                    <ChevronDown
                                        className="w-3.5 h-3.5 transition-transform duration-200"
                                        style={{ transform: cuisineOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                    />
                                </button>

                                {cuisineOpen && (
                                    <div
                                        className="absolute top-full right-0 mt-2 w-44 rounded-2xl overflow-hidden z-50 py-1"
                                        style={{
                                            background: "rgba(8, 9, 20, 0.94)",
                                            backdropFilter: "blur(24px) saturate(180%)",
                                            WebkitBackdropFilter: "blur(24px) saturate(180%)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                                        }}
                                    >
                                        {cuisineOptions.map((c) => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCuisine(c);
                                                    setCuisineOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-[13px] transition-colors duration-150"
                                                style={{
                                                    color: selectedCuisine === c ? "#d80032" : "rgba(255,255,255,0.65)",
                                                    background: selectedCuisine === c ? "rgba(216,0,50,0.08)" : "transparent",
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (selectedCuisine !== c)
                                                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (selectedCuisine !== c)
                                                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                                                }}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Search CTA */}
                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-full mx-1.5 my-1.5 px-5 py-2.5 text-white text-[13px] font-bold transition-all duration-250 hover:scale-[1.04] active:scale-[0.97]"
                                style={{
                                    background: "linear-gradient(135deg, #d80032 0%, #ef233c 100%)",
                                    boxShadow: "0 4px 20px rgba(216,0,50,0.5)",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(216,0,50,0.65)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(216,0,50,0.5)";
                                }}
                            >
                                <Search className="w-3.5 h-3.5" />
                                <span className="hidden sm:block">Search</span>
                            </button>
                        </div>

                        {/* Secondary SIM link */}
                        <div className="mt-3.5 flex items-center gap-2 pl-5">
                            <span className="text-white/30 text-[11px]">or</span>
                            <a
                                href="/travel-sim-malaysia"
                                className="text-white/45 text-[11px] font-medium hover:text-white/70 transition-colors duration-200 underline underline-offset-2 decoration-white/20 hover:decoration-white/40"
                            >
                                explore Travel SIM packages →
                            </a>
                        </div>
                    </form>

                    {/* Stats row */}
                    <div className="hero-animate-4 flex items-center gap-8 sm:gap-12">
                        {[
                            { value: "20+", label: "Destinations" },
                            { value: "50K+", label: "Reviews" },
                            { value: "4.8", label: "Avg Rating" },
                        ].map((stat, i) => (
                            <div key={stat.label} className="relative">
                                {i > 0 && (
                                    <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-px h-5 bg-white/10" />
                                )}
                                <div
                                    className="text-white text-xl sm:text-2xl font-bold leading-none mb-1"
                                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-white/35 text-[10px] uppercase tracking-[0.15em] font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── RIGHT COLUMN — Floating overlapping destination cards ─── */}
                <div className="hidden lg:block absolute right-0 top-0 h-full" style={{ width: "50%" }}>
                    <div className="relative h-full">

                        {/* Decorative circular ring behind cards */}
                        <div
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: "320px",
                                height: "320px",
                                top: "50%",
                                right: "calc(26% - 80px)",
                                transform: "translateY(-50%)",
                                border: "1px solid rgba(216,0,50,0.1)",
                                boxShadow: "0 0 80px rgba(216,0,50,0.06) inset",
                                zIndex: 0,
                            }}
                        />
                        <div
                            className="absolute rounded-full pointer-events-none deco-ring"
                            style={{
                                width: "380px",
                                height: "380px",
                                top: "50%",
                                right: "calc(26% - 110px)",
                                transform: "translateY(-50%)",
                                border: "1px dashed rgba(255,255,255,0.05)",
                                zIndex: 0,
                            }}
                        />

                        {/* Card 1 — back-left */}
                        <div
                            className="absolute overflow-hidden rounded-3xl hero-card-1"
                            style={{
                                width: "185px",
                                height: "268px",
                                top: "50%",
                                right: "calc(44% + 24px)",
                                transform: "translateY(calc(-50% - 24px)) rotate(-4deg)",
                                zIndex: 1,
                                boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08) inset",
                                background: "#0e0f1c",
                            }}
                        >
                            <img
                                src={floatingCards[0].image}
                                alt={floatingCards[0].name}
                                className="w-full object-cover"
                                style={{ height: "70%" }}
                            />
                            <div
                                className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold"
                                style={{ background: "rgba(255,255,255,0.93)", color: "#1a1c2e", backdropFilter: "blur(8px)" }}
                            >
                                <Star className="w-2.5 h-2.5 fill-[#d80032] text-[#d80032]" />
                                {floatingCards[0].rating}
                            </div>
                            <button
                                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                            >
                                <Bookmark className="w-3 h-3 text-white" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: "#0e0f1c" }}>
                                <p className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                                    {floatingCards[0].name}
                                </p>
                                <p className="text-white/40 text-[9px] uppercase tracking-wider mt-0.5">{floatingCards[0].type}</p>
                                <div className="flex gap-1 mt-1.5">
                                    {[0, 1, 2].map((d) => (
                                        <div
                                            key={d}
                                            className="h-[3px] rounded-full"
                                            style={{ width: d === 0 ? "18px" : "5px", background: d === 0 ? "#d80032" : "rgba(255,255,255,0.18)" }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Card 2 — front-center (tallest, most prominent) */}
                        <div
                            className="absolute overflow-hidden rounded-3xl hero-card-2"
                            style={{
                                width: "210px",
                                height: "308px",
                                top: "50%",
                                right: "calc(22% + 8px)",
                                transform: "translateY(-50%)",
                                zIndex: 3,
                                boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.12) inset",
                                background: "#0e0f1c",
                            }}
                        >
                            <img
                                src={floatingCards[1].image}
                                alt={floatingCards[1].name}
                                className="w-full object-cover"
                                style={{ height: "70%" }}
                            />
                            <div
                                className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                                style={{ background: "rgba(255,255,255,0.93)", color: "#1a1c2e", backdropFilter: "blur(8px)" }}
                            >
                                <Star className="w-2.5 h-2.5 fill-[#d80032] text-[#d80032]" />
                                {floatingCards[1].rating}
                            </div>
                            <button
                                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                            >
                                <Bookmark className="w-3 h-3 text-white" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 p-3.5" style={{ background: "#0e0f1c" }}>
                                <p className="text-white font-bold" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "15px" }}>
                                    {floatingCards[1].name}
                                </p>
                                <p className="text-white/40 text-[9px] uppercase tracking-wider mt-0.5">{floatingCards[1].type}</p>
                                <div className="flex gap-1 mt-2">
                                    {[0, 1, 2].map((d) => (
                                        <div
                                            key={d}
                                            className="h-[3px] rounded-full"
                                            style={{ width: d === 0 ? "20px" : "5px", background: d === 0 ? "#d80032" : "rgba(255,255,255,0.18)" }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Card 3 — back-right */}
                        <div
                            className="absolute overflow-hidden rounded-3xl hero-card-3"
                            style={{
                                width: "185px",
                                height: "268px",
                                top: "50%",
                                right: "24px",
                                transform: "translateY(calc(-50% + 28px)) rotate(3deg)",
                                zIndex: 2,
                                boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08) inset",
                                background: "#0e0f1c",
                            }}
                        >
                            <img
                                src={floatingCards[2].image}
                                alt={floatingCards[2].name}
                                className="w-full object-cover"
                                style={{ height: "70%" }}
                            />
                            <div
                                className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold"
                                style={{ background: "rgba(255,255,255,0.93)", color: "#1a1c2e", backdropFilter: "blur(8px)" }}
                            >
                                <Star className="w-2.5 h-2.5 fill-[#d80032] text-[#d80032]" />
                                {floatingCards[2].rating}
                            </div>
                            <button
                                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                            >
                                <Bookmark className="w-3 h-3 text-white" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: "#0e0f1c" }}>
                                <p className="text-white text-sm font-bold" style={{ fontFamily: "var(--font-fraunces), serif" }}>
                                    {floatingCards[2].name}
                                </p>
                                <p className="text-white/40 text-[9px] uppercase tracking-wider mt-0.5">{floatingCards[2].type}</p>
                                <div className="flex gap-1 mt-1.5">
                                    {[0, 1, 2].map((d) => (
                                        <div
                                            key={d}
                                            className="h-[3px] rounded-full"
                                            style={{ width: d === 0 ? "18px" : "5px", background: d === 0 ? "#d80032" : "rgba(255,255,255,0.18)" }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ─── Slide indicators ─── */}
            <div className="absolute bottom-7 left-6 z-10 flex gap-1.5 items-center">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className="rounded-full transition-all duration-400"
                        style={{
                            width: currentImageIndex === index ? "28px" : "7px",
                            height: "7px",
                            background: currentImageIndex === index ? "#d80032" : "rgba(255,255,255,0.25)",
                        }}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Slide counter — bottom right */}
            <div className="absolute bottom-7 right-7 z-10 hidden lg:flex items-center gap-1 font-mono text-xs">
                <span className="text-white/85 font-semibold text-sm tabular-nums">
                    {String(currentImageIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/25">/</span>
                <span className="text-white/25 tabular-nums">{String(heroImages.length).padStart(2, "0")}</span>
            </div>

        </section>
    );
}
