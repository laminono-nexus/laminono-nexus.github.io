// ═══════════════════════════════════════
// EXTERNAL PARTNER CONTENT
// ═══════════════════════════════════════

const partnerStories = [
    {
        id: "partner-001",
        title: "The Unpredictable Luck",
        fullDescription: `In the fictional nation of Banjaria, life is anything but easy. Banji, a young man whose dreams have been tested by hardship, sets out on a journey to Abuja with his best friend, hoping for a better future.

What begins as an ordinary trip filled with laughter, arguments, and unforgettable passengers quickly turns into a nightmare when their bus breaks down in the middle of a deserted forest. As hours pass and the driver mysteriously disappears, fear begins to spread among the stranded travelers.

With danger lurking in the shadows and unexpected twists waiting around every corner, Banji soon discovers that life can change in a single moment.

A gripping tale of suspense, survival, friendship, betrayal, and the unpredictable turns of fate.

In Banjaria, nothing is ever as it seems.
Listen to what happened next before you judge.`,
        coverImage: "https://raw.githubusercontent.com/laminono-nexus/laminono-nexus.github.io/main/julius-unpredictable-luck-cover-image.jpg.png",
        partnerName: "Alolade Julius Niyi",
        partnerLogo: "🎧",
        link: "https://pocketfm.onelink.me/2IE7?af_dp=pocketfm%3A%2F%2Fopen&c=default&af_og_description=&af_og_image=&channel=WhatsApp&pid=app_share&entity_id=45b5de603ae8ab0c67ef6d9f371582c8b66c9413&af_siteid=com.radio.pocketfm&af_og_title=Pocket+FM&deep_link_value=pocketfm%3A%2F%2Fopen%3Fentity_type%3Dshow%26entity_id%3D45b5de603ae8ab0c67ef6d9f371582c8b66c9413&af_sub1=share_top_right&entity_type=show&af_sub5=deea931c8e3943f58b5a9e25d79b5358&af_sub4=45b5de603ae8ab0c67ef6d9f371582c8b66c9413&af_sub3=129e297a931c4b8d&referrer_platform=android&af_sub2=show_detail_screen&af_referrer_uid=1782251166624-3688610620059167977",
        badge: "Partner",
        ctaText: "Listen Now on PocketFM 📻",
        ctaSubInfo: "Download PocketFM to enjoy listening."
    }
    // ── TEMPLATE: Copy from here to add more ──
    // ,{
    //     id: "partner-002",
    //     title: "Your Next Partner Title",
    //     fullDescription: `Full description here...`,
    //     coverImage: "https://your-image-url.jpg",
    //     partnerName: "Brand Name",
    //     partnerLogo: "🎙️",
    //     link: "https://partner-url.com",
    //     badge: "Partner",
    //     ctaText: "Visit Partner",
    //     ctaSubInfo: "Subtitle info here."
    // }
    // ── End template ──
];

// ═══════════════════════════════════════
// PARTNER DETAIL PAGE (slide-in)
// ═══════════════════════════════════════

