"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { getEffectivePrice } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartPageContent() {
  const { items, removeFromCart, updateQuantity, subtotal, shipping, tax, total, isHydrated } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "save10") {
      setCouponApplied(true);
    }
  };

  const discount = couponApplied ? subtotal * 0.1 : 0;
  const finalTotal = total - discount;

  if (!isHydrated) {
    return (
      <Container className="py-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl">Your Cart</h1>
        <p className="mt-4 text-muted-foreground">Loading cart…</p>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl">Your Cart</h1>
        <p className="mt-4 text-muted-foreground">Your cart is currently empty.</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-12">
      <h1 className="mb-8 font-display text-4xl md:text-5xl">Your Cart</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="hidden grid-cols-12 gap-4 border-b border-border bg-muted/30 px-4 py-3 text-xs font-semibold uppercase tracking-wider md:grid">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-3 text-right">Price</div>
              <div className="col-span-1" />
            </div>

            {items.map((item) => (
              <div key={item.product.id} className="grid grid-cols-1 gap-4 border-b border-border p-4 last:border-0 md:grid-cols-12 md:items-center">
                <div className="flex gap-4 md:col-span-6">
                  <Link href={`/product/${item.product.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain bg-muted" sizes="80px" />
                  </Link>
                  <div>
                    <Link href={`/product/${item.product.slug}`} className="text-sm font-medium hover:text-primary">
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">{item.product.category}</p>
                    <p className="mt-1 text-sm md:hidden">{formatPrice(getEffectivePrice(item.product))}</p>
                  </div>
                </div>
                <div className="flex items-center md:col-span-2 md:justify-center">
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(q) => updateQuantity(item.product.id, q)}
                  />
                </div>
                <div className="hidden text-right text-sm font-medium md:col-span-3 md:block">
                  {formatPrice(getEffectivePrice(item.product) * item.quantity)}
                </div>
                <div className="flex justify-end md:col-span-1">
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)} aria-label="Remove item">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-lg border border-border p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button variant="secondary" onClick={applyCoupon}>Apply</Button>
            </div>
            {couponApplied && (
              <p className="mt-2 text-xs text-primary">Coupon SAVE10 applied — 10% off</p>
            )}

            <Separator className="my-6" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-primary">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                </p>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Button asChild size="lg" className="mt-6 w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
