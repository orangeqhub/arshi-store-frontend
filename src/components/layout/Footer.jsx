"use client";

import Link from "next/link";
import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

import { FiPhone, FiMail } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

import { Container, Text } from "@/components";
import useCategories from "@/hooks/useCategories";
import { getFooterData, getSocialMediaData } from "@/services/cms.service";
import useCmsSiteContent from "@/hooks/useCmsSiteContent";

const DEFAULT_FOOTER = {
  tagline: "Pure. Authentic. Homemade with Love.",
  description:
    "Premium homemade pickles, snacks, sweets and natural foods crafted with traditional recipes and delivered fresh to your doorstep.",
  quick_links: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  support_links: [
    { label: "My Orders", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Cart", href: "/cart" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Return Policy", href: "/return-policy" },
  ],
  phones: ["+91 9885161899", "+91 9849845670"],
  email: "info@arshinaturals.com",
  address: "Guntur, Andhra Pradesh 522001, India",
  developer_name: "Orange Quantum Hub",
  developer_url: "https://www.ameyait.com/",
  copyright: "2026 Arshi Naturals. All rights reserved.",
  payment_methods: ["Razorpay", "UPI", "PhonePe", "COD"],
};

export default function Footer() {
  const { categories } = useCategories();
  const { data: footerData } = useCmsSiteContent(getFooterData);
  const { data: socialData } = useCmsSiteContent(getSocialMediaData);

  const footer = { ...DEFAULT_FOOTER, ...(footerData || {}) };
  const social = { ...{}, ...(socialData || {}) };

  const quickLinks = footer.quick_links || DEFAULT_FOOTER.quick_links;
  const supportLinks = footer.support_links || DEFAULT_FOOTER.support_links;
  const phones = footer.phones?.length ? footer.phones : DEFAULT_FOOTER.phones;
  const paymentMethods = footer.payment_methods?.length
    ? footer.payment_methods
    : DEFAULT_FOOTER.payment_methods;

  const socialIcons = [
    { key: "facebook", url: social.facebook || "https://facebook.com", icon: <FaFacebookF size={18} /> },
    { key: "instagram", url: social.instagram || "https://instagram.com", icon: <FaInstagram size={18} /> },
    { key: "youtube", url: social.youtube || "https://youtube.com", icon: <FaYoutube size={18} /> },
    { key: "twitter", url: social.twitter || "", icon: <FaTwitter size={18} /> },
  ].filter((s) => s.url);

  return (
    <footer className="mt-10 bg-[#1B5E20] text-white">
      <Container>
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:py-5">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="mb-2 flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="Arshi Naturals"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>

            <Text variant="body" className="mb-1 text-white/80 leading-5">
              {footer.tagline}
            </Text>

            <Text variant="body" className="mb-2 text-white/70 leading-5">
              {footer.description}
            </Text>

            <div className="flex gap-3">
              {socialIcons.map((s) => (
                <SocialIcon key={s.key} href={s.url}>
                  {s.icon}
                </SocialIcon>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Text as="h4" variant="h5" className="mb-1.5 text-white">
              Quick Links
            </Text>
            <ul className="space-y-1">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <Text
                      variant="body"
                      className="cursor-pointer text-white/70 transition hover:text-[#D4AF37]"
                    >
                      {item.label}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <Text as="h4" variant="h5" className="mb-1.5 text-white">
              Categories
            </Text>
            <ul className="space-y-1">
              {categories.map((item) => (
                <li key={item.id}>
                  <Link
                    href="/products"
                    onClick={() => {
                      sessionStorage.setItem("selectedCategory", item.id);
                      sessionStorage.setItem("selectedCategoryName", item.name);
                    }}
                  >
                    <Text
                      variant="body"
                      className="cursor-pointer text-white/70 transition hover:text-[#D4AF37]"
                    >
                      {item.name}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <Text as="h4" variant="h5" className="mb-1.5 text-white">
              Customer Support
            </Text>
            <ul className="space-y-1 mb-2.5">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <Text
                      variant="body"
                      className="cursor-pointer text-white/70 transition hover:text-[#D4AF37]"
                    >
                      {item.label}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>

            <Text as="h4" variant="h5" className="mb-1.5 text-white">
              Contact
            </Text>
            <div className="space-y-1.5">
              <div className="flex gap-3">
                <FiPhone size={18} className="mt-1 text-[#D4AF37]" />
                <div>
                  {phones.map((phone) => (
                    <Text key={phone} variant="body" className="text-white/70 leading-5">
                      {phone}
                    </Text>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <FiMail size={18} className="mt-1 text-[#D4AF37]" />
                <Text variant="body" className="text-white/70">
                  {footer.email}
                </Text>
              </div>
              <div className="flex gap-3">
                <IoLocationOutline size={20} className="mt-1 text-[#D4AF37]" />
                <Text variant="body" className="text-white/70 leading-5">
                  {footer.address}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3 py-2.5 text-sm text-white/50">
            <span>Developed by</span>
            <a
              href={footer.developer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 transition hover:text-[#D4AF37]"
            >
              {footer.developer_name}
            </a>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-2 py-3 md:flex-row">
            <Text variant="bodySmall" className="text-white/60">
              © {footer.copyright}
            </Text>
            <div className="flex gap-4 text-xs text-white/50">
              {paymentMethods.map((method) => (
                <span key={method}>{method}</span>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function SocialIcon({ children, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#D4AF37] hover:text-[#1B5E20]"
    >
      {children}
    </a>
  );
}
