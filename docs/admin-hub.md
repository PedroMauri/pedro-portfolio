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
| French | `/study/french` | Requires admin unlock; content next |
| Immigration | `/immigration` | Index of program folders + documents |

## Immigration

| Folder | Path | Notes |
|--------|------|--------|
| Documents | `/immigration/documents` | Shared docs for AAIP / EE / other processes |
| Express Entry | `/immigration/express-entry` | Stub |
| AAIP | `/immigration/aaip` | Expired profile snapshot + portal credentials |

### Documents

| Item | Path | Notes |
|------|------|--------|
| IELTS (English) | `/immigration/documents/ielts-english` | IDP login, TRF PDF, 2-year expiry |
| WES | `/immigration/documents/wes` | ECA login, report PDF, 5-year IRCC validity |

Portal passwords on private pages use Show/Hide. Secrets are stored in the repo by design for personal use; the admin gate is client-side only (not bank-grade).

Old `/documents` URLs redirect into `/immigration/documents`.

## Private portfolio shares

| Company | Path | Notes |
|---------|------|--------|
| Kanopi | `/share/kanopi` | Own share password for external recipients |

Add future company shares under `/share/:company` and list them in `PRIVATE_PORTFOLIO_SHARES` (`src/content/admin.ts`).

Private pages redirect to `/admin` if the admin session is not unlocked.
