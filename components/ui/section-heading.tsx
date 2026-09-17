import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  viewMoreLink?: string;
  viewMoreText?: string;
  className?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  viewMoreLink,
  viewMoreText = "View All",
  className,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
        centered && "text-center sm:flex-col sm:items-center",
        className
      )}
    >
      <div>
        <h2
          className={cn(
            "font-display text-3xl font-semibold tracking-wide md:text-4xl",
            light ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={cn("mt-2 max-w-xl text-sm md:text-base", light ? "text-white/75" : "text-muted-foreground")}>
            {subtitle}
          </p>
        )}
      </div>
      {viewMoreLink && (
        <Button variant="link" asChild className={cn("text-sm font-medium", light && "text-white")}>
          <Link href={viewMoreLink}>{viewMoreText} →</Link>
        </Button>
      )}
    </div>
  );
}
