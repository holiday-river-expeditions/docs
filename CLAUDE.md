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
- Task lists and action items anywhere in the vault

**Machine-owned (Claude):**

- `progress/` — end-of-session logs of coding work. These are a raw technical record ("what changed and why"), not status communication. They are excluded from the published site.

## Conventions

- Use [[wiki-links]] for cross-references between docs
- Meeting notes: `meetings/YYYY-MM-DD-topic.md`
- Weekly sync notes: `meetings/YYYY-MM-DD-weekly-sync.md`, started from [[weekly-sync]] template in `templates/`
- Progress logs: `progress/YYYY-MM-DD.md` (date only). Append to the existing file if one exists for today. Start each file with frontmatter `author: claude` and the banner line `> Machine-written session log — raw technical record, not project status.`
- Decisions and tasks are tracked **in this vault** (`project/open-decisions.md`, `project/build-phases.md`), not in GitHub Issues
- Action items live in the weekly sync notes' table and nowhere else. Tasks are created only when a person commits to one in a meeting — Claude never creates or files tasks anywhere unless Darius explicitly hands one over. Assignment happens by Darius emailing owners after each sync, and each sync opens by walking the previous week's table. (Decided 2026-08-20: this replaces GitHub Issues, which failed on auto-generated task noise and non-technical assignees.)
- Keep docs concise and update them as decisions change
- Tag open questions with `#decision-needed`
