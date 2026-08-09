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
| Immigration | `/immigration` | Index of program folders |

## Immigration folders

| Folder | Path |
|--------|------|
| Express Entry | `/immigration/express-entry` |
| AAIP | `/immigration/aaip` |

AAIP holds an **expired** profile snapshot (pathway, NOC, work permit, EE number/CRS, education, language, job offer) for the next Worker EOI. Portal username is on the page; **portal password is not stored on this site** (use a password manager).

## Private portfolio shares

| Company | Path | Notes |
|---------|------|--------|
| Kanopi | `/share/kanopi` | Own share password for external recipients |

Add future company shares under `/share/:company` and list them in `PRIVATE_PORTFOLIO_SHARES` (`src/content/admin.ts`).

Private portfolio, French, Immigration, and immigration folders redirect to `/admin` if the admin session is not unlocked.
