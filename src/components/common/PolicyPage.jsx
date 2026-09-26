"use client";

import { Container, Text } from "@/components";
import { getPoliciesData } from "@/services/cms.service";
import useCmsSiteContent from "@/hooks/useCmsSiteContent";

const DEFAULT_TEXT =
  "<h2>Content will be added soon.</h2><p>This page is managed by the admin CMS.</p>";

export default function PolicyPage({ sectionKey, title }) {
  const { data } = useCmsSiteContent(getPoliciesData);
  const content = data || {};
  const html = content[sectionKey] || DEFAULT_TEXT;

  return (
    <section className="py-12 md:py-14">
      <Container>
        <div className="mb-10 text-center">
          <Text
            variant="h2"
            className="mb-2 text-[#1a2e1a] font-[family-name:var(--font-playfair)]"
          >
            {title}
          </Text>
        </div>

        <div
          className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 premium-shadow"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </section>
  );
}
