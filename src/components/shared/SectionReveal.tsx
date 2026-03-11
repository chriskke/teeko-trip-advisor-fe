"use client";

import { useEffect, useRef } from "react";

interface SectionRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number; // ms delay before animation starts
}

export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (delay > 0) {
                        setTimeout(() => el.classList.add("revealed"), delay);
                    } else {
                        el.classList.add("revealed");
                    }
                    observer.disconnect();
                }
            },
            { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={`section-reveal ${className}`}>
            {children}
        </div>
    );
}
