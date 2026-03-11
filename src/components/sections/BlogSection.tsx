import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { formatBlogDateGMT8 } from "@/lib/dateUtils";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    metaDescription: string | null;
    featureImage: string | null;
    publishedAt: string;
}

interface BlogSectionProps {
    posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
    if (posts.length === 0) return null;

    const featured = posts[0];
    const remaining = posts.slice(1, 4);

    return (
        <section className="bg-[var(--background-alt)] py-16 sm:py-20 lg:py-24 overflow-hidden">
            <div className="max-w-container mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <span
                                className="w-5 h-px rounded-full"
                                style={{ background: "var(--brand-primary)" }}
                            />
                            <p className="text-[var(--brand-primary)] text-[11px] font-bold uppercase tracking-[0.2em]">
                                Insights &amp; Stories
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
                            Explore the Blog
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-primary)] transition-all duration-200 group/link pb-0.5"
                        style={{ borderBottom: "1px solid rgba(216,0,50,0.25)" }}
                    >
                        Visit Blog
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                </div>

                {/* Editorial grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">

                    {/* ─── Featured large card (col-span-3) ─── */}
                    <Link
                        href={`/blog/${featured.slug}`}
                        className="group lg:col-span-3 block relative rounded-[1.6rem] overflow-hidden transition-all duration-400 hover:-translate-y-1"
                        style={{
                            background: "var(--card-bg)",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                            minHeight: "420px",
                        }}
                    >
                        {featured.featureImage ? (
                            <>
                                <div className="absolute inset-0">
                                    <img
                                        src={featured.featureImage}
                                        alt={featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                </div>
                                {/* Rich gradient for text legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#060810]/95 via-[#0c0d1a]/45 to-transparent" />
                            </>
                        ) : (
                            <div className="absolute inset-0" style={{ background: "var(--background-accent)" }} />
                        )}

                        {/* Content at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                            <div
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
                                style={{ background: "var(--brand-primary)", color: "white" }}
                            >
                                Featured
                            </div>

                            <div className="flex items-center gap-2 text-white/45 text-xs mb-3">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatBlogDateGMT8(featured.publishedAt)}
                            </div>

                            <h3
                                className="text-white text-xl sm:text-2xl font-bold leading-snug mb-3 group-hover:text-white/85 transition-colors duration-250"
                                style={{
                                    fontFamily: "var(--font-fraunces), serif",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                {featured.title}
                            </h3>

                            {featured.metaDescription && (
                                <p className="text-white/50 text-sm line-clamp-2 leading-relaxed mb-5">
                                    {featured.metaDescription}
                                </p>
                            )}

                            <div
                                className="inline-flex items-center gap-2 text-white text-xs font-bold transition-all duration-250 group-hover:gap-3"
                                style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}
                            >
                                Read Article
                                <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </Link>

                    {/* ─── Smaller cards stack (col-span-2) ─── */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {remaining.length > 0 ? (
                            remaining.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group flex gap-0 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                                    style={{
                                        background: "var(--card-bg)",
                                        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                                        border: "1px solid var(--border)",
                                    }}
                                >
                                    {/* Thumbnail */}
                                    {post.featureImage && (
                                        <div
                                            className="w-[96px] sm:w-[112px] flex-shrink-0 overflow-hidden relative"
                                            style={{ minHeight: "96px" }}
                                        >
                                            <img
                                                src={post.featureImage}
                                                alt={post.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    {/* Text */}
                                    <div className="flex flex-col justify-center p-4 flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 text-[var(--muted)] text-[10px] mb-2 uppercase tracking-wide">
                                            <Calendar className="w-3 h-3 shrink-0" />
                                            {formatBlogDateGMT8(post.publishedAt)}
                                        </div>
                                        <h3
                                            className="text-[var(--foreground)] font-bold text-sm leading-snug line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors duration-250 mb-1.5"
                                            style={{
                                                fontFamily: "var(--font-fraunces), serif",
                                                letterSpacing: "-0.01em",
                                            }}
                                        >
                                            {post.title}
                                        </h3>
                                        {post.metaDescription && (
                                            <p className="text-[var(--muted)] text-xs line-clamp-1 leading-relaxed">
                                                {post.metaDescription}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))
                        ) : null}

                        {/* "All Articles" card */}
                        <Link
                            href="/blog"
                            className="group flex-1 flex items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] hover:border-[var(--brand-primary)]/35 transition-all duration-300 p-6 gap-3 hover:bg-[var(--brand-primary)]/[0.03]"
                            style={{ minHeight: "96px" }}
                        >
                            <span className="text-sm font-semibold text-[var(--muted)] group-hover:text-[var(--brand-primary)] transition-colors">
                                Browse All Articles
                            </span>
                            <ArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                    </div>
                </div>

                {/* Mobile CTA */}
                <div className="sm:hidden text-center mt-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-7 py-3 text-white text-sm font-semibold rounded-full"
                        style={{
                            background: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)",
                            boxShadow: "0 4px 20px rgba(216,0,50,0.25)",
                        }}
                    >
                        Visit Our Blog
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
