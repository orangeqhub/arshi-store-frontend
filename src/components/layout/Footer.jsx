"use client";

import Link from "next/link";
import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { FiPhone, FiMail } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

import { Container, Text } from "@/components";
import useCategories from "@/hooks/useCategories";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const SUPPORT_LINKS = [
  { label: "My Orders", href: "/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
  { label: "Shipping Policy", href: "/contact" },
  { label: "Return Policy", href: "/contact" },
];

export default function Footer() {
  const { categories } = useCategories();

  return (
    <footer className="mt-10 bg-[#1B5E20] text-white">
      <Container>
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:py-5">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="mb-2 flex items-center gap-3">
              <Image
                src="/arshi-logo.svg"
                alt="Arshi Naturals"
                width={160}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>

            <Text variant="body" className="mb-1 text-white/80 leading-5">
              Pure. Authentic. Homemade with Love.
            </Text>

            <Text variant="body" className="mb-2 text-white/70 leading-5">
              Premium homemade pickles, snacks, sweets and natural foods
              crafted with traditional recipes and delivered fresh to your
              doorstep.
            </Text>

            <div className="flex gap-3">
              <SocialIcon href="https://facebook.com">
                <FaFacebookF size={18} />
              </SocialIcon>
              <SocialIcon href="https://instagram.com">
                <FaInstagram size={18} />
              </SocialIcon>
              <SocialIcon href="https://youtube.com">
                <FaYoutube size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Text as="h4" variant="h5" className="mb-1.5 text-white">
              Quick Links
            </Text>
            <ul className="space-y-1">
              {QUICK_LINKS.map((item) => (
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
              {SUPPORT_LINKS.map((item) => (
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
                  <Text variant="body" className="text-white/70 leading-5">
                    +91 9885161899
                  </Text>
                  <Text variant="body" className="text-white/70 leading-5">
                    +91 9849845670
                  </Text>
                </div>
              </div>
              <div className="flex gap-3">
                <FiMail size={18} className="mt-1 text-[#D4AF37]" />
                <Text variant="body" className="text-white/70">
                  info@arshinaturals.com
                </Text>
              </div>
              <div className="flex gap-3">
                <IoLocationOutline size={20} className="mt-1 text-[#D4AF37]" />
                <Text variant="body" className="text-white/70 leading-5">
                  Guntur, Andhra Pradesh 522001, India
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
              href="https://www.ameyait.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 transition hover:text-[#D4AF37]"
            >
              Orange Quantum Hub
            </a>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-2 py-3 md:flex-row">
            <Text variant="bodySmall" className="text-white/60">
              © 2026 Arshi Naturals. All rights reserved.
            </Text>
            <div className="flex gap-4 text-xs text-white/50">
              <span>Razorpay</span>
              <span>UPI</span>
              <span>PhonePe</span>
              <span>COD</span>
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
