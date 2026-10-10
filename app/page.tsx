import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { HowToBuy } from "@/components/sections/how-to-buy";
import { Products } from "@/components/sections/products";
import { Shipping } from "@/components/sections/shipping";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhyUs } from "@/components/sections/why-us";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone.e164,
  image: new URL(images.hero.src, siteConfig.url).toString(),
  areaServed: { "@type": "Country", name: "México" },
  sameAs: [siteConfig.social.tiktok.href, siteConfig.social.instagram.href],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="contenido" className="flex-1">
        <Hero />
        <TrustBar />
        <Products />
        <Gallery />
        <WhyUs />
        <HowToBuy />
        <Shipping />
        <Testimonials />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
