module.exports = async function handler(req, res) {
    const { story } = req.query;

    // Fetch stories.js from your repo
    const raw = await fetch('https://raw.githubusercontent.com/laminono-nexus/laminono-nexus.github.io/main/stories.js')
        .then(r => r.text());

    // Fetch partners.js from your repo
    const rawPartners = await fetch('https://raw.githubusercontent.com/laminono-nexus/laminono-nexus.github.io/main/partners/partners.js')
        .then(r => r.text());

    // Parse stories array
    let stories = [];
    try {
        const match = raw.match(/const stories\s*=\s*(\[[\s\S]*?\]);/);
        if (match) stories = eval(match[1]);
    } catch(e) {}

    // Parse partner stories array
    let partnerStories = [];
    try {
        const match = rawPartners.match(/const partnerStories\s*=\s*(\[[\s\S]*?\])/);
        if (match) partnerStories = eval(match[1]);
    } catch(e) {}

    // Build slug from title
    const toSlug = t => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Find matching story
    let found = stories.find(s => toSlug(s.title) === story);
    let isPartner = false;
    if (!found) {
        found = partnerStories.find(p => toSlug(p.title) === story);
        isPartner = true;
    }

    // Build OG values
    const title    = found ? `${found.title} | Laminono Nexus` : 'Laminono Nexus - Premium Storytelling';
    const desc     = found ? (isPartner ? found.fullDescription?.substring(0, 160) + '…' : found.excerpt?.substring(0, 160) + '…') : 'Premium storytelling platform where words become cinematic experiences.';
    const image    = found ? (isPartner ? found.coverImage : found.image) : 'https://laminono-nexus.github.io/laminono.jpeg';
    const url      = found ? `https://laminono-nexus-github-io.vercel.app/?story=${story}` : 'https://laminono-nexus-github-io.vercel.app';

    // Read index.html
    const html = await fetch('https://raw.githubusercontent.com/laminono-nexus/laminono-nexus.github.io/main/index.html')
        .then(r => r.text());

    // Inject OG tags
    const injected = html
        .replace(/<meta id="og-title"[^>]*>/, `<meta id="og-title" property="og:title" content="${title}">`)
        .replace(/<meta id="og-description"[^>]*>/, `<meta id="og-description" property="og:description" content="${desc.replace(/"/g, '&quot;')}">`)
        .replace(/<meta id="og-image"[^>]*>/, `<meta id="og-image" property="og:image" content="${image}">`)
        .replace(/<meta id="og-url"[^>]*>/, `<meta id="og-url" property="og:url" content="${url}">`);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=60');
    res.send(injected);
}
