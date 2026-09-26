"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, Leaf, Clock, Flame, Package, Minus, Plus } from "lucide-react";

import { Container, Text, Button, AuthModal } from "@/components";
import useCart from "@/hooks/useCart";
import useProductDetails from "@/hooks/useProductDetails";
import { getImageUrl } from "@/lib/imageUrl";

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
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { product, loading, fetchProduct } = useProductDetails();
  const { addCart } = useCart();

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setQuantity(1);
    setSelectedVariantId(
      product?.default_variant_id ||
        product?.variants?.[0]?.id ||
        null
    );
  }, [product?.id]);

  const activeVariants = (product?.variants || []).filter(
    (v) => v.is_active
  );

  const selectedVariant =
    activeVariants.find((v) => v.id === selectedVariantId) || null;

  const displayMrp = selectedVariant
    ? Number(selectedVariant.mrp)
    : Number(product?.mrp || 0);

  const displaySalePrice = selectedVariant
    ? Number(selectedVariant.sale_price)
    : Number(product?.sale_price || 0);

  const displayStockQty = selectedVariant
    ? selectedVariant.stock_qty
    : Number(product?.stock_qty || 0);

  const displaySku = selectedVariant
    ? selectedVariant.sku
    : product?.sku;

  const displayStockStatus = selectedVariant
    ? selectedVariant.stock_status
    : product?.stock_status;

  const validProductImages =
    product?.images
      ?.filter((img) => img?.image_url)
      .map((img) => ({ ...img, image_url: getImageUrl(img.image_url) })) ||
    [];

  const images =
    validProductImages.length > 0
      ? validProductImages
      : product?.thumbnail_url
      ? [{ image_url: getImageUrl(product.thumbnail_url) }]
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
    displayStockStatus?.toLowerCase() === "out of stock" ||
    Number(displayStockQty) <= 0;

  const handleBuyNow = async () => {
    if (isOutOfStock) return;
    if (activeVariants.length > 0 && !selectedVariant) return;

    try {
      setAdding(true);

      const productData = {
        ...product,
        mrp: displayMrp,
        sale_price: displaySalePrice,
        sku: displaySku,
        stock_qty: displayStockQty,
        stock_status: displayStockStatus,
        variant_label: selectedVariant?.label || null,
      };

      const res = await addCart(
        product.id,
        quantity,
        productData,
        selectedVariant?.id || null
      );
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
                ₹{displaySalePrice}
              </span>
              {displayMrp > 0 && (
                <span className="line-through text-gray-400">
                  ₹{displayMrp}
                </span>
              )}
              {displayMrp > 0 && displaySalePrice < displayMrp && (
                <span className="rounded-full bg-[#D4AF37]/20 px-3 py-1 text-xs font-semibold text-[#1B5E20]">
                  {Math.round(
                    ((displayMrp - displaySalePrice) / displayMrp) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>

            {activeVariants.length > 0 && (
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Weight / Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {activeVariants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${
                        selectedVariantId === variant.id
                          ? "border-[#1B5E20] bg-[#1B5E20]/10 text-[#1B5E20]"
                          : "border-gray-200 text-gray-600 hover:border-[#1B5E20]/40"
                      }`}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              {isOutOfStock ? (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              ) : (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {displayStockStatus} · {displayStockQty} in stock
                </span>
              )}
            </div>

            <p className="mt-4 text-gray-600">{product.short_description}</p>
            <p className="mt-2 text-gray-600">{product.description}</p>

            {!isOutOfStock && (
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">
                  Quantity
                </span>
                <div className="flex items-center rounded-xl border">
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-[40px] text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={quantity >= displayStockQty}
                    onClick={() =>
                      setQuantity((q) => Math.min(displayStockQty, q + 1))
                    }
                    className="flex h-10 w-10 items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="font-semibold text-[#1B5E20]">
                  Total: ₹{(quantity * displaySalePrice).toLocaleString()}
                </span>
              </div>
            )}

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
