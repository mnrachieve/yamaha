"use client";

import { FormEvent, useEffect, useState } from "react";
import { yamahaCatalogue } from "./yamaha-catalogue";
import { siteName, siteUrl } from "./site";

const whatsappMessage = "Hi Mahalakshmi Motorrad, I'm interested in a Yamaha motorcycle. I'd like to know more about the available models and pricing.";
const whatsappUrl = `https://wa.me/919160926242?text=${encodeURIComponent(whatsappMessage)}`;
const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutomotiveBusiness",
      "@id": `${siteUrl}/#dealer`,
      name: siteName,
      url: siteUrl,
      description: "Yamaha Authorised Dealership in Visakhapatnam",
      telephone: "+919160926242",
      image: `${siteUrl}/r15-hero-white-v2.png`,
      priceRange: "₹₹",
      address: { "@type": "PostalAddress", streetAddress: "1st Floor, Legend Commercial, Beside Ayyappa Temple Street, Sheela Nagar, Gajuwaka", addressLocality: "Visakhapatnam", addressRegion: "Andhra Pradesh", postalCode: "530012", addressCountry: "IN" },
      areaServed: { "@type": "City", name: "Visakhapatnam" },
      brand: { "@type": "Brand", name: "Yamaha" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Yamaha model range",
        itemListElement: yamahaCatalogue.map((product) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: `Yamaha ${product.model}`,
            category: product.category,
            brand: { "@type": "Brand", name: "Yamaha" },
            additionalProperty: [
              { "@type": "PropertyValue", name: "Series", value: product.series },
              { "@type": "PropertyValue", name: "Engine capacity", value: product.engineCc ? `${product.engineCc} cc` : "To be confirmed" },
              { "@type": "PropertyValue", name: "Fuel type", value: product.fuelType },
            ],
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      publisher: { "@id": `${siteUrl}/#dealer` },
      inLanguage: "en-IN",
    },
  ],
};

type ModelVariant = { name: string; image: string };
type YamahaModel = { name: string; family: string; line: string; image: string; variants: ModelVariant[]; category?: string; engineCc?: number; fuelType?: string; productUrl?: string };

