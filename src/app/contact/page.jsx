"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container, Text } from "@/components";
import { getContactPageData } from "@/services/cms.service";
import useCmsSiteContent from "@/hooks/useCmsSiteContent";

const DEFAULT_CONTENT = {
  title: "Get in Touch",
  description:
    "We'd love to hear from you. We typically respond within 2 hours during business hours.",
  form_title: "Send Us a Message",
  subjects: ["General Enquiry", "Product Enquiry", "Bulk Order", "Order Support"],
  phones: ["+91 9885161899", "+91 9849845670"],
  email: "info@arshinaturals.com",
  address: "Guntur, Andhra Pradesh 522001, India",
  map_embed_url:
    "https://maps.google.com/maps?q=Guntur%20Andhra%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

export default function ContactPage() {
  const { data } = useCmsSiteContent(getContactPageData);
  const content = { ...DEFAULT_CONTENT, ...(data || {}) };
  const phones = content.phones?.length ? content.phones : DEFAULT_CONTENT.phones;
  const subjects = content.subjects?.length ? content.subjects : DEFAULT_CONTENT.subjects;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: subjects[0] || "General Enquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    alert("Message Sent Successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: subjects[0] || "General Enquiry",
      message: "",
    });
  };

  return (
    <section className="py-12 md:py-14">
      <Container>
        <div className="mb-10 text-center">
          <Text
            variant="h2"
            className="mb-2 text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            {content.title}
          </Text>
          <Text variant="bodySmall" className="text-paragraph">
            {content.description}
          </Text>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 premium-shadow">
            <Text variant="h5" className="mb-5 text-[#1a2e1a]">
              {content.form_title || "Send Us a Message"}
            </Text>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    suppressHydrationWarning
                    className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    suppressHydrationWarning
                    className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  suppressHydrationWarning
                  className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  suppressHydrationWarning
                  className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[#4CAF50]"
                >
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Message *
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-4 outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                suppressHydrationWarning
                className="h-11 w-full rounded-lg bg-[#1B5E20] font-medium text-white transition hover:bg-[#2E7D32]"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border bg-white p-5 premium-shadow">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
                  <Phone size={18} className="text-[#1B5E20]" />
                </div>
                <div>
                  <Text variant="h6" className="mb-1 text-[#1a2e1a]">
                    Call Us
                  </Text>
                  {phones.map((phone) => (
                    <button
                      key={phone}
                      onClick={() =>
                        (window.location.href = `tel:${phone.replace(/\s/g, "")}`)
                      }
                      suppressHydrationWarning
                      className="block text-left text-sm text-gray-600 hover:text-[#1B5E20]"
                    >
                      {phone}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 premium-shadow">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
                  <Mail size={18} className="text-[#1B5E20]" />
                </div>
                <div>
                  <Text variant="h6" className="mb-1 text-[#1a2e1a]">
                    Email
                  </Text>
                  <a
                    href={`mailto:${content.email || DEFAULT_CONTENT.email}`}
                    className="text-sm text-gray-600 hover:text-[#1B5E20]"
                  >
                    {content.email || DEFAULT_CONTENT.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 premium-shadow">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
                  <MapPin size={18} className="text-[#1B5E20]" />
                </div>
                <div>
                  <Text variant="h6" className="mb-1 text-[#1a2e1a]">
                    Visit Us
                  </Text>
                  <span className="text-sm text-gray-600 leading-6">
                    {content.address || DEFAULT_CONTENT.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-white premium-shadow">
              <iframe
                title="Arshi Naturals Location"
                src={content.map_embed_url || DEFAULT_CONTENT.map_embed_url}
                width="100%"
                height="320"
                loading="lazy"
                className="border-0"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
