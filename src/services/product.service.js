import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const getProducts = async ({
  page = 1,
  page_size = 20,
  search = "",
  category_id = "",
  category_name = "",
  is_featured,
  is_bestseller,
  is_new_arrival,
} = {}) => {
  const response = await api.get(API_ENDPOINTS.PRODUCTS, {
    params: {
      page,
      page_size,
      search: search || undefined,
      category_id: category_id || undefined,
      category_name: category_name || undefined,
      is_featured,
      is_bestseller,
      is_new_arrival,
    },
  });

  return response.data;
};

export const getProductDetails = async (id) => {
  const response = await api.get(
    API_ENDPOINTS.PRODUCT_DETAILS(id)
  );

  return response.data;
};
