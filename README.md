# NEXUS 2090

An AI platform website from the year 2090, built by **Babyface**. It has a red and black 3D dreamland background, a prompt-driven video editor, a chat demo, a sidebar, and a white and red OTP login page.

This is a plain static site: no build step, no framework, no server needed to view it.

---

## Contents

1. [Folder structure](#folder-structure)
2. [Quick start](#quick-start)
3. [Features](#features)
4. [The video editor](#the-video-editor)
5. [The game: NEXUS Defender](#the-game-nexus-defender)
6. [Login and OTP](#login-and-otp)
7. [Customising](#customising)
8. [Deploying](#deploying)
9. [Browser support](#browser-support)
10. [Known limits](#known-limits)
11. [Troubleshooting](#troubleshooting)
12. [Tech stack](#tech-stack)

---

## Folder structure

```
nexus2090-site/
├── index.html   Page markup (sections, sidebar, editor page, login page)
├── style.css    All styles and the colour theme
├── script.js    All behaviour: 3D scene, editor, chat demo, login
└── README.md    This file
```

Keep the three site files together in the same folder. `index.html` loads `style.css` and `script.js` by relative path.

## Quick start

1. Unzip the folder.
2. Double-click `index.html` to open it in Chrome, Edge or Firefox.
3. Make sure you are online the first time. The page loads three.js and the Orbitron and Space Grotesk fonts from the internet.

To run it through a local server instead (recommended for testing):

```bash
cd nexus2090-site
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Features

| Area | What it does |
|---|---|
| **3D dreamland background** | A live three.js scene: tunnel of glowing red rings, a crimson moon, drifting wireframe shapes, rising embers. The camera follows your mouse. |
| **Warp** | Hold the "Hold to engage warp" button to speed up the flight. Scrolling fast also speeds it up. |
| **Stealth ship** | A black, angular 3D ship with red neon lines flies forward through the tunnel. It banks toward your mouse, and its flames grow with speed. |
| **Hero** | A 2090 clock and a rotating neural orb that tilts toward the mouse. |
| **Systems cards** | Four cards (Neural Chat, Creation Studio, Time Engine, Orbit API) that tilt in 3D on hover. |
| **NEXUS-9 chat** | A chat demo with preset replies. Not connected to a live AI. |
| **Roadmap** | Timeline from 2026 to 2090. |
| **Developer section** | WhatsApp chat button, copy-number button, call button, and a socials card. |
| **Sidebar** | Logo, search, navigation, the current edit, and the login status. Slides in from the ☰ button on phones. |
| **NEXUS Editor** | Upload a video, edit it by typing a prompt, add music, and download the result. See below. |
| **Game** | NEXUS Defender: shoot the floating objects with the stealth ship. 3 lives, power-ups, rising levels and control settings. |
| **Login** | White and red page with a rotating 3D NEXUS logo and an email or phone OTP flow. See below. |

The page uses hash routes: `#editor` opens the editor, `#login` the login page and `#game` the game.

---

## The video editor

### Flow

1. Upload a video in the **NEXUS Editor** section (click or drag and drop).
2. The editor opens on its own page.
3. Type what you want, for example:
   *"Make it cinematic with the title “My Trip”, zoom in slowly, glitch intro and flash ending"*
4. NEXUS plans the edit, shows what it did, and updates the preview.
5. Optionally add music, or match the look of a reference video.
6. Press **Render video**. When it finishes, preview it and press **Download video**.

Your video never leaves the browser. Everything runs locally on the canvas.

### Available effects

| Effect | Example prompt words |
|---|---|
| Auto enhance (brightness, contrast, colour from the actual footage) | "enhance", "professional", "polish", "fix", "improve" |
| Cinematic grade with letterbox bars | "cinematic", "movie" |
| Vivid colours | "vivid", "colourful" |
| Warm tone | "warm", "golden", "sunset" |
| Black and white with film grain | "black and white", "noir", "vintage", "old film" |
| Brighter, or darker and moodier | "bright", "dark", "moody" |
| Soft dreamy glow | "dreamy", "soft", "glow" |
| Slow motion, or speed-up | "slow motion", "speed up", "timelapse" |
| Fade in and out | "fade" |
| Zoom in, zoom out, beat pulse | "zoom in", "zoom out", "pulse" |
| Camera shake or handheld feel | "shake", "handheld" |
| Transitions: glitch, wipe, iris, flash | "glitch", "wipe", "iris", "flash", "transition" |
| Mute the original sound, louder or quieter music | "mute", "music louder", "quiet music" |
| Caption text | put the text in quotes: `"My Trip"` |
| Trim | "first 10 seconds", "last 5 seconds" |

Further prompts refine the current edit. **Reset edits** clears everything.

### Music and reference video

- **Add music** mixes an audio file under the video. Control it by prompt.
- **Match a reference video** copies the brightness, contrast and colour of another clip onto yours.

### How prompts are understood

- **Published on Claude:** an AI model reads the prompt and returns the edit settings, so free-form wording works.
- **This downloaded folder:** there is no AI connection, so a built-in keyword reader is used. It understands the phrases in the table above, but not freely worded instructions.

### Rendering

The video is recorded from the canvas in real time. A 1-minute video takes about 1 minute (shorter if sped up). Keep the tab open and visible until it finishes. The result downloads as `.mp4` where the browser supports it, otherwise `.webm`.

---

## The game: NEXUS Defender

Open it from the sidebar (**Play game**) or the **Play the game** button on the home page (`#game`). The page content hides and the 3D tunnel becomes the playfield.

**Rules**
- You fly the stealth ship. The floating wireframe objects fly toward you.
- Shoot them to score 10 points each.
- You start with **3 lives** (maximum 5). If an object hits your ship you lose a life, the object is destroyed, and you are protected for 2 seconds. At 0 lives it is **game over**. Objects that miss and fly past cost nothing.
- **It gets faster:** every 15 seconds you reach a new level. Objects arrive faster and more often, and the tunnel speeds up. Your score also speeds things up.
- Your best score is saved in the browser.

**Power-ups.** Glowing icons fly down the road about every 8 to 13 seconds. Fly into one to collect it.

| Icon | Power-up | Effect |
|---|---|---|
| ♥ | Extra life | +1 life (up to 5) |
| 🛡 | Shield | 8 seconds: objects that touch you are destroyed and cost no life (+5 points) |
| ⚡ | Rapid fire | 8 seconds of double fire rate |
| ✦ | Triple shot | 8 seconds of three bullets at once |
| 💥 | Bomb | Destroys every object on screen (+10 each) |

**Controls**

| Action | Mouse or touch | Keyboard |
|---|---|---|
| Move | Move the mouse or drag a finger | WASD or arrow keys |
| Fire | Hold click, or hold the on-screen FIRE button | Space |
| Pause | ⏸ button | P or Esc |
| Settings | ⚙ button | none |
| Exit | ✕ button | none |

**Control settings (⚙ or "Controls" on the menu)**

| Setting | Options |
|---|---|
| Steering | Mouse or touch, or Keyboard |
| Sensitivity | 0.5x to 2x |
| Invert vertical | On or off |
| Auto-fire | On or off |
| On-screen FIRE button | On or off (on by default for touch screens) |
| Sound effects | On or off |
| Difficulty | Easy, Normal, Hard |

Settings are saved in the browser (`localStorage` key `nx_game`). The game needs the 3D background, so it requires WebGL and an internet connection for three.js.

---

## Login and OTP

The login page opens from the sidebar button (`#login`). The user chooses **Email** or **Phone** (country code defaults to +234), receives a 6-digit code, and enters it. Codes expire from memory when the page is closed, resend has a 30-second timer, and there is a limit of 5 wrong attempts.

### Demo mode (default)

Out of the box **no message is sent**. The page generates a code and shows it in an orange box labelled *Demo mode*. This is for design and testing only. It is **not secure**, because the code exists in the browser.

### Real OTP

A web page cannot send emails or SMS by itself. You need a small backend and a messaging service, for example Termii or Twilio (SMS) and Resend (email).

Set the two endpoints in `script.js`:

```js
var AUTH = { sendUrl: 'https://your-api.example.com/otp/send',
             verifyUrl: 'https://your-api.example.com/otp/verify' };
```

Your backend must provide:

| Endpoint | Request (JSON `POST`) | Success response |
|---|---|---|
| `sendUrl` | `{ "to": "+2349129999324", "type": "phone" }` or `{ "to": "a@b.com", "type": "email" }` | Any `2xx` |
| `verifyUrl` | `{ "to": "+2349129999324", "code": "123456" }` | `2xx` if the code is correct, otherwise `4xx` |

Backend checklist: generate the code on the server, store it hashed with an expiry of about 5 minutes, rate-limit sends per number and IP, limit verify attempts, and allow cross-origin requests (CORS) from your site.

### Session

After a successful login the identifier is kept in `localStorage` under `nx_user` so the sidebar can show who is signed in. This is only a display convenience. Real sessions should be issued by your backend (for example a secure cookie or token).

---

## Customising

| Want to change | Where |
|---|---|
| Colours and glow | `:root` variables at the top of `style.css` (`--bg`, `--c1`, `--c2`, `--c3`, `--card`, `--line`). The 3D scene colours are hex values inside the "red dreamland" block in `script.js`. |
| Social links | The `SOCIALS` object near the top of `script.js`. Fill in a URL (or an email address for `Email`) and the button appears. Empty values stay hidden. |
| WhatsApp number | In `index.html`, change the `wa.me/2349129999324` link and the visible `0912 999 9324`. In `script.js`, change the copied number in the copy button handler. Use the international format without `+` or spaces in the `wa.me` link. |
| Chat demo replies | The `R` array in the "chat demo" block in `script.js`. Each entry is a pattern and a reply. |
| Roadmap and system cards | Plain HTML in `index.html`. |
| Game balance (lives, speed, spawn rates, power-ups) | `gstep()`, `reset()` and the `PK` list in the "game core" block of `script.js`. |
| Ship design | The ship block in `script.js` (search for `var sh=new T.Group()`). |
| Editor prompt vocabulary | The `local()` function in `script.js`. |
| Country codes on login | The `<select id="cc">` options in `index.html`. |

---

## Deploying

Any static host works. Upload the folder as is.

- **Netlify:** drag the folder onto app.netlify.com/drop.
- **GitHub Pages:** push the folder to a repository and enable Pages.
- **Vercel or Cloudflare Pages:** import the folder as a static site with no build command.

Use HTTPS. Some features (clipboard copy, audio) need a secure context. Point a custom domain at the host and add a preview image and meta tags for link sharing.

---

## Browser support

| Browser | Site and 3D | Editor render |
|---|---|---|
| Chrome, Edge (desktop and Android) | Yes | Yes, recommended |
| Firefox | Yes | Yes |
| Safari | Yes | Colour effects may not be applied when rendering |

WebGL is required for the 3D background. If it fails to load, the page still works on a plain black background.

---

## Known limits

- The NEXUS-9 chat uses preset replies and is not a live AI.
- The login is in demo mode until you connect a backend.
- The editor does colour grading, motion effects, transitions, captions and audio mixing. It cannot remove objects, change backgrounds, generate scenes, or remove noise. Those need a server with video AI models.
- Transitions play at the start and end of one clip. Transitions between several clips need a multi-clip editor.
- Rendering is real time and the tab must stay open.
- The game has no leaderboard (only your best score on this device).
- The sidebar keeps only the current edit, not a history of projects.
- The 3D ship is a modelled look-alike, not a copy of any reference image.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Background is plain black | You are offline, or WebGL is disabled. Go online and reload; the three.js library loads from a CDN. |
| Fonts look different | Google Fonts did not load. The page falls back to system fonts. |
| Render button does nothing | Upload a video first, and use a recent Chrome, Edge or Firefox. |
| Exported video has no sound | Play the video once first so the browser allows audio, and check the original-sound and music settings in your prompt. |
| Colour effects missing in exported video (Safari) | Use Chrome or Edge to render. |
| Page is slow on a phone | Close other tabs, or ask for a lighter background version. |
| OTP code not arriving | Expected in demo mode. Connect a backend as described above. |
| WhatsApp button opens the wrong chat | Check the number in the `wa.me` link uses the country code (234 for Nigeria) with no leading 0. |

---

## Tech stack

- HTML, CSS and vanilla JavaScript
- [three.js](https://threejs.org) r128 (loaded from cdnjs) for the 3D background and ship
- Canvas 2D for the neural orb, the login logo and the video editor
- MediaRecorder and Web Audio for rendering video with sound
- Google Fonts: Orbitron and Space Grotesk

---

Built by **Babyface**.
