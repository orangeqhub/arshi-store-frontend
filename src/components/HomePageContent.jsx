"use client";

import useHomepage from "@/hooks/useHomepage";
import {
  HeroSection,
  CategorySection,
  BestSellingSection,
  FeaturedProductsSection,
  OurProductsSection,
  ComboPacksSection,
  WhyChooseUsSection,
  CustomerReviewsSection,
  InstagramGallerySection,
  BlogSection,
  NewsletterSection,
} from "@/components";

export default function HomePageContent() {
  const { data, loading } = useHomepage();

  if (loading) {
    return (
      <div className="py-24 text-center text-paragraph">
        Loading homepage...
      </div>
    );
  }

  return (
    <>
      <HeroSection
        banners={data?.banners}
        hero={data?.hero}
      />
      <CategorySection categories={data?.categories} />
      <OurProductsSection />
      <BestSellingSection products={data?.bestsellers} />
      <FeaturedProductsSection products={data?.featured_products} />
      <ComboPacksSection products={data?.combo_products} />
      <WhyChooseUsSection features={data?.features} />
      <CustomerReviewsSection reviews={data?.reviews} />
      <InstagramGallerySection
        gallery={data?.gallery}
        instagram={data?.instagram}
      />
      <BlogSection posts={data?.blog_posts} />
      <NewsletterSection content={data?.newsletter} />
    </>
  );
}
