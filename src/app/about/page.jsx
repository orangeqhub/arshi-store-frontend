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

const stats = [
  { value: "15+", label: "Years of Tradition" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "50+", label: "Homemade Products" },
  { value: "100%", label: "Natural Ingredients" },
];

const features = [
  {
    icon: Leaf,
    title: "100% Natural Ingredients",
    desc: "Fresh, natural ingredients with no artificial preservatives or colors",
  },
  {
    icon: BadgeCheck,
    title: "Traditional Recipes",
    desc: "Time-honored family recipes passed down through generations",
  },
  {
    icon: Zap,
    title: "Freshly Prepared",
    desc: "Small-batch preparation for maximum freshness and authentic taste",
  },
];

const locations = [
  "Guntur",
  "Vijayawada",
  "Hyderabad",
  "Bangalore",
  "Chennai",
];

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80";

export default function AboutPage() {
  const router = useRouter();

  const handlePrimaryCall = () => {
    window.location.href = "tel:+919885161899";
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
            About Arshi Naturals
          </Text>
          <Text className="mt-3 text-white/90">
            Pure. Authentic. Homemade with Love.
          </Text>
          <Button
            variant="success"
            className="mt-6 bg-[#D4AF37] text-[#1B5E20] hover:opacity-90"
            onClick={() => router.push("/products")}
          >
            Explore Our Products →
          </Button>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative h-[320px] overflow-hidden rounded-3xl md:h-[400px] premium-shadow-lg">
              <Image
                src={ABOUT_IMAGE}
                alt="Homemade pickles and traditional foods"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div>
              <Text
                variant="h3"
                className="text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
              >
                Our Story
              </Text>

              <Text className="mt-5">
                Arshi Naturals was born from a passion for preserving the
                authentic flavors of traditional Indian homemade foods. What
                started as a family kitchen sharing pickles and snacks with
                neighbors has grown into a beloved brand serving food lovers
                across India.
              </Text>

              <Text className="mt-4">
                Every jar of pickle, every batch of murukulu, and every sweet
                laddu is crafted with the same love and care that our grandmothers
                put into their cooking. We believe that food is not just
                nourishment — it is memory, tradition, and love.
              </Text>

              <Text className="mt-4">
                From our kitchen in Guntur, Andhra Pradesh, we bring you the
                finest homemade pickles, snacks, sweets, powders and natural
                products — all made with 100% natural ingredients and no
                artificial preservatives.
              </Text>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#4CAF50]" />
                  <button
                    onClick={handlePrimaryCall}
                    className="text-left text-gray-700 hover:text-[#1B5E20]"
                  >
                    +91 9885161899
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#4CAF50]" />
                  <a
                    href="mailto:info@arshinaturals.com"
                    className="text-gray-700 hover:text-[#1B5E20]"
                  >
                    info@arshinaturals.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-[#4CAF50]" />
                  <span className="text-gray-700 leading-6">
                    Guntur, Andhra Pradesh 522001, India
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
            Why Choose Us
          </Text>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-white p-6 text-center premium-shadow"
              >
                <item.icon
                  size={38}
                  className="mx-auto text-[#4CAF50]"
                />
                <Text variant="h6" className="mt-4 text-[#1a2e1a]">
                  {item.title}
                </Text>
                <Text variant="bodySmall" className="mt-2">
                  {item.desc}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <Text
            variant="h4"
            className="mb-8 text-center text-[#1a2e1a]"
          >
            Delivering Across India
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