type StoreProduct = { title: string; options: { name: string }[]; images: { src: string }[]; variants: { title: string; option1?: string; option2?: string; option3?: string; featured_image?: { src: string } | null }[] };
const toImageUrl = (src: string) => src.startsWith("//") ? `https:${src}` : src;
const productFamily = (name: string) => /aerox e|ec-06/i.test(name) ? "ELECTRIC" : /aerox|fascino|rayzr/i.test(name) ? "SCOOTERS" : /r2|r15/i.test(name) ? "SPORTS" : "STREET";
const productLine = (family: string) => family === "SPORTS" ? "BORN FOR THE TRACK" : family === "SCOOTERS" ? "MOVE YOUR WAY" : family === "ELECTRIC" ? "THE ELECTRIC FUTURE" : "EVERYDAY EXCITEMENT";
const showroomName = (name: string) => ({
  "R2": "YZF-R2",
  "FZ-Rave": "FZ Rave",
  "New Fascino 125 FI": "New Fascino 125 FI Hybrid",
  "Aerox E": "EV- Aerox E",
  "EC-06": "EV- EC06",
  "RayZR Street Rally 125 Fi Hybrid": "Ray ZR 125 FI SR Hybrid",
  "RAYZR 125 FI Hybrid": "RAYZR 125 FI",
  "FZ-S FI STD": "FZ-S FI",
  "R15 V4": "R15V4",
  "MT-15 Ver 2.0": "MT-15 Ver2.0",
  "Aerox-155": "Aerox 155",
}[name] || name);
const normaliseProduct = (product: StoreProduct): YamahaModel => {
  const colorIndex = product.options.findIndex((option) => option.name.toLowerCase() === "color");
  const variants = product.variants.map((variant, index) => {
    const optionValues = [variant.option1, variant.option2, variant.option3];
    const name = colorIndex >= 0 ? optionValues[colorIndex] : variant.title;
    const image = variant.featured_image?.src || product.images[index]?.src || product.images[0]?.src;
    return { name: name || variant.title, image: toImageUrl(image) };
  });
  const family = productFamily(product.title);
  return { name: showroomName(product.title), family, line: productLine(family), image: variants[0].image, variants };
};
const fallbackImage = (category: string) => /electric|scooter/i.test(category) ? "/aerox-155-blue-v1.png" : "/r15-hero-compact-v3.png";
const catalogueModels: YamahaModel[] = yamahaCatalogue.map((product) => {
  const family = /electric/i.test(product.category) ? "ELECTRIC" : /scooter/i.test(product.category) ? "SCOOTERS" : /sports/i.test(product.category) ? "SPORTS" : "STREET";
  const image = fallbackImage(product.category);
  return { name: showroomName(product.model), family, line: product.series, image, variants: (product.colors.length ? product.colors : ["Available colours on request"]).map((name) => ({ name, image })), category: product.category, engineCc: product.engineCc, fuelType: product.fuelType, productUrl: product.productUrl };
});
const suppliedOnlyModels: YamahaModel[] = [
  { name: "Fascino 125 FI Hybrid", family: "SCOOTERS", line: "MOVE YOUR WAY", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/dark_matte_blue_disc.webp?v=1786981298", variants: [{ name: "Yellow Cocktail", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/dark_matte_blue_disc.webp?v=1786981298" }, { name: "Metallic Black", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/dark_matte_blue_disc.webp?v=1786981298" }, { name: "Cool Blue Metallic", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/dark_matte_blue_disc.webp?v=1786981298" }, { name: "Dark Matte Blue", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/dark_matte_blue_disc.webp?v=1786981298" }, { name: "Metallic Light Green", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/light_green_disc.webp?v=1786981264" }, { name: "Matte Black", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/matte_blacl_spl.webp?v=1786981341" }, { name: "Matte Black - SPL", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/matte_blacl_spl.webp?v=1786981341" }, { name: "Metallic Orangish Gray - SPL", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/dark_matte_blue_disc.webp?v=1786981298" }] },
  { name: "FZ-S FI Ver 3.0", family: "STREET", line: "EVERYDAY EXCITEMENT", image: "https://www.yamaha-motor-india.com/theme/v4/images/webp_images/home/gallery_carousel/fz-fi.webp", variants: [{ name: "Colours on request", image: "https://www.yamaha-motor-india.com/theme/v4/images/webp_images/home/gallery_carousel/fz-fi.webp" }] },
];
const suppliedModelOrder = catalogueModels.map((model) => model.name);
const r2Variants = [
  { name: "Racing Blue", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/racing-blue_f844ff6c-5433-4f50-9d45-bd517cb50ca8.webp?v=1787736975", color: "#1266d7" },
  { name: "Dark Bluish Gray", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/Dark-Bluish-Gray.webp?v=1787736975", color: "#3e444c" },
  { name: "Metallic Black", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/metallic-black.webp?v=1787736975", color: "#101010" },
  { name: "Matte White Pearl", image: "https://shop.yamaha-motor-india.com/cdn/shop/files/white.webp?v=1787736975", color: "#e6e6e4" },
];

type Modal = "ride" | "price" | "model" | null;
function Arrow() { return <span aria-hidden="true">→</span>; }
function colourTone(name: string) {
  const colour = name.toLowerCase();
  if (/black|dark knight/.test(colour)) return "#202124";
  if (/blue/.test(colour)) return "#1a66ad";
  if (/cyan/.test(colour)) return "#28aebd";
  if (/red|vermillion/.test(colour)) return "#c9342b";
  if (/green/.test(colour)) return "#679b4d";
  if (/yellow/.test(colour)) return "#e8bc26";
  if (/white|pearl|ice storm/.test(colour)) return "#e5e8e8";
  if (/grey|gray|titan|silver/.test(colour)) return "#788087";
  if (/violet/.test(colour)) return "#6f4d91";
  return "#9ca2a5";
}
function ModelCard({ model, onOpen, onRide }: { model: YamahaModel; onOpen: () => void; onRide: () => void }) {
  const colours = Array.from(new Map(model.variants.map((variant) => [variant.name, variant])).values());
  return <article className="model-card reveal"><button className="model-photo" onClick={onOpen} aria-label={`View ${model.name} details`}><img src={model.image} alt={model.name} /><span className="model-photo-label">EXPLORE MODEL</span></button><div className="model-card-content"><p>{model.family}</p><h3>{model.name}</h3><span className="model-series">{model.line}</span><div className="model-specs"><span>{model.engineCc ? `${model.engineCc} CC` : "NEW MODEL"}</span><span>{model.fuelType || "PETROL"}</span></div><div className="model-colour-summary" aria-label={`${model.name} available colours`}><span>COLOURS</span><div>{colours.slice(0, 6).map((variant) => <i key={variant.name} style={{ background: colourTone(variant.name) }} title={variant.name} />)}{colours.length > 6 && <b>+{colours.length - 6}</b>}</div></div><div className="model-card-actions"><button onClick={onOpen}>VIEW DETAILS <Arrow /></button><button onClick={onRide} aria-label={`Book a test ride for ${model.name}`}>+</button></div></div></article>;
}

export default function Home() {
  const [modal, setModal] = useState<Modal>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [catalogModels, setCatalogModels] = useState(catalogueModels);
  const [activeModel, setActiveModel] = useState<YamahaModel>(catalogueModels[0]);
  const [activeVariant, setActiveVariant] = useState<ModelVariant>(catalogueModels[0].variants[0]);
  const [r2Index, setR2Index] = useState(0);
  useEffect(() => { document.body.style.overflow = modal || menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [modal, menuOpen]);
  useEffect(() => { const updateHeader = () => setScrolled(window.scrollY > 32); updateHeader(); window.addEventListener("scroll", updateHeader, { passive: true }); return () => window.removeEventListener("scroll", updateHeader); }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const posterTimer = window.setInterval(() => setR2Index((current) => (current + 1) % r2Variants.length), 4200);
    return () => window.clearInterval(posterTimer);
  }, []);
  useEffect(() => {
    fetch("/api/yamaha-models")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((catalog: { products: StoreProduct[] }) => {
        const officialModels = catalog.products.map(normaliseProduct).map((model) => ({ ...catalogueModels.find((catalogueModel) => catalogueModel.name === model.name), ...model }));
        const fallbackModels = suppliedOnlyModels.map((model) => ({ ...catalogueModels.find((catalogueModel) => catalogueModel.name === model.name), ...model }));
        const modelsByName = new Map([...catalogueModels, ...fallbackModels, ...officialModels].map((model) => [model.name, model]));
        setCatalogModels(suppliedModelOrder.map((name) => modelsByName.get(name)).filter((model): model is YamahaModel => Boolean(model)));
      })
      .catch(() => undefined);
  }, []);
  const openModal = (kind: Modal) => { setSubmitted(false); setMenuOpen(false); setModal(kind); };
  const openModel = (model: YamahaModel) => { setActiveModel(model); setActiveVariant(model.variants[0]); openModal("model"); };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
    <header className={scrolled ? "header header-scrolled" : "header"}>
      <a className="wordmark" href="#top" aria-label="Mahalakshmi Motorrad home"><img className="wordmark-dealer" src="/mahalakshmi-logo.jpeg" alt="Mahalakshmi Motorrad" /><span className="wordmark-transient" aria-hidden="true"><span className="wordmark-rule" /><img className="wordmark-group" src="/mahalakshmi-group.png" alt="" /><span className="wordmark-rule" /><img className="wordmark-yamaha" src="/yamaha.png" alt="" /></span></a>
      <nav className={menuOpen ? "primary-nav open" : "primary-nav"} aria-label="Primary navigation">
        <a href="#models" onClick={() => setMenuOpen(false)}>MOTORCYCLES</a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT US</a><a href="#service" onClick={() => setMenuOpen(false)}>SERVICE</a><a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
        <button className="mobile-nav-cta" onClick={() => openModal("ride")}>BOOK TEST RIDE <Arrow /></button>
      </nav>
      <button className="header-cta" onClick={() => openModal("ride")}>BOOK TEST RIDE <Arrow /></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><i /><i /></button>
    </header>
    <section className="hero" id="top"><div className="hero-image" /><div className="hero-shade" /><div className="hero-grid" aria-hidden="true" /><div className="hero-content wrap"><div className="welcome-mark animate-one"><span>01</span><p>WELCOME TO MAHALAKSHMI MOTORRAD</p></div><p className="eyebrow animate-one">YAMAHA AUTHORISED DEALERSHIP</p><p className="hero-copy animate-three">Performance, technology and design—experienced at your authorised Yamaha destination in Visakhapatnam.</p><div className="hero-actions animate-four"><button className="button button-blue" onClick={() => openModal("ride")}>BOOK A TEST RIDE <Arrow /></button><a className="text-link" href="#r2">EXPLORE R2 <Arrow /></a></div><div className="hero-bottom"><span className="hero-location">MAHALAKSHMI GROUP <b>•</b> VISAKHAPATNAM</span><a href="#r2" className="scroll-cue" aria-label="Scroll to explore"><i /> SCROLL TO EXPLORE</a></div></div></section>
    <section className="r2-console" id="r2"><div className="wrap r2-console-grid"><div className="r2-console-copy"><p className="eyebrow blue">YAMAHA SUPERSPORT</p><p className="r2-kicker">YZF-R2</p><h2>RACE TO THE<br /><em>NEXT LEVEL.</em></h2><p>Explore the R2 visual experience in the official Yamaha colour range. Speak with Mahalakshmi Motorrad for current availability, specifications and pricing.</p><div className="r2-actions"><button className="button button-blue" onClick={() => { const variant = r2Variants[r2Index]; setActiveModel({ name: "R2", family: "SPORTS", line: "RACE TO THE NEXT LEVEL", image: variant.image, variants: [{ name: variant.name, image: variant.image }] }); setActiveVariant({ name: variant.name, image: variant.image }); openModal("ride"); }}>BOOK A TEST RIDE <Arrow /></button><a className="text-link dark" href="https://shop.yamaha-motor-india.com/products/r2" target="_blank" rel="noreferrer">OFFICIAL R2 PAGE <Arrow /></a></div></div><div className="r2-stage"><span className="r2-watermark" aria-hidden="true">R2</span><img key={r2Variants[r2Index].name} src={r2Variants[r2Index].image} alt={`Yamaha R2 in ${r2Variants[r2Index].name}`} /><div className="r2-console-controls"><button onClick={() => setR2Index((r2Index - 1 + r2Variants.length) % r2Variants.length)} aria-label="Previous R2 colour">←</button><div>{r2Variants.map((variant, index) => <button className={index === r2Index ? "active" : ""} key={variant.name} onClick={() => setR2Index(index)} aria-label={`Show R2 in ${variant.name}`}><i style={{ background: variant.color }} /><span>{variant.name}</span></button>)}</div><button onClick={() => setR2Index((r2Index + 1) % r2Variants.length)} aria-label="Next R2 colour">→</button></div></div></div></section>
    <section className="action-bar" aria-label="Quick actions"><div className="wrap action-grid">
      <button onClick={() => openModal("ride")}><b>01</b><span><strong>BOOK TEST RIDE</strong><small>Experience your Yamaha before you decide.</small></span><Arrow /></button><button onClick={() => openModal("price")}><b>02</b><span><strong>GET ON-ROAD PRICE</strong><small>Get pricing and purchase assistance.</small></span><Arrow /></button><a href="#service"><b>03</b><span><strong>BOOK SERVICE</strong><small>Keep your Yamaha performing at its best.</small></span><Arrow /></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><b>04</b><span><strong>WHATSAPP US</strong><small>Talk to our team instantly.</small></span><Arrow /></a>
    </div></section>
    <section className="featured"><div className="wrap featured-grid"><div className="featured-copy"><p className="eyebrow blue">FEATURED YAMAHA</p><h2>BUILT TO<br /><em>TURN HEADS.</em></h2><div className="featured-model"><small>YAMAHA R15</small><h3>R15 V4</h3><p>Inspired by Yamaha&apos;s supersport DNA. Explore the latest official model information with our showroom team.</p></div><div className="model-actions"><a href="#models" className="text-link dark">VIEW DETAILS <Arrow /></a><button className="text-link dark" onClick={() => openModal("ride")}>BOOK TEST RIDE <Arrow /></button></div></div><div className="featured-image"><img src="/r15-hero-white-v2.png" alt="Yamaha R15 motorcycle" /></div></div></section>
    <section className="range wrap" id="models"><div className="range-header"><div><p className="eyebrow blue">THE RANGE</p><h2>FIND YOUR<br /><em>YAMAHA.</em></h2></div><div className="range-summary"><strong>{yamahaCatalogue.length}</strong><p>Yamaha products, curated in one place. Compare engine size, power source and available colours before you ride.</p></div></div><div className="model-categories">{["SPORTS", "STREET", "SCOOTERS", "ELECTRIC"].map((category) => { const categoryModels = catalogModels.filter((model) => model.family === category); return categoryModels.length ? <section className="model-category" key={category}><div className="model-category-heading"><p>{category}</p><span>{categoryModels.length} MODELS</span></div><div className="model-grid">{categoryModels.map((model) => <ModelCard key={model.name} model={model} onOpen={() => openModel(model)} onRide={() => { setActiveModel(model); setActiveVariant(model.variants[0]); openModal("ride"); }} />)}</div></section> : null; })}</div><p className="price-note">Models, colours and availability are sourced from the supplied Yamaha India catalogue and may change. Please confirm stock with the showroom team.</p></section>
    <section className="about" id="about"><div className="about-photo" /><div className="about-copy"><p className="eyebrow blue">ABOUT MAHALAKSHMI MOTORRAD</p><h2>MORE THAN<br />A <em>DEALERSHIP.</em></h2><p>Mahalakshmi Motorrad is an authorised Yamaha dealership backed by the Mahalakshmi Group. We bring together Yamaha&apos;s engineering excellence and a customer-first approach, built around trust, transparency and quality.</p><a href="#contact" className="text-link dark">OUR STORY <Arrow /></a></div></section>
    <section className="group"><div className="wrap"><div className="group-intro-grid"><div><p className="eyebrow">THE MAHALAKSHMI GROUP</p><h2>BUILT ON TRUST.<br /><em>DRIVEN BY EXCELLENCE.</em></h2><p className="group-intro">Mahalakshmi Motorrad brings Yamaha&apos;s performance and a professional dealership experience closer to every rider in Visakhapatnam.</p></div><aside className="group-identity"><img src="/mahalakshmi-group.png" alt="Mahalakshmi Group emblem" /><div><strong>MAHALAKSHMI GROUP</strong><span>OUR GROUP. OUR FOUNDATION.</span></div></aside></div><div className="stats"><div><strong>YAMAHA</strong><span>Authorised Dealership</span></div><div><strong>COMPLETE RANGE</strong><span>Motorcycles &amp; Scooters</span></div><div><strong>CUSTOMER FIRST</strong><span>Always</span></div></div></div></section>
    <section className="ride-banner"><div><p className="eyebrow">EXPERIENCE YAMAHA</p><h2>DON&apos;T JUST<br />LOOK AT IT.<br /><em>RIDE IT.</em></h2><p>Experience your favourite Yamaha for yourself.</p><button className="button button-blue" onClick={() => openModal("ride")}>BOOK A TEST RIDE <Arrow /></button><a href="tel:9160926242">9160926242</a></div></section>
    <section className="service wrap" id="service"><div className="service-heading"><p className="eyebrow blue">YAMAHA OWNERSHIP</p><h2>WE&apos;VE GOT<br /><em>YOUR BACK.</em></h2></div><div className="service-list"><article><b>01</b><h3>PERIODIC SERVICE</h3><p>Keep your Yamaha performing at its best.</p></article><article><b>02</b><h3>GENUINE PARTS</h3><p>Professional care with genuine Yamaha parts.</p></article><article><b>03</b><h3>EXPERT SUPPORT</h3><p>Support throughout your ownership journey.</p></article><button className="button button-dark" onClick={() => openModal("ride")}>BOOK SERVICE <Arrow /></button></div></section>
    <section className="finance"><div className="finance-image"><img src="/aerox-155-blue-v1.png" alt="Yamaha Aerox scooter" /></div><div className="finance-copy"><p className="eyebrow blue">FINANCE &amp; PRICING</p><h2>MAKE YOUR YAMAHA<br /><em>EASIER TO OWN.</em></h2><p>Get assistance with available finance options, on-road pricing and the purchase process.</p><div><button className="button button-dark" onClick={() => openModal("price")}>GET ON-ROAD PRICE <Arrow /></button><a className="text-link dark" href={whatsappUrl} target="_blank" rel="noreferrer">TALK TO AN EXPERT <Arrow /></a></div></div></section>
    <section className="reviews"><div className="wrap reviews-grid"><div><p className="eyebrow blue">RIDERS TRUST US</p><h2>YOUR RIDE.<br /><em>YOUR WORD.</em></h2><p>Customer feedback is shared only from verified Google reviews. Connect with the showroom team to discover the Mahalakshmi Motorrad experience.</p><a className="text-link dark" href="https://www.google.com/maps/search/?api=1&query=Mahalakshmi+Motorrad+Sheela+Nagar+Gajuwaka" target="_blank" rel="noreferrer">VIEW GOOGLE LISTING <Arrow /></a></div><div className="review-commitment"><span aria-hidden="true">★★★★★</span><h3>REAL RIDER REVIEWS</h3><p>We do not publish anonymous or unverified testimonials. Visit our Google listing for current customer feedback.</p><small>GOOGLE REVIEW DATA UPDATES LIVE</small></div></div></section>
    <section className="moments wrap"><div className="moments-heading"><p className="eyebrow blue">SHOWROOM MOMENTS</p><h2>YOUR YAMAHA.<br /><em>YOUR MOMENT.</em></h2><p>Follow the latest showroom deliveries, rider events and Yamaha experiences from Mahalakshmi Motorrad.</p></div><div className="moment-grid"><img src="/r15-hero-compact-v3.png" alt="Yamaha R15 in motion" /><img src="/aerox-155-blue-v1.png" alt="Yamaha Aerox scooter" /><img src="/r15-hero-white-v2.png" alt="Yamaha R15 detail" /></div><a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer">ASK ABOUT OUR LATEST EVENTS <Arrow /></a></section>
    <section className="contact" id="contact"><div className="wrap contact-grid"><div><p className="eyebrow blue">VISIT THE SHOWROOM</p><h2>COME RIDE<br /><em>WITH US.</em></h2><div className="contact-details"><address><strong>MAHALAKSHMI MOTORRAD</strong><span>Yamaha Authorised Dealership</span><br />1st Floor, Legend Commercial,<br />Beside Ayyappa Temple Street,<br />Sheela Nagar, Gajuwaka,<br />Visakhapatnam, Andhra Pradesh – 530012</address><div><small>SALES &amp; WHATSAPP</small><a href="tel:9160926242">+91 91609 26242</a></div><div><small>SHOWROOM LOCATION</small><span>Sheela Nagar, Gajuwaka, Visakhapatnam</span></div></div><div className="contact-links"><a href="https://www.google.com/maps/dir/?api=1&destination=Sheela+Nagar+Gajuwaka+Visakhapatnam" target="_blank" rel="noreferrer">GET DIRECTIONS <Arrow /></a><a href="tel:9160926242">CALL NOW <Arrow /></a><a href={whatsappUrl} target="_blank" rel="noreferrer">WHATSAPP <Arrow /></a></div></div><iframe title="Mahalakshmi Motorrad location" src="https://www.google.com/maps?q=Sheela%20Nagar%20Gajuwaka%20Visakhapatnam&output=embed" loading="lazy" /></div></section>
    <section className="final-cta"><div className="wrap"><p className="eyebrow">MAHALAKSHMI MOTORRAD</p><h2>YOUR NEXT RIDE<br /><em>STARTS HERE.</em></h2><p>Discover Yamaha. Experience the difference. Ride with Mahalakshmi Motorrad.</p><div><a className="button button-light" href="#models">EXPLORE YAMAHA <Arrow /></a><button className="button button-blue" onClick={() => openModal("ride")}>BOOK TEST RIDE <Arrow /></button></div></div></section>
    <footer><div className="wrap footer-grid"><div><strong className="footer-brand">MAHALAKSHMI<br />MOTORRAD</strong><p>Yamaha Authorised Dealership<br />Mahalakshmi Group</p></div><div><b>EXPLORE</b><a href="#models">Motorcycles</a><a href="#about">About Us</a><button onClick={() => openModal("ride")}>Test Ride</button><a href="#service">Service</a></div><div><b>CONTACT</b><a href="tel:9160926242">9160926242</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a></div><div><b>SHOWROOM</b><p>1st Floor, Legend Commercial<br />Beside Ayyappa Temple Street<br />Sheela Nagar, Gajuwaka<br />Andhra Pradesh – 530012</p></div></div><div className="wrap footer-bottom"><span>© 2026 Mahalakshmi Motorrad</span><span>Instagram &nbsp; Facebook &nbsp; YouTube</span></div></footer>
    <a className="desktop-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Mahalakshmi Motorrad">◔<span>Chat with Mahalakshmi Motorrad</span></a><div className="mobile-actions"><a href="tel:9160926242">CALL</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WHATSAPP</a><button onClick={() => openModal("ride")}>TEST RIDE</button></div>
    {modal && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className={modal === "model" ? "modal model-modal" : "modal"}><button className="modal-close" onClick={() => setModal(null)} aria-label="Close">×</button>{modal === "model" ? <div className="model-detail"><div className="model-detail-image"><img src={activeVariant.image} alt={`${activeModel.name} in ${activeVariant.name}`} /></div><div className="model-detail-copy"><p className="eyebrow blue">YAMAHA {activeModel.family}</p><h2 id="modal-title">{activeModel.name}</h2><p className="model-tagline">{activeModel.line}</p><p>Choose a colour to view the official Yamaha image. Confirm current stock, specifications and on-road pricing with Mahalakshmi Motorrad.</p><dl><div><dt>CATEGORY</dt><dd>{activeModel.category || activeModel.family}</dd></div><div><dt>ENGINE</dt><dd>{activeModel.engineCc ? `${activeModel.engineCc} cc` : "Specification to be confirmed"}</dd></div><div><dt>FUEL TYPE</dt><dd>{activeModel.fuelType || "Petrol"}</dd></div><div><dt>SERIES</dt><dd>{activeModel.line}</dd></div></dl><div className="colour-picker" aria-label={`${activeModel.name} colours`}><small>AVAILABLE COLOURS</small><div>{activeModel.variants.map((variant) => <button key={`${variant.name}-${variant.image}`} className={activeVariant.image === variant.image ? "active" : ""} onClick={() => setActiveVariant(variant)}>{variant.name}</button>)}</div></div><div className="detail-actions"><button className="button button-blue" onClick={() => { setModal("ride"); setSubmitted(false); }}>BOOK TEST RIDE <Arrow /></button><button className="button button-dark" onClick={() => { setModal("price"); setSubmitted(false); }}>GET ON-ROAD PRICE <Arrow /></button><a className="text-link dark" href={activeModel.productUrl || `https://wa.me/919160926242?text=${encodeURIComponent(`Hi Mahalakshmi Motorrad, I'm interested in the Yamaha ${activeModel.name} in ${activeVariant.name}. I'd like to know the price and availability.`)}`} target="_blank" rel="noreferrer">OFFICIAL PAGE <Arrow /></a></div></div></div> : submitted ? <div className="success"><p className="eyebrow blue">REQUEST RECEIVED</p><h2>THANK<br />YOU.</h2><p>Our team from Mahalakshmi Motorrad will contact you shortly.</p><button className="button button-dark" onClick={() => setModal(null)}>CLOSE <Arrow /></button></div> : <form onSubmit={submit}><p className="eyebrow blue">MAHALAKSHMI MOTORRAD</p><h2 id="modal-title">{modal === "ride" ? "BOOK YOUR\nTEST RIDE" : "GET YOUR\nON-ROAD PRICE"}</h2><label>Name*<input required name="name" autoComplete="name" /></label><label>Mobile number*<input required name="phone" inputMode="numeric" pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" /></label><label>Select Yamaha model*<select required name="model" defaultValue={activeModel.name}><option value="" disabled>Choose a model</option>{catalogModels.map((model) => <option key={model.name}>{model.name}</option>)}</select></label>{modal === "ride" ? <><div className="form-pair"><label>Preferred date<input type="date" name="date" /></label><label>Preferred time<input type="time" name="time" /></label></div><label>Message (optional)<textarea name="message" rows={2} /></label></> : <><label>Variant (optional)<input name="variant" defaultValue={activeVariant.name} placeholder="Select after confirming availability" /></label><label>Location<input name="location" defaultValue="Visakhapatnam" /></label></>}<button className="button button-blue" type="submit">{modal === "ride" ? "REQUEST TEST RIDE" : "GET MY PRICE"} <Arrow /></button></form>}</div></div>}
  </main>;
}
