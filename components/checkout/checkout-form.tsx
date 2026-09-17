"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { getEffectivePrice } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export function CheckoutForm() {
  const { items, subtotal, shipping, tax, total, isHydrated } = useCart();
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [showError, setShowError] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isHydrated) {
    return (
      <Container className="py-16 text-center">
        <h1 className="font-display text-4xl">Checkout</h1>
        <p className="mt-4 text-muted-foreground">Loading cart…</p>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-16 text-center">
        <h1 className="font-display text-4xl">Checkout</h1>
        <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </Container>
    );
  }

  return (
    <>
      {showError && (
        <div className="border-b border-red-200 bg-red-50">
          <Container className="py-3">
            <div className="flex items-center gap-2 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>
                <span className="font-semibold">ERROR:</span> Please sign in first.{" "}
                <Link href="/profile" className="font-medium underline underline-offset-2">
                  Log in
                </Link>
              </p>
            </div>
          </Container>
        </div>
      )}

      <Container className="py-8 md:py-12">
      <h1 className="mb-8 font-display text-4xl">Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            <section>
              <h2 className="mb-4 text-lg font-semibold">Customer Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required className="mt-1.5" />
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="United States" required className="mt-1.5" />
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <div className="mb-4 flex items-center gap-2">
                <Checkbox
                  id="same-address"
                  checked={sameAsShipping}
                  onCheckedChange={(checked) => setSameAsShipping(checked === true)}
                />
                <Label htmlFor="same-address" className="cursor-pointer font-normal">
                  Billing address same as shipping
                </Label>
              </div>
              {!sameAsShipping && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <Input id="billingAddress" required className="mt-1.5" />
                  </div>
                </div>
              )}
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-lg font-semibold">Card Details</h2>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="4242 4242 4242 4242" required className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required className="mt-1.5" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded border border-border">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(getEffectivePrice(item.product) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button type="submit" size="lg" className="mt-6 w-full">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </form>
      </Container>
    </>
  );
}
