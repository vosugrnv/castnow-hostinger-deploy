import { HomeView } from "@/components/HomeView";
import { JsonLd } from "@/components/PageKit";
import {
  APP_DOWNLOAD_URL,
  APP_STORE_URL,
  COMPANY,
  HOME_FAQS,
  PLAY_STORE_URL,
  SERVICES,
  SITE_URL,
  STEPS,
  SUPPORT_EMAIL,
  ZALO_URL,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "CastNow",
              legalName: COMPANY,
              url: SITE_URL,
              logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-castnow.png`, width: 512, height: 512 },
              image: `${SITE_URL}/og-castnow.png`,
              email: SUPPORT_EMAIL,
              sameAs: [ZALO_URL, APP_STORE_URL, PLAY_STORE_URL],
              contactPoint: {
                "@type": "ContactPoint",
                email: SUPPORT_EMAIL,
                contactType: "customer support",
                availableLanguage: "Vietnamese",
                areaServed: "VN",
              },
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: "CastNow",
              alternateName: "CastNow Việt Nam",
              url: SITE_URL,
              inLanguage: "vi-VN",
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type": "MobileApplication",
              "@id": `${SITE_URL}/#app`,
              name: "CastNow",
              operatingSystem: "iOS, Android",
              applicationCategory: "LifestyleApplication",
              downloadUrl: APP_DOWNLOAD_URL,
              publisher: { "@id": `${SITE_URL}/#organization` },
              offers: { "@type": "Offer", price: "0", priceCurrency: "VND" },
            },
            {
              "@type": "ItemList",
              "@id": `${SITE_URL}/#dich-vu`,
              name: "Dịch vụ chụp ảnh trên CastNow",
              itemListElement: SERVICES.map((service, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Service",
                  name: service.title,
                  description: service.body,
                  serviceType: service.title,
                  areaServed: { "@type": "Country", name: "Việt Nam" },
                  provider: { "@id": `${SITE_URL}/#organization` },
                  url: `${SITE_URL}/mau-anh-nhiep-anh-gia`,
                },
              })),
            },
            {
              "@type": "HowTo",
              "@id": `${SITE_URL}/#cach-dat-lich`,
              name: "Cách đặt lịch mẫu ảnh trên CastNow",
              step: STEPS.map((step, index) => ({
                "@type": "HowToStep",
                position: index + 1,
                name: step.title,
                text: step.body,
              })),
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#cau-hoi`,
              mainEntity: HOME_FAQS.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        }}
      />
      <HomeView />
    </>
  );
}
