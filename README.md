# The Calendar Club — website

Day X = X km, 1–24 December. Two pages, no server, no database:

| File | What it is |
|---|---|
| `index.html` | The public page (calendar club → calendar → results → leaderboard → where we ran). |
| `editor.html` | The organisers' page, locked with a password. Adds / edits / deletes runs. |
| `data.json` | The results. The editor writes it, the public page reads it. |
| `editor-key.json` | Created by the editor on first use: your GitHub token, encrypted with your password. |
| `style.css` | Colours, fonts, spacing (all in the variables at the top). |
| `shared.js`, `geo.json` | City list + helpers, map outlines. Leave them be. |

Preview with fake data (nothing is saved): `index.html?demo` and `editor.html#demo`.

## Put it online (GitHub Pages, free, about 10 minutes)

1. Create a free account on github.com and make a **new public repository** (e.g. `calendar-club`). Public is required for free Pages hosting.
2. In the repository choose **Add file → Upload files**, drag in everything from this folder (without the folder itself), and **Commit**.
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` / `/ (root)` → Save. After about a minute the site is live at `https://YOUR-NAME.github.io/calendar-club/`.
4. Create the editor's access token: GitHub → your profile picture → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
   * Repository access: **Only select repositories** → your calendar-club repository.
   * Permissions → Repository permissions → **Contents: Read and write** (nothing else).
   * Expiration: pick a date just after the event (for example 5 January 2027).
5. Open `https://YOUR-NAME.github.io/calendar-club/editor.html`. First visit shows **Set up**: check owner / repository, paste the token, choose a long password, **Verify & save**. Done — from now on the editor asks only for the password.
6. Give the password to your co-organisers through a password manager (not a chat). After the event: delete the token on GitHub (and the repository if you want the data gone).

Every change you save is a commit to `data.json`; the public page picks it up within about a minute (GitHub Pages publishing time) and checks for news every minute while it is open.

## How results are entered and ranked

In the editor you do **not** type kilometres. For each runner and day you pick **Finished the day's distance? Yes / No** and, if you like, the **time** it took (e.g. `0:38:20` or `38:20`). One result per runner per day: saving the same runner and day again replaces the earlier result.

* **Results page columns:** for the selected day — **Distance** (the day's number if finished, e.g. day 7 = 7 km), **Time**, **Avg pace** — then, counted by the page over all days — **Total distance** (the days finished added up, e.g. days 3 + 7 + 8 = 18 km), **Total time** and **Avg total pace**. The results page opens on today's day during the event; tap another date in the calendar, or "← All days" to see only the totals ranked over the whole event (it also opens like that before 1 December and after 24 December).
* **Time / pace:** enter the time *for the day's distance* (not for a longer run) — pace = time ÷ the day's distance. Leave the time empty if you don't track it; the page shows a dash and the totals only use the days that have a time.
* **Ranking** (`RANK_BY` at the top of the script in `index.html`): on a day, finishers first, then the fastest time that day; in the all-days view, most days finished first, then the fastest total time — runners whose times are all entered come before runners with gaps — then by name. Set `RANK_BY = 'pace'` to rank by average pace instead.
* Runners who tried but did not finish show as "✗ Not finished" in that day's view; they are not ranked and don't count on the map.
* City dots on the map come from a built-in list of about 190 cities (accents and Hungarian / German / English names are matched). For any other city the editor asks for latitude and longitude once. The red glow is sized by the distance of the finished days in that city.
* `YEAR = 2026` and `TZ = 'Europe/Budapest'` decide what "today" is.

## Please read: privacy and security

* **The data is public.** The repository is public, so `data.json` (names, cities, finished yes/no and times) is readable by anyone, and Git keeps the history even after you delete a result. Get your runners' OK first (a message in the group chat is a good start) and consider first names or nicknames only. The site no longer stores heart rate or calories.
* Both pages contain `noindex` so search engines are asked not to list them. This is a request, not protection.
* **The editor password protects an encrypted token, and that file is public.** Anyone can download `editor-key.json` and try passwords offline (the encryption is PBKDF2-SHA-256 with 600,000 rounds + AES-GCM, done in the browser). So: use a long passphrase (four or five random words), keep the token limited to this one repository with the short expiry above, and revoke it when the event ends. If you ever suspect the password leaked, revoke the token on GitHub and run **Change password / token** in the editor.
* The editor locks itself after 30 minutes without activity and keeps the token only in the open tab's memory.
* If you would rather not publish an encrypted token at all, host `index.html` + files anywhere and edit `data.json` directly on GitHub (pencil icon) — the public page works the same.

## Changing the design

Everything visual hangs off the variables at the top of `style.css` (colours, fonts, spacing) plus the layout rules at the top of the `<style>` block in `index.html`. Send over your design files and the layout can be matched to them.

* **Disqualification:** a runner who has a single **No — not finished** entry is disqualified. They disappear from the **Results** page and get a red ✗ after their name on the **Leaderboard** page (the runners × days grid, ✓ / ✗ per day, days without a result show –). Correcting the entry in the editor (set it to Yes, or delete it) brings the runner back automatically. Their earlier finished runs still count on the map.
