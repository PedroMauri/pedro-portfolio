# Maintenance mode

Public URLs show a minimal page: **Site temporariamente indisponível** / **Em breve**. That page sends `noindex, nofollow`.

The admin area and the private pages it opens keep working. Nothing in auth, domains, or project settings is changed by this mode.

Maintenance is **on by default**. No Vercel environment variable is required for it to take effect.

## Turn it off

1. Open the Vercel project `pedro-portfolio` → Settings → Environment Variables.
2. Add `VITE_MAINTENANCE_MODE` with the value `0` for Production. Add it for Preview as well if preview URLs should show the live site.
3. Redeploy. The variable is read when the site is built (the in-app gate) and at request time (routing middleware). Saving it without a new deployment does not update the live site.

Values that turn maintenance off: `0`, `false`, `off`, `no`. Any other value, or leaving the variable unset, keeps maintenance on.

To hide the public site again, delete the variable or set it to `1`, then redeploy.

Locally:

```bash
VITE_MAINTENANCE_MODE=0 npm run dev
```

## What stays available

There is no Supabase, Firebase, OAuth, or `/api` route. Admin login is the existing password form on `/admin` (session storage). These paths stay on the normal app:

| Path | Why it stays |
| --- | --- |
| `/admin`, `/admin/private-portfolio` | Login and hub |
| `/study/french` | French course linked from admin |
| `/immigration` and everything under it | Immigration notes, documents, AAIP, Express Entry |
| `/documents` and `/documents/*` | Older document links, plus the PDF and image files |
| `/share/kanopi` and `/share/*` | Company share (its own password) and its images |
| `/cases/*` | Images embedded in the Kanopi share |
| `/assets/*` | JavaScript, CSS, fonts, and French lesson audio |
| `/french-audio/*` | Audio fallback used by the French course |
| `/favicon.png`, `/robots.txt`, `/sitemap.xml` | Icon and crawler files |
| `/_vercel/*` | Vercel Web Analytics calls from the admin app |

Everything else, including `/`, `/about`, `/projects`, `/resume`, `/privacy`, `/contact`, and the public resume PDF, gets the maintenance page.

## How the gate works

`middleware.ts` runs on Vercel before the static files. For a public URL it returns the maintenance HTML directly (`Cache-Control: no-store`, `X-Robots-Tag: noindex`). That also covers the pre-rendered SEO files for `/`, `/about`, and `/projects`, which would otherwise be served as the portfolio shell.

Admin and the paths in the table call through to the existing site. The React app repeats the same rule so a click from `/admin` to Home does not reveal the portfolio without a new request.

Trade-off: this is one Vite bundle. Opening `/admin` still downloads the JavaScript that contains the portfolio copy, because the admin screens live in that same bundle. Splitting the public pages out would be a larger change and is not required to stop normal visits to the public URLs. Case-study images under `/cases/` also stay reachable, because the Kanopi share uses those files.

The allowlist lives in `src/lib/maintenance-mode.mjs`. Check it with:

```bash
node scripts/check-maintenance-mode.mjs
```
