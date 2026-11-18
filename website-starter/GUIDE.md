# Guide: from idea to a live website

For the person setting things up (you) and, later, for the owner who keeps it up to date.
Plain steps, no tech background needed beyond clicking through a few websites.

## What you need
- A **GitHub** account (stores the site's files)
- A **Netlify** account (publishes it; free to start)
- **Claude** with access to your GitHub repo (Claude Code on the web, or the desktop/CLI app)
- The owner's answers to `brief.md`

## Step 1. Make a copy for this client
1. Open the starter-kit repository on GitHub. (One time only: its **Settings → General → Template repository** must be ticked.)
2. Click **Use this template → Create a new repository**. Name it after the client, for example `holiher-website`. Choose **Private**.

## Step 2. Answer the brief
Copy `brief.md`, fill in what you know, and leave the rest as "I don't know yet". An honest, rough brief
beats a polished guess. If the client can't answer it, a 20-minute call with the questions as a list is enough.

## Step 3. Let Claude build the first version
Open Claude on the new repository and say something like:

> Read CLAUDE.md and brief.md, then fill in content/content.json for this client.
> Run `node build.mjs --check` and tell me what is still unknown.

Claude fills the content file, picks the sections that match what is known, leaves the rest as blanks,
and builds the page. Look at it (`node tools/serve.mjs`), and give feedback in plain words.

## Step 4. Choose a look
The default look is `warm`. To get more options, ask Claude to make extra looks, using one of the
three routes in `design/routes/`:

| Route | Use when |
|---|---|
| **awwwards** | You want a distinctive, designed-feeling site with motion and a strong concept |
| **hallmark** | You want a clean site that avoids the "AI-generated" look, with firm rules on accessibility and honesty |
| **inspiration** | The client points at a site they love and says "like this, but for me" |

Then build them all side by side and let the client choose:
```bash
node build.mjs --all
```
This makes a chooser page with every look. When one is picked, set `"theme": "<name>"` in `content/content.json`.

## Step 5. Publish on Netlify
1. In Netlify: **Add new site → Import an existing project → GitHub**, and pick the client's repository.
2. Build command: `node build.mjs`. Publish directory: `site`. (These are already in `netlify.toml`, so Netlify fills them in.)
3. Click **Deploy**. After a minute you get an address like `something.netlify.app`.
4. Open that address in a private/incognito window to check it is public.

*(Button names in Netlify change from time to time. The idea stays the same: connect the repo, build with `node build.mjs`, publish `site`.)*

From now on, **every change to the repository is published automatically**.

## Step 6. Connect the practical parts
| What | How |
|---|---|
| **Booking widget** (Salonized or similar) | In your booking tool, find the option to put booking on your own website and copy its embed code. Paste it into `site.integrations.booking.embed` in `content.json`. |
| **Contact form** | Set `site.integrations.form.provider` to `"netlify"`. In Netlify, open **Forms** and set where notification e-mails go. Netlify's free plan has a monthly limit, so check it. |
| **E-mail address and phone** | In the `practical` section: `v` is what's shown, `href` makes it clickable (`mailto:…`, `tel:…`). |
| **Own domain** | Netlify: **Domain management → Add a domain**. Buy it in the client's name. |
| **Privacy page** | Add a page (or link) and put it in `site.footer.links`. Needed whenever the form collects personal data. |

## Step 7. Going live
Run the check in live mode:
```bash
node build.mjs --status live --check
```
It lists everything still missing. When it's clean, set `"status": "live"` in `content.json` and
`"indexable": true` when you want search engines to find the site. **In live status Netlify will
refuse to publish if anything is unfinished**, so an incomplete site never goes out by accident.

---

## Changing things later
**Small text changes (anyone):** open `content/content.json` on GitHub, click the pencil icon, change the
text between the quotes, and click **Commit changes**. Netlify publishes within a minute or two.
Be careful with quotes, commas and brackets; if the build fails, Netlify keeps showing the old site.

**Anything bigger (with Claude):** open Claude on the repository and ask in plain words:
- "Change the price of the series to €250."
- "Add a question about parking to the FAQ."
- "The second review is wrong, remove it."
- "Make the hero line warmer."

Claude edits `content/content.json`, builds, checks, and proposes the change. Netlify makes a **preview**
of every proposed change, so the owner can look before it goes live. When it looks right, merge it.

**New look or new section:** ask Claude for it. That's a theme or an engine change, not a content change.

## If something goes wrong
| Symptom | Likely cause |
|---|---|
| Netlify deploy fails | Live status with something unfinished. Open the deploy log: it lists exactly what. Or a typo in `content.json`. |
| Site shows the old version | The newest deploy failed, or auto-publishing is stopped (Deploys tab → publish the newest deploy). |
| Booking widget doesn't show | The embed code was pasted with its quotes broken. Ask Claude to put it in. |
| "Not published" in the log | That's the safety net working. Read what it says is missing. |
| Search engines don't find it | `indexable` is `false`, or status is `draft`. Both are on purpose until launch. |
