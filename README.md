# RevOpsHubs

RevOpsHubs is a SmartLinks initiative for practical Revenue Operations knowledge, research and tools.

## Editorial URLs

Editorial content lives under **Learn**.

- English hub: `/learn/`
- Portuguese hub: `/pt/learn/`
- English articles: `/learn/<english-slug>/`
- Portuguese articles: `/pt/learn/<slug-localizado>/`
- Portuguese is the original editorial version; English is localized for an international B2B audience.
- Legacy `/learn.html` and `/articles/...` URLs permanently redirect to the corresponding Learn routes.

Examples: `/learn/what-is-a-revenue-system/` and `/pt/learn/o-que-e-um-revenue-system/`.

## Editorial rule

Before adding a new article, check it against existing Learn content to avoid topic and search-intent overlap. Prefer improving an existing piece when the intended query or reader decision is substantially the same.

## Build

Cloudflare builds with `npm run build` and deploys `dist/` as static assets.
