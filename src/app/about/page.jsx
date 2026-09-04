"use client";

import {
  ShieldCheck,
  BadgeCheck,
  Zap,
  MapPin,
  Leaf,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { getAboutPageData } from "@/services/cms.service";
import useCmsSiteContent from "@/hooks/useCmsSiteContent";

const DEFAULT_CONTENT = {
  hero_title: "About Arshi Naturals",
  hero_subtitle: "Pure. Authentic. Homemade with Love.",
  hero_button_text: "Explore Our Products",
  story_title: "Our Story",
  story_paragraphs: [
    "Arshi Naturals was born from a passion for preserving the authentic flavors of traditional Indian homemade foods.",
    "Every jar of pickle, every batch of murukulu, and every sweet laddu is crafted with the same love and care.",
    "From our kitchen in Guntur, Andhra Pradesh, we bring you the finest homemade pickles, snacks, sweets, powders and natural products.",
  ],
  image_url:
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
  stats: [
    { value: "15+", label: "Years of Tradition" },
    { value: "10,000+", label: "Happy Customers" },
    { value: "50+", label: "Homemade Products" },
    { value: "100%", label: "Natural Ingredients" },
  ],
  features_title: "Why Choose Us",
  features: [
    {
      icon_name: "Leaf",
      title: "100% Natural Ingredients",
      description:
        "Fresh, natural ingredients with no artificial preservatives or colors",
    },
    {
      icon_name: "BadgeCheck",
      title: "Traditional Recipes",
      description: "Time-honored family recipes passed down through generations",
    },
    {
      icon_name: "Zap",
      title: "Freshly Prepared",
      description:
        "Small-batch preparation for maximum freshness and authentic taste",
    },
  ],
  delivery_title: "Delivering Across India",
  delivery_locations: ["Guntur", "Vijayawada", "Hyderabad", "Bangalore", "Chennai"],
  phone: "+91 9885161899",
  email: "info@arshinaturals.com",
  address: "Guntur, Andhra Pradesh 522001, India",
};

const ICON_MAP = { Leaf, BadgeCheck, Zap, ShieldCheck };

export default function AboutPage() {
  const router = useRouter();
  const { data } = useCmsSiteContent(getAboutPageData);
  const content = { ...DEFAULT_CONTENT, ...(data || {}) };

  const stats = content.stats || DEFAULT_CONTENT.stats;
  const features = content.features || DEFAULT_CONTENT.features;
  const locations = content.delivery_locations || DEFAULT_CONTENT.delivery_locations;
  const paragraphs = content.story_paragraphs || DEFAULT_CONTENT.story_paragraphs;

  const handlePrimaryCall = () => {
    router.push(`tel:${(content.phone || DEFAULT_CONTENT.phone).replace(/\s/g, "")}`);
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] py-16 text-center">
        <Container>
          <Text
            as="h1"
            variant="h2"
            className="text-white font-[family-name:var(--font-playfair)]"
          >
            {content.hero_title}
          </Text>
          <Text className="mt-3 text-white/90">
            {content.hero_subtitle}
          </Text>
          <Button
            variant="success"
            className="mt-6 bg-[#D4AF37] text-[#1B5E20] hover:opacity-90"
            onClick={() => router.push("/products")}
          >
            {content.hero_button_text} →
          </Button>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative h-[320px] overflow-hidden rounded-3xl md:h-[400px] premium-shadow-lg">
              {content.image_url ? (
                <Image
                  src={content.image_url}
                  alt="Homemade pickles and traditional foods"
                  fill
                  priority
                  className="object-cover"
                  unoptimized={content.image_url.startsWith("http")}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-primary-soft text-[#1B5E20]">
                  <Leaf size={64} />
                </div>
              )}
            </div>

            <div>
              <Text
                variant="h3"
                className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
              >
                {content.story_title || "Our Story"}
              </Text>

              {paragraphs.map((para, i) => (
                <Text key={i} className="mt-4">
                  {para}
                </Text>
              ))}

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#4CAF50]" />
                  <button
                    onClick={handlePrimaryCall}
                    className="text-left text-gray-700 hover:text-[#1B5E20]"
                  >
                    {content.phone || DEFAULT_CONTENT.phone}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#4CAF50]" />
                  <a
                    href={`mailto:${content.email || DEFAULT_CONTENT.email}`}
                    className="text-gray-700 hover:text-[#1B5E20]"
                  >
                    {content.email || DEFAULT_CONTENT.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-[#4CAF50]" />
                  <span className="text-gray-700 leading-6">
                    {content.address || DEFAULT_CONTENT.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y bg-white py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label}>
                <Text variant="h3" className="text-[#1B5E20]">
                  {item.value}
                </Text>
                <Text variant="caption">{item.label}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Text
            variant="h3"
            className="mb-10 text-center text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            {content.features_title || "Why Choose Us"}
          </Text>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((item) => {
              const Icon = ICON_MAP[item.icon_name] || Leaf;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-white p-6 text-center premium-shadow"
                >
                  <Icon size={38} className="mx-auto text-[#4CAF50]" />
                  <Text variant="h6" className="mt-4 text-[#1a2e1a]">
                    {item.title}
                  </Text>
                  <Text variant="bodySmall" className="mt-2">
                    {item.description}
                  </Text>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <Text
            variant="h4"
            className="mb-8 text-center text-[#1a2e1a]"
          >
            {content.delivery_title || "Delivering Across India"}
          </Text>
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((city) => (
              <div
                key={city}
                className="rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-[#1B5E20]"
              >
                {city}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
