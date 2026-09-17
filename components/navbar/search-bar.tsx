"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchProducts } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

interface SearchBarProps {
  onClose?: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchResults = searchQuery.length > 0 ? searchProducts(searchQuery).slice(0, 5) : [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      onClose?.();
    }
  };

  return (
    <Container className="py-3">
      <div ref={searchRef} className="relative">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white"
              aria-label="Search products"
            >
              <Search className="h-4 w-4" />
            </button>
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search packs, apparel, training gear..."
              className="h-11 rounded-sm border-white/15 bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/50 shadow-none focus-visible:ring-accent"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
            />
          </div>
        </form>

        {searchOpen && searchQuery.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden border border-border bg-white py-1 shadow-lg">
            {searchResults.length > 0 ? (
              <>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 text-foreground transition-colors hover:bg-muted"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                      onClose?.();
                    }}
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-border bg-muted">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.category} · {formatPrice(product.salePrice ?? product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
                <button
                  type="button"
                  className="w-full border-t border-border px-3 py-2.5 text-left text-sm font-semibold text-accent transition-colors hover:bg-muted"
                  onClick={() => {
                    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                    setSearchQuery("");
                    onClose?.();
                  }}
                >
                  View all results for &quot;{searchQuery}&quot;
                </button>
              </>
            ) : (
              <div className="px-3 py-3 text-sm text-muted-foreground">
                No products found for &quot;{searchQuery}&quot;.
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
