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

export const getAboutPageData = async () => {
  const response = await api.get(API_ENDPOINTS.ABOUT_PAGE);
  return response.data;
};

export const getContactPageData = async () => {
  const response = await api.get(API_ENDPOINTS.CONTACT_PAGE);
  return response.data;
};

export const getFooterData = async () => {
  const response = await api.get(API_ENDPOINTS.FOOTER);
  return response.data;
};

export const getSiteMetaData = async () => {
  const response = await api.get(API_ENDPOINTS.SITE_META);
  return response.data;
};

export const getWhatsAppSettings = async () => {
  const response = await api.get(API_ENDPOINTS.WHATSAPP);
  return response.data;
};

export const getWelcomePopupData = async () => {
  const response = await api.get(API_ENDPOINTS.WELCOME_POPUP);
  return response.data;
};

export const getSocialMediaData = async () => {
  const response = await api.get(API_ENDPOINTS.SOCIAL_MEDIA);
  return response.data;
};

export const getPoliciesData = async () => {
  const response = await api.get(API_ENDPOINTS.POLICIES);
  return response.data;
};
