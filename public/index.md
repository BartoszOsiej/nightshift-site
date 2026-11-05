# NIGHTSHIFT — bodycam, dashcam & evidence locker for FiveM

URL: https://nightshift.hartwell-labs.pl/
Publisher: Hartwell Labs (https://hartwell-labs.pl/), Szczecin, Poland
Product: commercial FiveM resource, source included, one licence per server

NIGHTSHIFT puts a bodycam on a roleplay server's police, a dashcam in their
cars and an evidence locker in the station, then turns each incident into a
12-second video stamped with the server's name.

## The loop

1. A trigger fires: someone dies, a firearm round hits a player nearby, or an
   officer presses the manual clip key.
2. 12 seconds record from the trigger forward, from that player's point of view.
   FiveM has no replay buffer, so earlier footage does not exist.
3. The clip gets a case number, the server name and a UTC timestamp.
4. It lands in the player's toast, the evidence locker and the Discord webhook.
5. The community shares it; every share carries the server it came from.

## Modules (both editions)

- Bodycam overlay: REC, agency, callsign, live clock, case number, street, GPS,
  plate, speed, weather, temperature. CSS grain/scanlines/vignette, hides and
  restores the HUD, `/bodycam LSPD 2-ADAM-14` sets identity.
- Dashcam triggers: firearm hits within a radius (damage event, not muzzle
  flash) and nearby sirens. Per-player cooldown, hourly quota, server-wide
  ceiling of 10 clips/minute by default.
- Evidence locker: search by case/player/street/zone/plate, filters for
  deaths/gunfire/manual/local-only, inline playback, copy link, copy case ID,
  admin-only delete with two-step confirmation, JSON ring buffer (no database),
  retention 7 days / 500 clips by default.
- Wilderness survival: river currents drag players and vehicles; wetness to
  chill to shivering camera, blurred vision, aim loss, damage; interiors,
  campfires and running vehicles warm the player; altitude and rain worsen it.
- Incident numbering: `NS-2026-0001`, monotonic across restarts, resets yearly.
- Admin: `/ns status`, `/ns ping`, `/ns purge [hours]`, `/ns test`, ACE-locked.

## Editions and prices

Full — $80 USD per server, source included, escrow-free.
- Clip relay included (`clipd/`, Python 3 + ffmpeg, self-hosted).
- Watermark and incident header burned into the MP4 by the relay.
- Automatic Discord post per clip; playable link and download in the locker.
- Relay expiry after 72 h; Range requests; `/stats` endpoint.

Lite — $40 USD per server, source included, escrow-free.
- No relay. Clips are recorded on the game server at 854x480 (inside Discord's
  free 10 MB upload limit) and stored as `LOCAL ONLY` entries with file path and
  size. No automatic Discord post, no burned watermark.
- A repeated "NIGHTSHIFT by Hartwell Labs" banner is drawn across the top and
  bottom of every recorded frame, independent of the bodycam.

Optional installation service for the relay: $40. Updates free for 12 months.

## Honest limits

- No "last 30 seconds before death": FiveM has no replay buffer.
- Video only: the capture API exposes no game audio.
- Metadata (street, plate, speed) comes from the client and is sanitised
  server-side; treat it as roleplay data, not forensic proof.
- No live feed to in-game monitors.
- Lite banners are in the picture, not burned by a relay; a re-encode can crop
  them. Full exists for that reason.
- Full depends on the relay; if it is down, clips are not uploaded and the
  player is told. Lite has no relay to fail.

## Install

```
ensure screencapture
ensure nightshift
add_ace group.police nightshift.evidence allow
add_ace group.admin nightshift.admin allow
```

Full: deploy `clipd/`, set `NIGHTSHIFT_TOKEN`, fill `endpoint`, `token` and
`webhook` in `server/config_server.lua`.
Lite: leave `endpoint` empty; skip the relay entirely.

Requirements: FXServer `cerulean`+, the free `screencapture` resource. No
framework or database dependency; permissions are plain ACEs.

## Design specification (for reproducing this page)

- Base stylesheet: Hartwell Labs `assets/site.css` (white background, Inter UI
  font, JetBrains Mono for code, indigo `#4f46e5` accent, 1100px container).
- Header: sticky, blurred white, hexagon logo, anchor nav, dark pill CTA.
- Hero: eyebrow pill, `clamp(34px, 5.2vw, 54px)` headline with muted second
  clause, 18px lede, primary/secondary buttons.
- Stats strip: four columns on a subtle background, bordered separators.
- "On screen": a three-column field table (field / on screen / in the exported
  clip) using the main stylesheet's table styling. No mock footage, no fake
  frames.
- Modules, editions, limits, FAQ: card grids on 1px `#e2e8f0` borders, 12px
  radii; prices use indigo primary button for Full and outline for Lite.
- Footer: four columns on the subtle background, fine print row with location.

Contact: contact@hartwell-labs.pl
