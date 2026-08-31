import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

export const getHomepageData = async () => {
  const response = await api.get(API_ENDPOINTS.HOMEPAGE);
  return response.data;
};

export const subscribeNewsletter = async (email) => {
  const response = await api.post(API_ENDPOINTS.NEWSLETTER_SUBSCRIBE, {
    email,
  });
  return response.data;
};
