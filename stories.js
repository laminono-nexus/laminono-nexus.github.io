// ═══════════════════════════════════════════════════════
//  LAMINONO NEXUS — STORIES MODULE
//  Each story has built-in SEO metadata for Google ranking
// ═══════════════════════════════════════════════════════

const stories = [
  {
    // ── REQUIRED: Story Content ──
    id: 'echoes-of-tomorrow',
    title: 'The Echoes of Tomorrow',
    genre: 'Drama',
    readTime: '12 min',
    trending: true,
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1920&q=80',
    excerpt: 'In a world where memories can be traded like currency, one archivist discovers a recollection that could unravel the fabric of society. A gripping tale of identity, loss, and the price of perfection.',
    content: `The first paragraph of your story goes here. Write as much as you want.

The second paragraph starts after a blank line. Just hit Enter twice between paragraphs.

Keep adding paragraphs. The modal will render each one properly with drop caps on the first paragraph.`,

    // ── SEO METADATA ──
    seo: {
      metaTitle: 'The Echoes of Tomorrow | Laminono Nexus — Free Short Stories',
      metaDescription: 'Read "The Echoes of Tomorrow" — a gripping drama about memory, identity, and the price of perfection. Free short stories by Olamide Emmanuel Willoughby.',
      metaKeywords: 'short stories, free stories online, drama stories, memory fiction, literary fiction, Olamide Willoughby, Laminono Nexus, read stories free',
      ogTitle: 'The Echoes of Tomorrow — A Story That Stays With You',
      ogDescription: 'In a world where memories are currency, one archivist finds a recollection that could destroy everything. Read free on Laminono Nexus.',
      ogImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80',
      twitterCard: 'summary_large_image',
      canonicalUrl: 'https://laminono-nexus.github.io/?story=echoes-of-tomorrow',
      schemaType: 'ShortStory',
      authorName: 'Olamide Emmanuel Willoughby',
      publishDate: '2026-04-23',
      readingTime: 'PT12M'
    }
  }
];

// ═══════════════════════════════════════════════════════
//  SEO HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════

function updatePageSEO(story) {
  if (!story || !story.seo) return;

  const s = story.seo;

  // Update <title>
  document.title = s.metaTitle;

  // Update or create meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', s.metaDescription);

  // Update or create meta keywords
  let metaKeys = document.querySelector('meta[name="keywords"]');
  if (!metaKeys) {
    metaKeys = document.createElement('meta');
    metaKeys.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeys);
  }
  metaKeys.setAttribute('content', s.metaKeywords);

  // Open Graph tags
  updateMetaTag('og:title', s.ogTitle);
  updateMetaTag('og:description', s.ogDescription);
  updateMetaTag('og:image', s.ogImage);
  updateMetaTag('og:url', s.canonicalUrl);
  updateMetaTag('og:type', 'article');

  // Twitter Card tags
  updateMetaTag('twitter:card', s.twitterCard);
  updateMetaTag('twitter:title', s.ogTitle);
  updateMetaTag('twitter:description', s.ogDescription);
  updateMetaTag('twitter:image', s.ogImage);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', s.canonicalUrl);

  // Structured Data (JSON-LD for Google Rich Snippets)
  let scriptLd = document.getElementById('json-ld-data');
  if (!scriptLd) {
    scriptLd = document.createElement('script');
    scriptLd.id = 'json-ld-data';
    scriptLd.setAttribute('type', 'application/ld+json');
    document.head.appendChild(scriptLd);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": s.schemaType || "ShortStory",
    "headline": story.title,
    "author": {
      "@type": "Person",
      "name": s.authorName
    },
    "datePublished": s.publishDate,
    "publisher": {
      "@type": "Organization",
      "name": "Laminono Nexus",
      "logo": {
        "@type": "ImageObject",
        "url": "https://laminono-nexus.github.io/laminono.jpeg"
      }
    },
    "description": s.metaDescription,
    "image": s.ogImage,
    "url": s.canonicalUrl,
    "timeRequired": s.readingTime,
    "genre": story.genre,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": s.canonicalUrl
    }
  };

  scriptLd.textContent = JSON.stringify(structuredData, null, 2);
}

function updateMetaTag(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function resetToHomeSEO() {
  document.title = 'Laminono Nexus — Premium Storytelling | Free Short Stories Online';

  const defaultDesc = 'Discover premium short stories on Laminono Nexus. Free drama, romance, sci-fi, and literary fiction by Olamide Emmanuel Willoughby. Read now.';
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', defaultDesc);

  const defaultKeys = 'short stories, free stories, read stories online, fiction, drama, romance, sci-fi, Olamide Willoughby, Laminono Nexus';
  let metaKeys = document.querySelector('meta[name="keywords"]');
  if (metaKeys) metaKeys.setAttribute('content', defaultKeys);

  updateMetaTag('og:title', 'Laminono Nexus — Premium Storytelling');
  updateMetaTag('og:description', defaultDesc);
  updateMetaTag('og:image', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80');
  updateMetaTag('og:url', 'https://laminono-nexus.github.io/');
  updateMetaTag('og:type', 'website');
  updateMetaTag('twitter:card', 'summary_large_image');
}

// Export for use in index.html
export { stories, updatePageSEO, resetToHomeSEO };
