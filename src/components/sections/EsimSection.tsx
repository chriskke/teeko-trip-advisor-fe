import Link from "next/link";
import { ArrowRight, Wifi, Clock, Zap } from "lucide-react";

interface Provider {
    id: string;
    name: string;
    slug: string;
}

interface Package {
    id: string;
    packageName: string;
    slug: string;
    featureImage: string | null;
    price: string | null;
    duration: number | null;
    durationUnit: string | null;
    about: string | null;
    provider: Provider | null;
}

interface EsimSectionProps {
    packages: Package[];
}

export function EsimSection({ packages }: EsimSectionProps) {
    if (packages.length === 0) return null;

    const sortedPackages = [...packages].sort((a, b) => {
        const priceA = a.price ? parseInt(a.price.replace(/[^\d]/g, ""), 10) : Infinity;
        const priceB = b.price ? parseInt(b.price.replace(/[^\d]/g, ""), 10) : Infinity;
        return priceA - priceB;
    });

    const featured = sortedPackages[0];
    const rest = sortedPackages.slice(1, 3);

    return (
        <section
            className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
            style={{ background: "#14152a" }}
        >
            {/* Film grain texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.03,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "160px 160px",
                }}
            />

            {/* Atmospheric glow — top right */}
            <div
                className="absolute -top-24 -right-24 pointer-events-none"
                style={{
                    width: "600px",
                    height: "600px",
                    borderRadius: "9999px",
                    background: "radial-gradient(circle at top right, rgba(216,0,50,0.1) 0%, transparent 60%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Decorative editorial circles — background ornament */}
            <div
                className="absolute pointer-events-none hidden lg:block"
                style={{
                    width: "260px",
                    height: "260px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    top: "50%",
                    left: "-80px",
                    transform: "translateY(-50%)",
                }}
            />
            <div
                className="absolute pointer-events-none hidden lg:block"
                style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "9999px",
                    border: "1px dashed rgba(216,0,50,0.08)",
                    top: "50%",
                    left: "-30px",
                    transform: "translateY(-50%)",
                }}
            />

            <div className="relative z-10 max-w-container mx-auto px-6 lg:px-8">

                {/* Section header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <span
                                className="w-5 h-px rounded-full"
                                style={{ background: "rgba(216,0,50,0.7)" }}
                            />
                            <p className="text-[var(--brand-primary)] text-[11px] font-bold uppercase tracking-[0.2em]">
                                Stay Connected
                            </p>
                        </div>
                        <h2
                            className="text-white leading-tight"
                            style={{
                                fontFamily: "var(--font-fraunces), serif",
                                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                                fontWeight: 700,
                                letterSpacing: "-0.04em",
                            }}
                        >
                            Travel SIM Packages
                        </h2>
                        <p className="text-white/38 text-sm mt-2 max-w-sm leading-relaxed">
                            Premium eSIM packages — stay connected across Malaysia and beyond.
                        </p>
                    </div>

                    <Link
                        href="/travel-sim-malaysia"
                        className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white border border-white/12 hover:border-white/25 hover:bg-white/[0.04] transition-all duration-200 w-fit group/btn"
                    >
                        View All Packages
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">

                    {/* ─── Featured large card (col-span-2) ─── */}
                    {featured && (
                        <Link
                            href={`/travel-sim-malaysia/${featured.slug}`}
                            className="group lg:col-span-2 block relative rounded-[1.6rem] overflow-hidden transition-all duration-400 hover:-translate-y-1.5"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
                                minHeight: "300px",
                            }}
                        >
                            {/* Background image */}
                            {featured.featureImage && (
                                <>
                                    <div className="absolute inset-0">
                                        <img
                                            src={featured.featureImage}
                                            alt={featured.packageName}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#14152a]/97 via-[#14152a]/55 to-[#14152a]/18" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#14152a]/75 via-transparent to-transparent" />
                                </>
                            )}

                            {/* Content overlay */}
                            <div className="relative z-10 p-7 flex flex-col h-full" style={{ minHeight: "300px" }}>
                                {/* Top badges */}
                                <div className="flex items-center gap-2 mb-auto">
                                    {featured.provider && (
                                        <span
                                            className="px-3 py-1 rounded-full text-[11px] font-bold text-white"
                                            style={{ background: "var(--brand-primary)" }}
                                        >
                                            {featured.provider.name}
                                        </span>
                                    )}
                                    <span
                                        className="px-3 py-1 rounded-full text-[11px] font-bold text-white/65"
                                        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                                    >
                                        Best Value
                                    </span>
                                </div>

                                {/* Bottom content */}
                                <div className="mt-auto">
                                    <h3
                                        className="text-white text-xl sm:text-2xl font-bold mb-3 leading-tight"
                                        style={{ fontFamily: "var(--font-fraunces), serif" }}
                                    >
                                        {featured.packageName}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        {featured.duration && (
                                            <div className="flex items-center gap-1.5 text-white/50 text-xs">
                                                <Clock className="w-3.5 h-3.5" />
                                                {featured.duration} {featured.durationUnit || "days"}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5 text-white/50 text-xs">
                                            <Wifi className="w-3.5 h-3.5" />
                                            High-speed data
                                        </div>
                                        <div className="flex items-center gap-1.5 text-white/50 text-xs">
                                            <Zap className="w-3.5 h-3.5" />
                                            Instant activation
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {featured.price && (
                                            <div>
                                                <p className="text-white/35 text-[10px] uppercase tracking-widest mb-0.5">Starting from</p>
                                                <p
                                                    className="text-white text-2xl font-bold"
                                                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                                                >
                                                    {featured.price}
                                                </p>
                                            </div>
                                        )}
                                        <div
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white group-hover:scale-[1.04] transition-transform duration-200"
                                            style={{
                                                background: "var(--brand-primary)",
                                                boxShadow: "0 4px 20px rgba(216,0,50,0.4)",
                                            }}
                                        >
                                            Get This Plan
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* ─── Right stacked smaller cards ─── */}
                    <div className="flex lg:flex-col gap-4 lg:gap-5">
                        {rest.map((pkg) => (
                            <Link
                                key={pkg.id}
                                href={`/travel-sim-malaysia/${pkg.slug}`}
                                className="group flex-1 block relative rounded-[1.6rem] overflow-hidden transition-all duration-400 hover:-translate-y-1.5"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                                    minHeight: "136px",
                                }}
                            >
                                {pkg.featureImage && (
                                    <>
                                        <div className="absolute inset-0">
                                            <img
                                                src={pkg.featureImage}
                                                alt={pkg.packageName}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-35"
                                            />
                                        </div>
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: "linear-gradient(135deg, rgba(20,21,42,0.92) 0%, rgba(43,45,66,0.72) 100%)" }}
                                        />
                                    </>
                                )}

                                <div className="relative z-10 p-5 flex items-center justify-between h-full">
                                    <div className="flex-1 min-w-0 pr-4">
                                        {pkg.provider && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)] mb-1 block">
                                                {pkg.provider.name}
                                            </span>
                                        )}
                                        <h4
                                            className="text-white font-bold text-sm leading-snug line-clamp-2 mb-1"
                                            style={{ fontFamily: "var(--font-fraunces), serif" }}
                                        >
                                            {pkg.packageName}
                                        </h4>
                                        {pkg.duration && (
                                            <p className="text-white/35 text-xs">{pkg.duration} {pkg.durationUnit || "days"}</p>
                                        )}
                                    </div>

                                    <div className="flex-shrink-0 text-right">
                                        {pkg.price && (
                                            <p
                                                className="text-white font-bold text-lg"
                                                style={{ fontFamily: "var(--font-fraunces), serif" }}
                                            >
                                                {pkg.price}
                                            </p>
                                        )}
                                        <div
                                            className="mt-2 inline-flex items-center justify-center w-8 h-8 rounded-full group-hover:scale-110 transition-transform duration-200"
                                            style={{ background: "var(--brand-primary)" }}
                                        >
                                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile view-all */}
                <div className="sm:hidden text-center mt-8">
                    <Link
                        href="/travel-sim-malaysia"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border border-white/18 hover:bg-white/5 transition-all"
                    >
                        View All Packages
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
