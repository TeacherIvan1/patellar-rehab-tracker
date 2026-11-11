# CrossFit Patellar Tendinitis (Jumper's Knee) Rehab Tracker

A mobile-first, dark-mode, single-page web application (`index.html`, `style.css`, and vanilla `app.js`) engineered for **GitHub Pages** to manage **Patellar Tendinopathy (Jumper's Knee)** rehabilitation using standard CrossFit gym equipment. Built with zero backend dependencies using browser `localStorage` and Chart.js.

## Clinical Foundation & Evidence-Based References

This rehabilitation protocol synthesizes peer-reviewed sports physical therapy guidelines for patellar tendinopathy:

- **Progressive Tendon Loading & Load Management**: Malliaras P, Cook J, Purdam C, Rio E. [Patellar Tendinopathy: Clinical Diagnosis, Load Management, and Advice for Challenging Case Presentations (JOSPT, 2015)](https://www.jospt.org/doi/10.2519/jospt.2015.5987).
- **Heavy Slow Resistance (HSR) Protocol (Kongsgaard et al.)**: 12-week progressive bilateral and unilateral knee-extensor loading (`3s eccentric / 3s concentric = 6s per rep`, 3 sessions/week with 48h recovery spacing, progressing from 15RM down to 6RM) documented in [Heavy Slow Resistance Protocol for Patellar Tendinopathy](https://medstarsportphysio.ca/journal/patellar-tendinopathy-heavy-slow-resistance) and [Clinical Management of Patellar Tendinopathy (PMC9528703)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9528703/).
- **Isometric Analgesia & Spanish Squat Setup (Rio et al. / Basas)**: `5 × 45s` isometric holds at `70°–90°` knee flexion using a rigid strap or heavy CrossFit monster band anchored to a squat rack upright to maintain a vertical tibia and modulate cortical motor inhibition, detailed in [Patellar Tendinopathy Spanish Squat & HSR Guide](https://bookphysio.in/health-blog/patellar-tendinopathy-spanish-squat-isometric-heavy-slow-resistance-guide) and [Spanish Squats for Patella Tendinopathy (Basketball.Physio)](https://basketball.physio/rehabilitation/spanishsquats/).
- **25° Single-Leg Decline Squat Protocol**: Purdam CR et al. [A pilot study of the eccentric decline squat in the management of patellar tendinopathy (PMC1724885)](https://pmc.ncbi.nlm.nih.gov/articles/PMC1724885/).
- **Energy Storage, Plyometrics & High-Low-Medium Load Spacing**: [Rehabilitation of Patellar Tendinopathy (PMC7716685)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7716685/).

## Core Features

1. **4-Phase CrossFit Rehab Protocol**:
   - **Phase 1 — Isometric Loading & Pain Modulation**: Rig-Anchored Spanish Squat Holds, Single-Leg 25° Decline Board / Bumper Plate Isometric Holds, and Banded Terminal Knee Extensions (TKE) + Concept2 Rower / BikeErg low-drag flush.
   - **Phase 2 — Heavy Slow Resistance (HSR) & Eccentric Remodeling**: Slant Board / Plate-Elevated HSR Tempo Squats (`3s down / 3s up`), Barbell Tempo Back/Front Squats, and Slow-Tempo Bulgarian Split Squats on a 20" Plyo Box.
   - **Phase 3 — Energy Storage & Progressive Plyometrics**: Tall-to-Short Snap-Downs, Stiff-Ankle Pogo Hops, and Plyo Box Jumps with Mandatory Step-Downs.
   - **Phase 4 — Return to CrossFit & WOD Integration**: Medicine Ball Wall Ball Volume Progression, Speed Rope Double-Under Intervals, and Pre-WOD Spanish Squat Analgesic Maintenance.
2. **Dual Visual Form Guides (YouTube + Animated SVG)**:
   - Every exercise includes an interactive **Animated SVG Biomechanical Form Guide** (works 100% offline in any gym) plus an on-demand **YouTube Instructional Video Embed** and direct external watch link:
     - [Spanish Squat Setup & Form — E3 Rehab](http://www.youtube.com/watch?v=hgFxm5KIF7M)
     - [Single-Leg Decline Squat — American Family Physician](http://www.youtube.com/watch?v=JBvdaCsU3_4)
     - [Banded Terminal Knee Extension (TKE) — E3 Rehab](http://www.youtube.com/watch?v=xdKm8PSX438)
     - [Slant Board / Elevated Heel Squats — Strength & Sport](http://www.youtube.com/watch?v=v1B7qGU461I)
     - [Heavy Slow Resistance Training Programme — Sports Injury Physio](http://www.youtube.com/watch?v=Y7sfQTTLOws)
     - [Bulgarian Split Squat 3 Simple Steps — Davis Diley](http://www.youtube.com/watch?v=uODWo4YqbT8)
     - [Snap Down Progressions — Rehab 2 Perform](http://www.youtube.com/watch?v=bbvKE-3Iiys)
     - [Tips for the Perfect Pogo — Health & High Performance](http://www.youtube.com/watch?v=s_qM8NDHp1k)
     - [Box Jump Step Down — OPEX Fitness](http://www.youtube.com/watch?v=W5QzqIbEWvk)
     - [Wall Balls 101 for CrossFit Athletes — Misfit Athletics](http://www.youtube.com/watch?v=_KfCGKfP1_g)
     - [Learn Double Unders Step by Step — Paradiso CrossFit](http://www.youtube.com/watch?v=9FLc4h5mhrk)
3. **Sweaty-Hands Gym Timer & HSR Tempo Metronome**:
   - Built-in **45s Isometric Hold Timer**, **Rest Interval Countdown**, and an interactive **6-Second HSR Tempo Metronome (`3s Eccentric Down` / `3s Concentric Up`)** with Web Audio API synthesized gym buzzer cues and automatic rep counting.
4. **Daily Pain Check-In & Chart.js Trend Analytics**:
   - Tracks Pre-Workout Pain (`0–10`), Post-Workout Pain (`0–10`), **24-Hour Next-Day Pain Response (`0–10`)**, and Morning Single-Leg Decline Squat stiffness (`0–10`) with automated traffic-light load guidance (`≤ 3/10` Approved, `4–5/10` Hold Load, `≥ 6/10` Regress) and a Chart.js trend graph.
5. **AI Progress Export & Dynamic JSON Plan Import**:
   - Compiles the last 7 days of pain scores, completed sets/loads, and WOD notes into a structured prompt with one-click clipboard copy, and accepts updated AI JSON workout adjustments directly in the browser.

## Repository File Structure

| File | Description |
| :--- | :--- |
| `index.html` | Semantic single-page application layout, responsive navigation, modals, and CDN links (Tailwind CSS & Chart.js `4.4.1`) |
| `style.css` | Custom high-contrast dark theme (`#090d16`), minimum `50px+` touch targets, pain-scale states, and SVG biomechanical animations |
| `app.js` | Complete vanilla JavaScript state engine, `localStorage` persistence, Web Audio timer/metronome, Chart.js rendering, AI report exporter, and JSON plan importer |
| `README.md` | Documentation, clinical references, and step-by-step GitHub Pages deployment guide |

## Step-by-Step Guide: Push to GitHub & Enable GitHub Pages

Follow the official [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart) and [Creating a GitHub Pages Site](https://docs.github.com/articles/creating-project-pages-manually) instructions below to host this app for free and access it on your phone at the gym.

### Step 1: Create a New GitHub Repository

1. Sign in to [GitHub](https://github.com/) and click the **`+`** icon in the upper-right corner, then select **New repository**.
2. Enter a repository name such as `patellar-rehab-tracker` (or `<username>.github.io` if you want it at your root user domain, per the [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart)).
3. Set repository visibility to **Public** (required for free GitHub Pages hosting on standard accounts).
4. Leave "Add a README file" unchecked (since this project includes `README.md`), and click **Create repository**.

### Step 2: Push Your Files to GitHub

#### Method A: Using the Terminal (Git CLI)

Open a terminal in the folder containing `index.html`, `style.css`, `app.js`, and `README.md`, then run:

```bash
git init
git add index.html style.css app.js README.md
git commit -m "Initial commit: CrossFit Patellar Tendinitis Rehab Web App"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/patellar-rehab-tracker.git
git push -u origin main
```

#### Method B: Uploading Directly in the GitHub Web Browser (No CLI Needed)

1. Open your newly created repository on GitHub and click **uploading an existing file** (or **Add file** → **Upload files**).
2. Drag and drop `index.html`, `style.css`, `app.js`, and `README.md` into the browser upload box.
3. Click **Commit changes** at the bottom of the page.

### Step 3: Enable GitHub Pages

1. Inside your repository on GitHub, click the **Settings** tab in the top navigation bar (per [Creating a GitHub Pages Site](https://docs.github.com/articles/creating-project-pages-manually)).
2. In the left sidebar under **Code and automation**, click **Pages**.
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
4. Under **Branch**, choose **`main`** and folder **`/ (root)`**, then click **Save**.
5. Wait 1 to 3 minutes for the automated GitHub Actions deployment to finish, then visit `https://<YOUR-USERNAME>.github.io/patellar-rehab-tracker/` on your mobile browser.
6. **Pro Gym Tip (iOS / Android Home Screen App)**: Open the live URL in Safari (iOS) or Chrome (Android) and tap **Share → Add to Home Screen** to launch it full-screen between sets like a native app.
