# Holiday River Expeditions — Documentation

## Purpose

Obsidian vault for project documentation, meeting notes, research, and design decisions.

**This vault is published as a website** at https://docs-umber-seven.vercel.app via `docs-site/` (Astro + Starlight, deployed from `main` by Vercel). Everything in the vault is published **except** `CLAUDE.md`, `README.md`, `progress/`, and `templates/`. Write everything else as if the whole team will read it — because they will.

## Structure

- `project/` — active project plans and decisions
- `meetings/` — chronological meeting notes and weekly syncs
- `design/` — brand guidelines, UI patterns, and assets
- `research/` — technical research
- `reference/` — API docs and reference material
- `progress/` — machine-written session logs (unpublished; see Ownership)
- `templates/` — note templates (unpublished)
- `docs-site/` — the Astro/Starlight publishing app (not vault content)

## Ownership — who writes what

**Human-owned (Darius). Claude must never create or edit these unless explicitly asked in the current session:**

- `meetings/` — all meeting notes, including weekly syncs
- `project/open-decisions.md` — decisions and their status
- Task lists and action items anywhere in the vault (Claude keeps Darius's to-do list outside the vault, see Conventions)

**Machine-owned (Claude):**

- `progress/` — end-of-session logs of coding work. These are a raw technical record ("what changed and why"), not status communication. They are excluded from the published site.

## Conventions

- Use [[wiki-links]] for cross-references between docs
- Meeting notes: `meetings/YYYY-MM-DD-topic.md`
- Weekly sync notes: `meetings/YYYY-MM-DD-weekly-sync.md`, started from [[weekly-sync]] template in `templates/`
- Progress logs: `progress/YYYY-MM-DD.md` (date only). Append to the existing file if one exists for today. Start each file with frontmatter `author: claude` and the banner line `> Machine-written session log — raw technical record, not project status.`
- Decisions and tasks are tracked **in this vault** (`project/open-decisions.md`, `project/build-phases.md`), not in GitHub Issues
- Darius's to-do list is the **HRE Launch List** artifact on claude.ai (https://claude.ai/artifact/JEC6mC7TmCybNEhrLTbEiE, private to Darius), not a file in this vault. It has lanes for this week, before launch (grouped by build phase), waiting on Holiday, and after launch. Claude drafts and maintains it: adds items from the syncs, the build plan and coding sessions, and at the end of each coding session ticks what shipped. Claude always tells Darius in chat exactly what it changed on the list. Darius prunes it. Sync notes still record action items as said in the meeting, and Darius still emails owners after each sync. `project/build-phases.md` stays the technical record of the plan. (Decided 2026-10-11, reversing the 2026-08-20 rule that Claude never creates tasks. The sync-note-only setup stalled when the syncs lapsed and never covered the build plan.)
- Keep docs concise and update them as decisions change
- Tag open questions with `#decision-needed`
