"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, Leaf, Clock, Flame, Package } from "lucide-react";

import { Container, Text, Button, AuthModal } from "@/components";
import useCart from "@/hooks/useCart";
import useProductDetails from "@/hooks/useProductDetails";

function InfoCard({ label, value, icon: Icon }) {
  if (!value) return null;
  return (
    <div className="p-3 bg-primary-soft/50 rounded-xl">
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon size={14} className="text-[#4CAF50]" />}
        <p className="text-gray-500 text-xs">{label}</p>
      </div>
      <p className="font-semibold text-sm text-[#1a2e1a]">{value}</p>
    </div>
  );
}

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { product, loading, fetchProduct } = useProductDetails();
  const { addCart } = useCart();

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product?.id]);

  const validProductImages =
    product?.images?.filter((img) => img?.image_url) || [];

  const images =
    validProductImages.length > 0
      ? validProductImages
      : product?.thumbnail_url
      ? [{ image_url: product.thumbnail_url }]
      : [];

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const isOutOfStock =
    product?.stock_status?.toLowerCase() === "out of stock" ||
    Number(product?.stock_qty) <= 0;

  const handleBuyNow = async () => {
    if (isOutOfStock) return;
    try {
      setAdding(true);
      const res = await addCart(product.id, 1, product);
      if (res?.success) router.push("/cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-[500px] rounded-2xl skeleton" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 skeleton rounded" />
              <div className="h-6 w-1/2 skeleton rounded" />
              <div className="h-32 skeleton rounded" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!product) {
    return <div className="py-20 text-center">Product not found</div>;
  }

  const reviewBlock = product?.reviews?.[0];
  const ratingSummary = reviewBlock?.rating_summary;

  const foodFields = {
    weight: product.weight || product.sku,
    ingredients: product.ingredients || product.manufacturer,
    shelfLife: product.shelf_life || product.hsn_code,
    spiceLevel: product.spice_level,
    nutritionalInfo: product.nutritional_info || product.short_description,
    storage: product.storage_instructions,
  };

  return (
    <section className="py-6 md:py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border bg-white premium-shadow">
            <div className="relative h-[320px] md:h-[500px] flex items-center justify-center">
              {images[currentImageIndex]?.image_url ? (
                <Image
                  src={images[currentImageIndex].image_url}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-all duration-500"
                />
              ) : (
                <span className="text-gray-400 text-sm">
                  No image available
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 p-3 border-t overflow-x-auto">
                {images.map((img, i) =>
                  img?.image_url ? (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 ${
                        i === currentImageIndex
                          ? "border-[#4CAF50]"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img.image_url}
                        alt=""
                        fill
                        className="object-contain p-1"
                      />
                    </button>
                  ) : null
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-[#4CAF50] font-medium">
              {product?.category?.name}
            </p>

            <Text
              variant="h2"
              className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
            >
              {product.name}
            </Text>

            {product.brand && (
              <p className="text-gray-500 mt-1">By {product.brand}</p>
            )}

            <div className="flex flex-wrap gap-3 items-center my-4">
              <span className="text-3xl font-bold text-[#1B5E20]">
                ₹{product.sale_price}
              </span>
              {product.mrp && (
                <span className="line-through text-gray-400">
                  ₹{product.mrp}
                </span>
              )}
              {product.mrp && product.sale_price < product.mrp && (
                <span className="rounded-full bg-[#D4AF37]/20 px-3 py-1 text-xs font-semibold text-[#1B5E20]">
                  {Math.round(
                    ((product.mrp - product.sale_price) / product.mrp) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>

            <div className="mb-3">
              {isOutOfStock ? (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              ) : (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.stock_status} · {product.stock_qty} in stock
                </span>
              )}
            </div>

            <p className="mt-4 text-gray-600">{product.short_description}</p>
            <p className="mt-2 text-gray-600">{product.description}</p>

            <Button
              className="w-full mt-6 bg-[#1B5E20] hover:bg-[#2E7D32] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBuyNow}
              disabled={adding || isOutOfStock}
            >
              {isOutOfStock
                ? "Out of Stock"
                : adding
                ? "Processing..."
                : "Add to Cart"}
            </Button>

            <div className="mt-8 border rounded-2xl p-5 bg-white premium-shadow">
              <h2 className="text-xl font-bold mb-4 text-[#1a2e1a] font-[family-name:var(--font-playfair)]">
                Product Details
              </h2>

              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <InfoCard label="Weight" value={foodFields.weight} icon={Package} />
                <InfoCard
                  label="Ingredients"
                  value={foodFields.ingredients}
                  icon={Leaf}
                />
                <InfoCard
                  label="Shelf Life"
                  value={foodFields.shelfLife}
                  icon={Clock}
                />
                <InfoCard
                  label="Spice Level"
                  value={foodFields.spiceLevel}
                  icon={Flame}
                />
                <InfoCard
                  label="Storage"
                  value={foodFields.storage || "Store in a cool, dry place"}
                  icon={Package}
                />
                {foodFields.nutritionalInfo && (
                  <div className="p-3 bg-primary-soft/50 rounded-xl sm:col-span-2">
                    <p className="text-gray-500 text-xs mb-1">
                      Nutritional Information
                    </p>
                    <p className="font-semibold text-sm text-[#1a2e1a]">
                      {foodFields.nutritionalInfo}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 border rounded-2xl p-5 bg-white premium-shadow">
              <h2 className="text-xl font-bold mb-4 text-[#1a2e1a]">
                Customer Reviews
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-[#1B5E20]">
                  {ratingSummary?.average_rating || product.rating}
                </div>
                <div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i <
                          Math.round(
                            ratingSummary?.average_rating || product.rating
                          )
                            ? "text-[#D4AF37] fill-[#D4AF37]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {ratingSummary?.total_reviews || product.review_count}{" "}
                    Reviews
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-h-[280px] overflow-y-auto">
                {reviewBlock?.reviews?.length ? (
                  reviewBlock.reviews.map((r) => (
                    <div key={r.id} className="border rounded-xl p-3">
                      <div className="flex justify-between">
                        <p className="font-semibold">{r.user?.name}</p>
                        <span className="text-[#D4AF37]">{r.rating}★</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {r.review_text}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No reviews yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      </Container>
    </section>
  );
}
