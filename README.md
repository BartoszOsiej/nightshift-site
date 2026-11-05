# nightshift.hartwell-labs.pl — static site

**Live:** https://nightshift.hartwell-labs.pl/  
**Repo:** https://github.com/BartoszOsiej/nightshift-site  
**Hosting:** Cloudflare Pages project `nightshift`, connected to `main`. A push
builds and deploys automatically (no build command, output = `public/`).  
**DNS:** proxied CNAME `nightshift` → `nightshift-jza.pages.dev` in the
`hartwell-labs.pl` zone.

Product page for the NIGHTSHIFT FiveM resource. Plain HTML/CSS/JS, no build
step, no dependencies: copy this folder to the subdomain root and it works.

```
site/
├── README.md           this file (repo only — not published)
└── public/             the published root of the subdomain
    ├── index.html      the page
    ├── index.md        markdown twin (the "AI" button in the header links here)
    ├── llms.txt        index for LLM crawlers, same convention as hartwell-labs.pl
    ├── robots.txt      points at the sitemap
    ├── sitemap.xml     one URL, the product page
    └── assets/
        ├── site.css    copied 1:1 from hartwell-labs.pl/assets/site.css
        ├── site.js     copied 1:1 (COPY buttons + AI/llms.txt links)
        ├── page.css    page-specific additions (preview frames, prices, cards)
        └── favicon*/icon*/apple-touch-icon/site.webmanifest
```

Pages publishes `public/` only (`destination_dir` in the project build
settings), so this README and the repo metadata never show up on the site.

## Design rules

The subdomain must read as the same company as hartwell-labs.pl. Reuse the
copied `site.css` and its tokens — do not introduce new colours, fonts or
component styles in `page.css` beyond what the page needs (preview frames,
price cards, FAQ grid). Header, buttons, stats strip, section rhythm and footer
are the main-site components, unchanged.

## Deploy

Any static host. Two common paths:

**Cloudflare Pages / Netlify** — create a project from this folder, then add
`nightshift` as a CNAME record pointing at the host's target. HTML is static, so
no build command is required.

**Own VPS (nginx)**

```nginx
server {
    listen 443 ssl http2;
    server_name nightshift.hartwell-labs.pl;
    root /var/www/nightshift;
    index index.html;

    location / { try_files $uri $uri/ =404; }

    location ~* \.(css|js|png|svg|ico|webmanifest)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    location = /index.html { add_header Cache-Control "no-cache"; }
}
```

Issue the certificate with `certbot --nginx -d nightshift.hartwell-labs.pl`.

## Keeping it honest

- Prices, module lists and limits come from the shipped `README.md` /
  `LISTING.md`. If the product changes, change this page in the same commit.
- The preview block is a CSS mock of the shipped overlay, labelled as such. Do
  not replace it with fabricated gameplay or invented screenshots.
- The page ships no analytics and no third-party scripts; the only external
  request is Google Fonts (Inter, JetBrains Mono), same as the main site.
- `assets/site.css` and `assets/site.js` are copies. When the main site updates
  them, re-copy rather than patching here, or the brands drift.
