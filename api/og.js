module.exports = async function handler(req, res) {
    const { story } = req.query;

    if (!story) {
        const html = await fetch('https://raw.githubusercontent.com/laminono-nexus/laminono-nexus.github.io/main/index.html').then(r => r.text());
        res.setHeader('Content-Type', 'text/html');
        return res.send(html);
    }

    const toSlug = t => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Fetch and parse stories
    let found = null;
    let isPartner = false;

    try {
        const raw = await fetch('https://raw.githubusercontent.com/laminono-nexus/laminono-nexus.github.io/main/stories.js').then(r => r.text());
        const cleaned = raw.replace(/^const stories\s*=\s*/, '').replace(/;?\s*$/, '');
        const stories = JSON.parse(cleaned.replace(/`[^`]*`/gs, s => JSON.stringify(s.slice(1,-1))));
        found = stories.find(s => toSlug(s.title) === story);
    } catch(e) {}

    if (!found) {
        try {
            const raw = await fetch('https://raw.githubusercontent.com/laminono-nexus/laminono-nexus.github.io/main/partners/partners.js').then(r => r.text());
            const match = raw.match(/id:\s*["']([^"']+)["'][^}]*title:\s*["']([^"']+)["'][^}]*fullDescription:\s*`([\s\S]*?)`[^}]*coverImage:\s*["']([^"']+)["']/);
            if (match && toSlug(match[2]) === story) {
                found = { title: match[2], fullDescription: match[3], coverImage: match[4] };
                isPartner = true;
            }
        } catch(e) {}
    }

    const title = found ? `${found.title} | Laminono Nexus` : 'Laminono Nexus - Premium Storytelling';
    const desc  = found ? (isPartner ? found.fullDescription?.substring(0, 160) + '…' : found.excerpt?.substring(0, 160) + '…') : 'Premium storytelling platform where words become cinematic experiences.';
    const image = found
    ? (isPartner
        ? found.coverImage
        : (found.cover && found.cover.image ? found.cover.image : found.image))
    : 'https://laminono-nexus.github.io/laminono.jpeg';
    const url   = `https://laminono-nexus-github-io.vercel.app/?story=${story}`;

    try {
        let html = await fetch('https://raw.githubusercontent.com/laminono-nexus/laminono-nexus.github.io/main/index.html').then(r => r.text());
        html = html
            .replace(/<meta id="og-title"[^>]*>/,       `<meta id="og-title" property="og:title" content="${title}">`)
            .replace(/<meta id="og-description"[^>]*>/, `<meta id="og-description" property="og:description" content="${desc.replace(/"/g, '&quot;')}">`)
            .replace(/<meta id="og-image"[^>]*>/,       `<meta id="og-image" property="og:image" content="${image}">`)
            .replace(/<meta id="og-url"[^>]*>/,         `<meta id="og-url" property="og:url" content="${url}">`);
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 's-maxage=60');
        res.send(html);
    } catch(e) {
        res.status(500).send('Error');
    }
};