function createPartnerDetailPage() {
    if (document.getElementById('partner-detail-page')) return;
    const page = document.createElement('div');
    page.id = 'partner-detail-page';
    page.style.cssText = `
        position: fixed; inset: 0; z-index: 5000;
        background: #141414;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `;
    page.innerHTML = `
        <div id="partner-detail-inner" style="min-height:100vh; padding-bottom: 60px;">

            <!-- Back button -->
            <button onclick="closePartnerDetail()" style="
                position: fixed; top: 20px; left: 16px; z-index: 5100;
                background: rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.2);
                color: #fff; border-radius: 50px; padding: 8px 18px;
                font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 6px;
                backdrop-filter: blur(10px);
            ">← Back</button>

            <!-- Cover image -->
            <div id="partner-detail-cover" style="
                width: 100%; height: 420px;
                background: center/cover no-repeat #1f1f1f;
                position: relative;
            ">
                <div style="
                    position: absolute; inset: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 70%, #141414 100%);
                "></div>
            </div>

            <!-- Content -->
            <div style="padding: 0 20px; margin-top: -60px; position: relative; z-index: 2;">

                <!-- Badge -->
                <span id="partner-detail-badge" style="
                    display: inline-block; background: #E50914; color: white;
                    padding: 4px 12px; border-radius: 4px; font-size: 0.7rem;
                    font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
                    margin-bottom: 12px;
                "></span>

                <!-- Title -->
                <h1 id="partner-detail-title" style="
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem; color: #fff; margin-bottom: 10px; line-height: 1.2;
                "></h1>

                <!-- Author -->
                <p id="partner-detail-author" style="
                    color: #E50914; font-size: 0.85rem; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 24px;
                "></p>

                <!-- Share + action row -->
                <div style="display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; align-items: center;">

                    <!-- Share button -->
                    <button id="partner-share-btn" onclick="sharePartnerStory()" style="
                        display: flex; align-items: center; gap: 8px;
                        background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
                        color: #fff; border-radius: 50px; padding: 10px 20px;
                        font-size: 0.9rem; cursor: pointer; font-family: 'Inter', sans-serif;
                        transition: background 0.3s;
                    ">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                        </svg>
                        Share
                    </button>
                </div>

                <!-- Description -->
                <div id="partner-detail-desc" style="
                    color: #B3B3B3; font-size: 1rem; line-height: 1.85;
                    margin-bottom: 36px; white-space: pre-line;
                    font-family: 'Inter', sans-serif;
                "></div>

                <!-- Listen button -->
                <a id="partner-listen-btn" href="#" target="_blank" rel="noopener noreferrer" style="
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                    width: 100%; padding: 16px; border-radius: 8px;
                    background: #E50914; color: #fff;
                    font-size: 1rem; font-weight: 700; text-decoration: none;
                    font-family: 'Inter', sans-serif;
                    margin-bottom: 12px;
                    box-shadow: 0 4px 20px rgba(229,9,20,0.4);
                ">📻 Listen Now on PocketFM</a>

                <!-- Download instruction -->
                <p style="
                    text-align: center; color: #808080;
                    font-size: 0.82rem; font-family: 'Inter', sans-serif;
                ">Download PocketFM to enjoy listening 📡</p>

            </div>
        </div>
    `;
    document.body.appendChild(page);
}

function openPartnerDetail(partner) {
    createPartnerDetailPage();
    const page = document.getElementById('partner-detail-page');

    // Fill content
    document.getElementById('partner-detail-cover').style.backgroundImage = `url('${partner.coverImage}')`;
    document.getElementById('partner-detail-badge').textContent = partner.badge || 'Partner';
    document.getElementById('partner-detail-title').textContent = partner.title;
    document.getElementById('partner-detail-author').textContent = '🎧 ' + partner.partnerName;
    document.getElementById('partner-detail-desc').textContent = partner.fullDescription || partner.description;
    document.getElementById('partner-listen-btn').href = partner.link;

    // Store current partner for share
    window._currentPartner = partner;

    // Slide in
    document.body.style.overflow = 'hidden';
    window._savedScrollY = window.scrollY;
window.scrollTo(0, 0);
    const profileBar = document.getElementById('user-profile-bar');
if (profileBar) profileBar.style.display = 'none';
    requestAnimationFrame(() => {
        page.style.transform = 'translateX(0)';
    });
}

function closePartnerDetail() {
    const page = document.getElementById('partner-detail-page');
    if (!page) return;
    page.style.transform = 'translateX(100%)';
    document.body.style.overflow = '';
    if (window._savedScrollY !== undefined) {
    window.scrollTo(0, window._savedScrollY);
    }
    const profileBar = document.getElementById('user-profile-bar');
if (profileBar) profileBar.style.display = 'flex';
}

function sharePartnerStory() {
    const partner = window._currentPartner;
    if (!partner) return;

    const shareData = {
        title: partner.title,
        text: `Check out "${partner.title}" by ${partner.partnerName} on Laminono Nexus!`,
        url: `https://laminono-nexus-github-io.vercel.app/?story=${partner.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}`
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        // Fallback: copy link
        navigator.clipboard.writeText(window.location.href).then(() => {
            const btn = document.getElementById('partner-share-btn');
            if (btn) {
                btn.textContent = '✓ Link Copied!';
                setTimeout(() => { btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share`; }, 2000);
            }
        }).catch(() => {});
    }
}

// ═══════════════════════════════════════
// RENDER PARTNER CARDS
// ═══════════════════════════════════════

function renderPartnerStories() {
    const container = document.getElementById('partner-stories-row');
    if (!container || !partnerStories.length) return;

    container.innerHTML = '';

    partnerStories.forEach(partner => {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img class="story-card-image" src="${partner.coverImage}" alt="${partner.title}" loading="lazy"
                style="object-position: center top;">
            <div class="story-card-vignette"></div>
            <span class="story-badge-new" style="background:#E50914;">${partner.badge || 'Partner'}</span>
            <div class="story-cover-title">${partner.title}</div>
            <div class="story-cover-genre" style="color:#E50914;">${partner.partnerLogo} ${partner.partnerName}</div>
        `;
        card.addEventListener('click', () => openPartnerDetail(partner));
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderPartnerStories);
