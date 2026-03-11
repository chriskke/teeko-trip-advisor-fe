"use client";

import Link from "next/link";
import { Menu, X, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeSwitch } from "../shared/ThemeSwitch";
import { MAIN_MENU } from "@/lib/navigation";

export function Navigation({ forceSolid = false }: { forceSolid?: boolean }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolledState, setIsScrolledState] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isScrolled = isScrolledState || forceSolid;

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        const handleScroll = () => {
            setIsScrolledState(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = MAIN_MENU;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
                isScrolled
                    ? "bg-[var(--background)]/90 dark:bg-[#0e0f1c]/92 backdrop-blur-2xl border-b border-[var(--border)] shadow-sm shadow-black/5"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-[var(--brand-primary)]/30 group-hover:ring-[var(--brand-primary)]/60 transition-all duration-300">
                            <img
                                src="/teeko-icon.png"
                                alt="Teeko"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span
                            className={`font-bold tracking-tight transition-colors duration-300`}
                            style={{
                                fontFamily: "var(--font-fraunces), serif",
                                fontSize: "17px",
                                letterSpacing: "-0.03em",
                                color: isScrolled ? "var(--foreground)" : "white",
                            }}
                        >
                            Teeko
                        </span>
                    </Link>

                    {/* Center Menu — Desktop */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {menuItems.map((item: any) =>
                            item.external ? (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-250 ${
                                        item.special
                                            ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary)]/18 hover:border-[var(--brand-primary)]/40"
                                            : isScrolled
                                            ? "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-alt)]"
                                            : "text-white/85 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-250 group/link ${
                                        isScrolled
                                            ? "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-alt)]"
                                            : "text-white/85 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    {item.label}
                                    <span className="absolute bottom-1 left-4 right-4 h-px bg-[var(--brand-primary)] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left rounded-full opacity-70" />
                                </Link>
                            )
                        )}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2.5">
                        <ThemeSwitch isScrolled={isScrolled} />

                        {isLoggedIn ? (
                            <Link
                                href="/profile"
                                className={`hidden sm:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                                    isScrolled
                                        ? "bg-[var(--background-alt)] text-[var(--muted)] hover:text-[var(--brand-primary)] border border-[var(--border)]"
                                        : "bg-white/12 text-white hover:bg-white/22 border border-white/15"
                                }`}
                            >
                                <UserIcon className="w-4 h-4" />
                            </Link>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="hidden sm:inline-flex items-center px-4 py-1.5 bg-[var(--brand-primary)] hover:bg-[var(--color-primary-600)] text-white text-[13px] font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-[var(--brand-primary)]/30 hover:shadow-md active:scale-95"
                            >
                                Sign In
                            </Link>
                        )}

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                                isScrolled
                                    ? "hover:bg-[var(--background-alt)] text-[var(--foreground)]"
                                    : "hover:bg-white/12 text-white"
                            }`}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-14 z-40">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[var(--brand-accent)]/50 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="relative bg-[var(--card-bg)] border border-[var(--border)] shadow-2xl mx-4 mt-2 rounded-2xl overflow-hidden"
                        style={{ animation: "modal-scale-in 0.2s ease-out forwards" }}
                    >
                        <div className="p-3 space-y-0.5">
                            {menuItems.map((item: any) =>
                                item.external ? (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                                            item.special
                                                ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20"
                                                : "text-[var(--foreground)] hover:bg-[var(--background-alt)]"
                                        }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--background-alt)] hover:text-[var(--brand-primary)] rounded-xl transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            )}
                        </div>

                        <div className="p-3 pt-0 border-t border-[var(--border)] mt-1">
                            {isLoggedIn ? (
                                <Link
                                    href="/profile"
                                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[var(--background-alt)] text-[var(--foreground)] text-sm font-semibold rounded-xl transition-colors border border-[var(--border)] mt-3"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <UserIcon className="w-4 h-4" />
                                    <span>My Profile</span>
                                </Link>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    className="flex items-center justify-center w-full px-5 py-3 bg-[var(--brand-primary)] hover:bg-[var(--color-primary-600)] text-white text-sm font-semibold rounded-xl transition-colors mt-3"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
