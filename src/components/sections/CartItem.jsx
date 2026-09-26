"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import Text from "@/components/ui/Text";
import useCart from "@/hooks/useCart";
import { getProductDetails } from "@/services/product.service";
import { getImageUrl } from "@/lib/imageUrl";
import Link from "next/link";

export default function CartItem({ item, cartItems = [], fetchCart }) {
  const { addCart, removeItem } = useCart();

  const [qty, setQty] = useState(item.quantity);
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState([]);
  const [switching, setSwitching] = useState(false);
  const [variantError, setVariantError] = useState("");

  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  // =========================
  // LOAD THIS PRODUCT'S ACTIVE VARIANTS (for the weight/size dropdown)
  // =========================
  useEffect(() => {
    let cancelled = false;

    const loadVariants = async () => {
      try {
        const response = await getProductDetails(item.product_id);
        const activeVariants = (response?.data?.variants || []).filter(
          (v) => v.is_active
        );
        if (!cancelled) setVariants(activeVariants);
      } catch (error) {
        console.log("Load Variants Error:", error);
      }
    };

    if (item?.product_id) loadVariants();

    return () => {
      cancelled = true;
    };
  }, [item.product_id]);

  // =========================
  // SWITCH VARIANT
  // =========================
  const handleVariantChange = async (newVariantId) => {
    if (switching || loading) return;
    if (!newVariantId || newVariantId === item.variant_id) return;

    const newVariant = variants.find((v) => v.id === newVariantId);
    if (!newVariant) return;

    if (Number(newVariant.stock_qty) <= 0) {
      setVariantError("Selected weight/size is out of stock");
      return;
    }

    // If a cart row for this product+variant already exists (e.g. it was
    // added separately earlier), merge into it instead of overwriting it —
    // never create/leave a duplicate product+variant row.
    const existingTargetRow = cartItems.find(
      (i) =>
        i.cart_id !== item.cart_id &&
        i.product_id === item.product_id &&
        (i.variant_id || null) === newVariant.id
    );

    const mergedQty = (existingTargetRow?.quantity || 0) + qty;
    const targetQty = Math.min(mergedQty, Number(newVariant.stock_qty));
    const stockReduced = targetQty < mergedQty;

    setSwitching(true);
    setVariantError("");

    try {
      const productData = {
        ...item,
        mrp: newVariant.mrp,
        sale_price: newVariant.sale_price,
        sku: newVariant.sku,
        stock_qty: newVariant.stock_qty,
        stock_status: newVariant.stock_status,
        variant_label: newVariant.label,
      };

      const addResponse = await addCart(
        item.product_id,
        targetQty,
        productData,
        newVariant.id
      );

      if (!addResponse?.success) {
        setVariantError(
          addResponse?.message || "Could not switch weight/size"
        );
        return;
      }

      // Remove the old variant's cart line so it doesn't remain as a
      // separate row — same product, different variant, one cart line.
      let removeFailed = false;
      if (item.variant_id) {
        const removeResponse = await removeItem(
          item.product_id,
          item.variant_id
        );
        removeFailed = !removeResponse?.success;
      }

      if (removeFailed) {
        setVariantError(
          "Switched, but couldn't clean up the previous row — refreshing cart"
        );
      } else if (stockReduced) {
        setVariantError(
          `Only ${newVariant.stock_qty} in stock — quantity adjusted`
        );
      } else {
        setVariantError("");
      }

      setQty(targetQty);
    } catch (error) {
      console.log("Switch Variant Error:", error);
      setVariantError("Could not switch weight/size");
    } finally {
      // Always resync from the backend so the UI never shows a state that
      // doesn't match what actually happened server-side.
      await fetchCart(false);
      setSwitching(false);
    }
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = async (newQty) => {
    if (loading) return;
 
    if (newQty < 1) return;
 
    try {
      setLoading(true);

      const response = await addCart(
        item.product_id,
        newQty,
        null,
        item.variant_id || null
      );

      if (response?.success) {
        setQty(newQty);
        await fetchCart(false);
      }
    } catch (error) {
      console.log("Quantity Update Error:", error);
    } finally {
      setLoading(false);
    }
  };
 
  // =========================
  // REMOVE ITEM
  // =========================
  const handleRemove = async () => {
    try {
      setLoading(true);

      const response = await removeItem(
        item.product_id,
        item.variant_id || null
      );

      if (response?.success) {
        await fetchCart(false);
      }
    } catch (error) {
      console.log("Remove Item Error:", error);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Product Image */}
        {/* Product Image */}
       

<Link
  href={`/products/${item.product_id}`}
  className="shrink-0"
>
  <div className="overflow-hidden rounded-xl border bg-gray-50 flex items-center justify-center h-[120px] w-[120px] cursor-pointer hover:opacity-90 transition">
    {item?.thumbnail_url ? (
      <Image
        src={getImageUrl(item.thumbnail_url)}
        alt={item?.name || "Product Image"}
        width={120}
        height={120}
        className="h-full w-full object-contain"
      />
    ) : (
      <span className="text-xs text-gray-400 font-medium">
        No Image
      </span>
    )}
  </div>
</Link>
 
        {/* Product Details */}
        <div className="flex-1">
          <Text variant="h5" className="text-black">
            {item?.name || "Unknown Product"}
          </Text>
 
          {variants.length > 0 ? (
            <div className="mt-2">
              <label className="text-sm text-gray-500 mr-2">
                Weight/Size:
              </label>
              <select
                value={item.variant_id || ""}
                disabled={switching || loading}
                onChange={(e) => handleVariantChange(e.target.value)}
                className="mt-1 h-9 border border-gray-300 rounded-lg px-3 text-sm outline-none disabled:opacity-50"
              >
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.label}
                  </option>
                ))}
              </select>
              {switching && (
                <p className="text-xs text-gray-500 mt-1">Updating...</p>
              )}
              {!switching && variantError && (
                <p className="text-xs text-red-500 mt-1">{variantError}</p>
              )}
            </div>
          ) : (
            item?.variant_label && (
              <Text className="mt-1 font-medium text-[#1B5E20]">
                Weight/Size: {item.variant_label}
              </Text>
            )
          )}

          <Text className="mt-1">SKU: {item?.sku || "N/A"}</Text>
 
          <Text className="mt-1">Brand: {item?.brand || "N/A"}</Text>
 
          <Text className="mt-1">Category: {item?.category_name || "N/A"}</Text>
 
          {/* PRICE - Added safe fallbacks for toLocaleString */}
          <div className="mt-3 flex items-center gap-3">
            <Text variant="h5" className="text-text-primary">
              ₹{(item?.sale_price || 0).toLocaleString()}
            </Text>
 
            <span className="text-sm text-gray-400 line-through">
              ₹{(item?.mrp || 0).toLocaleString()}
            </span>
          </div>
 
          {/* TOTAL - Added safe fallbacks */}
          <Text className="mt-2 font-semibold text-green-600">
            Total: ₹{(qty * (item?.sale_price || 0)).toLocaleString()}
          </Text>
 
          {/* ACTIONS */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            {/* QUANTITY */}
            <div className="flex items-center rounded-xl border">
              {/* MINUS */}
              <button
                type="button"
                disabled={loading || switching || qty <= 1}
                onClick={() => updateQuantity(qty - 1)}
                className="flex h-10 w-10 items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              >
                <Minus size={18} />
              </button>
 
              <span className="min-w-[50px] text-center font-semibold">
                {qty}
              </span>
 
              {/* PLUS */}
              <button
                type="button"
                disabled={loading || switching}
                onClick={() => updateQuantity(qty + 1)}
                className="flex h-10 w-10 items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              >
                <Plus size={18} />
              </button>
            </div>
 
            {/* REMOVE */}
            <button
              type="button"
              disabled={loading || switching}
              onClick={handleRemove}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 size={18} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}