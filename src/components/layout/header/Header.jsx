"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import {
  Menu,
  Heart,
  User,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { Container, Text, AuthModal } from "@/components";
import SearchBar from "@/components/common/SearchBar";
import useCartCount from "@/hooks/useCartCountHeader";
import useWishlistCount from "@/hooks/usewishlistcount";
import useCategories from "@/hooks/useCategories";
import { setUser, clearUser } from "@/redux/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const { cartCount } = useCartCount();
  const { wishlistCount } = useWishlistCount();
  const { categories } = useCategories();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const savedUser = Cookies.get("user");
    if (savedUser) dispatch(setUser(JSON.parse(savedUser)));
  }, [dispatch, mounted]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    localStorage.removeItem("user");
    dispatch(clearUser());
    setMobileOpen(false);
    router.push("/");
  };

  const goCategory = (category) => {
    sessionStorage.setItem("selectedCategory", category.id);
    sessionStorage.setItem("selectedCategoryName", category.name);
    setCategoriesOpen(false);
    setMobileOpen(false);
    router.push("/products");
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        isScrolled && "shadow-md"
      )}
    >
      <Container>
        {/* Desktop — single row like mockup */}
        <div className="hidden h-[72px] items-center gap-6 lg:flex">
          <Link href="/" className="shrink-0">
            <Image
              src="/arshi-logo.svg"
              alt="Arshi Naturals"
              width={150}
              height={44}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="flex shrink-0 items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Shop</NavLink>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-1 font-medium text-[#1a2e1a] transition hover:text-[#4CAF50]"
              >
                Categories
                <ChevronDown
                  size={16}
                  className={clsx(
                    "transition-transform",
                    categoriesOpen && "rotate-180"
                  )}
                />
              </button>

              {categoriesOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                  <Link
                    href="/categories"
                    onClick={() => setCategoriesOpen(false)}
                    className="block border-b border-gray-100 px-4 py-2.5 text-sm font-semibold text-[#1B5E20] hover:bg-primary-soft"
                  >
                    All Categories
                  </Link>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => goCategory(cat)}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-primary-soft hover:text-[#1B5E20]"
                    >
                      <span>{cat.icon || "🌿"}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
          </nav>

          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-3">
            <div className="w-full max-w-xs">
              <SearchBar />
            </div>

            <IconButton
              onClick={() => router.push("/wishlist")}
              badge={mounted && wishlistCount > 0 ? wishlistCount : null}
              badgeColor="bg-red-500"
            >
              <Heart size={18} />
            </IconButton>

            <Link href="/cart">
              <IconButton badge={mounted && cartCount > 0 ? cartCount : null}>
                <ShoppingCart size={18} />
              </IconButton>
            </Link>

            {!mounted ? (
              <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" />
            ) : user ? (
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                <User size={16} className="text-[#1B5E20]" />
                <span className="max-w-[80px] truncate text-sm font-medium">
                  {user.full_name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-[#1B5E20]/25 bg-[#E8F5E9] px-4 py-2.5 text-sm font-medium text-[#1B5E20] transition hover:bg-[#C8E6C9]"
              >
                <User size={16} />
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="flex h-14 items-center justify-between gap-2 lg:hidden">
          <Link href="/">
            <Image
              src="/arshi-logo.svg"
              alt="Arshi Naturals"
              width={120}
              height={36}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-1">
            <Link href="/wishlist" className="relative flex h-9 w-9 items-center justify-center">
              <Heart size={18} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center">
              <ShoppingCart size={18} />
              {mounted && cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#1B5E20] text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute right-0 top-0 flex h-full w-80 flex-col gap-3 overflow-y-auto bg-white p-5 shadow-xl">
            <button
              className="self-end text-gray-500"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>

            <SearchBar compact />

            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Shop" },
              { href: "/categories", label: "Categories" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact Us" },
            ].map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <hr />

            {user ? (
              <button onClick={handleLogout} className="text-left text-red-500">
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsAuthOpen(true);
                  setMobileOpen(false);
                }}
                className="text-left font-medium text-[#1B5E20]"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}

function IconButton({ children, onClick, badge, badgeColor = "bg-[#1B5E20]" }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[#1a2e1a] transition hover:bg-[#E8F5E9]"
    >
      {children}
      {badge && (
        <span
          className={`absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold text-white ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </Tag>
  );
}

function NavLink({ href, children, onClick }) {
  return (
    <Link href={href} onClick={onClick}>
      <Text
        as="span"
        variant="body"
        className="font-medium text-[#1a2e1a] transition-colors hover:text-[#4CAF50]"
      >
        {children}
      </Text>
    </Link>
  );
}
