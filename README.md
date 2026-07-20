# aosieo website

Simple mobile-first site listing all aosieo jastip services, built to be
edited from GitHub's web editor (no coding needed after setup).

## Files
- `index.html` — page structure (rarely needs editing)
- `style.css` — colors, fonts, layout
- `script.js` — loads `data/rates.json` and fills the page
- `data/rates.json` — **every price and rate lives here**

## How to change the RMB/IDR rate every day
1. Go to your GitHub repo in a browser (works fine on your phone).
2. Open `data/rates.json`.
3. Tap the pencil icon (top right of the file) to edit.
4. Change the numbers, for example:
   ```json
   "rmbToIdr": "2665"
   ```
   to
   ```json
   "rmbToIdr": "2670"
   ```
5. Also update `"lastUpdated"` to today's date so customers see it's current.
6. Scroll down, tap **Commit changes**.
7. Vercel picks up the change automatically and the live site updates in
   about 30–60 seconds. No need to touch `index.html`, `style.css`, or
   `script.js` for a rate change — just this one file.

Any other price on the site (WH tiers, rent alamat, other fee, etc.) works
the same way — it's all in `data/rates.json`.

Keep the quoted text on the *left* of each `:` exactly as-is (those are the
field names the code looks for) — only change the values on the right.

## Put it on GitHub
1. Create a new repository on github.com, e.g. `aosieo-web`.
2. Upload all these files (drag-and-drop works on github.com — use "Add
   file → Upload files").
3. Commit to the `main` branch.

## Deploy on Vercel
1. Go to vercel.com and sign up/log in with your GitHub account.
2. Click **Add New → Project**.
3. Select your `aosieo-web` repo and click **Import**.
4. Leave all settings as default (it's a static site, no build step needed)
   and click **Deploy**.
5. Vercel gives you a free `.vercel.app` domain immediately. You can add a
   custom domain later from the project's **Settings → Domains** if you buy
   one.

From then on, every time you commit a change on GitHub (like editing
`data/rates.json` from your phone), Vercel redeploys automatically.

## Editing contact info
Your WhatsApp number and Line ID are also in `data/rates.json`, under
`"contact"`.
