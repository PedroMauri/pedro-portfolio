# Admin hub

URL: https://pedromauri.com/admin  
Password: `pedrodm123`

Optional override in Vercel: `VITE_ADMIN_PASSWORD`

Not linked in public navigation. `noindex` + robots disallow.

## Links from the hub

| Button | Path | Notes |
|--------|------|--------|
| Portfolio | `/` | Public site |
| Private portfolio | `/admin/private-portfolio` | Index of company-specific shares |
| Documents | `/documents` | Shared docs for immigration processes |
| French | `/study/french` | Requires admin unlock; content next |
| Immigration | `/immigration` | Index of program folders |

## Documents

| Folder | Path | Notes |
|--------|------|--------|
| IELTS (English) | `/documents/ielts-english` | IDP login, TRF PDF, 2-year expiry |

Portal passwords on private pages use Show/Hide. Secrets are stored in the repo by design for personal use; the admin gate is client-side only (not bank-grade).

## Immigration folders

| Folder | Path |
|--------|------|
| Express Entry | `/immigration/express-entry` |
| AAIP | `/immigration/aaip` |

AAIP holds an **expired** profile snapshot for the next Worker EOI. Portal username and password (reveal) are on the page.

## Private portfolio shares

| Company | Path | Notes |
|---------|------|--------|
| Kanopi | `/share/kanopi` | Own share password for external recipients |

Add future company shares under `/share/:company` and list them in `PRIVATE_PORTFOLIO_SHARES` (`src/content/admin.ts`).

Private pages redirect to `/admin` if the admin session is not unlocked.
