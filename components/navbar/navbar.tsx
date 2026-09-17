"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { company } from "@/data/company";
import { navigationLinks } from "@/data/navigation";
import { utilityStrip } from "@/data/homepage";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/navbar/search-bar";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="bg-foreground text-white">
      <div className="border-b border-white/10 bg-black">
        <Container>
          <p className="flex h-8 items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
            {utilityStrip.items.map((item, index) => (
              <span key={item} className="flex items-center gap-3">
                {index > 0 && <span className="hidden text-accent sm:inline" aria-hidden>•</span>}
                <span className={cn(index > 0 && "hidden sm:inline")}>{item}</span>
              </span>
            ))}
          </p>
        </Container>
      </div>

      <Container>
        <div className="flex h-14 items-center gap-4 lg:h-16">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center bg-white" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <path d="M6 22H26" stroke="#1E6BFF" strokeWidth="2" />
                <path d="M8 17L16 9L24 17" stroke="#0B0D10" strokeWidth="2.2" />
                <path d="M10 20L16 14L22 20" stroke="#0B0D10" strokeWidth="2.2" />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold tracking-[0.18em] text-white sm:text-xl">
              {company.displayName}
            </span>
          </Link>

          <nav className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-0.5">
              {navigationLinks.map((link) => (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="rounded-sm px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute left-0 top-full z-50 min-w-[210px] border border-white/10 bg-foreground py-2 shadow-xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-white hover:bg-white/10"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label={searchOpen ? "Close search" : "Search"}
              aria-expanded={searchOpen}
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative hidden h-10 w-10 text-white hover:bg-white/10 sm:inline-flex">
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-[18px] w-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="hidden h-10 w-10 text-white hover:bg-white/10 sm:inline-flex">
              <Link href="/profile" aria-label="Account">
                <User className="h-[18px] w-[18px]" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative h-10 w-10 text-white hover:bg-white/10">
              <Link href="/cart" aria-label="Cart">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </Container>

      {searchOpen && (
        <div className="border-t border-white/10 bg-black">
          <SearchBar onClose={() => setSearchOpen(false)} />
        </div>
      )}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(100%,20rem)] flex-col bg-foreground shadow-2xl">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
              <span className="font-display text-base tracking-[0.18em]">{company.displayName}</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-1">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-3 font-display text-lg tracking-wide text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <ul className="mb-3 space-y-1 border-l border-white/15 pl-4">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-2 text-sm text-white/75 hover:text-white"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-2 border-t border-white/10 pt-6">
                <Link
                  href="/wishlist"
                  className="border border-white/15 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                  onClick={() => setMobileOpen(false)}
                >
                  Wishlist
                </Link>
                <Link
                  href="/profile"
                  className="border border-white/15 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                  onClick={() => setMobileOpen(false)}
                >
                  Account
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
