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
| Immigration | `/immigration` | Requires admin unlock; content next |

## Private portfolio shares

| Company | Path | Notes |
|---------|------|--------|
| Kanopi | `/share/kanopi` | Own share password for external recipients |

Add future company shares under `/share/:company` and list them in `PRIVATE_PORTFOLIO_SHARES` (`src/content/admin.ts`).

Private portfolio, French, and Immigration redirect to `/admin` if the admin session is not unlocked.
