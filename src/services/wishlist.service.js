import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const addWishlistService = async (productId) => {
  const response = await api.post(
    API_ENDPOINTS.WISHLIST_ITEM(productId)
  );

  return response.data;
};

export const getWishlistService = async (
  page = 1,
  page_size = 20
) => {
  const response = await api.get(API_ENDPOINTS.WISHLIST, {
    params: {
      page,
      page_size,
    },
  });

  return response.data;
};

export const removeWishlistService = async (productId) => {
  const response = await api.delete(
    API_ENDPOINTS.WISHLIST_ITEM(productId)
  );

  return response.data;
};
