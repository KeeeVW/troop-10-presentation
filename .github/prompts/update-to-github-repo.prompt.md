  ---
mode: agent
description: "Sync a local project to match a target GitHub repository while preserving intentional app-specific changes."
---

# Update project to GitHub repo

Use the target GitHub repository as the source of truth for the project structure and configuration.

## Inputs

- GitHub repo URL, local clone path, or branch to compare against
- Optional note about whether the local app should preserve custom content, branding, or features

If the repo is not provided, ask for it before making changes.

## Required behavior

- Compare the current workspace against the target repo for structure, dependencies, scripts, config, source files, and documentation.
- Identify drift between the local project and the repository version.
- Keep the app’s intended functionality and user-specific customizations unless the target repo clearly requires a change.
- Prefer minimal, deterministic edits over broad rewrites.
- Explain any material change before applying it when the risk of overwriting work is high.
- Do not modify generated files, lockfiles, or unrelated assets unless they are necessary to bring the project into parity.

## Workflow

1. Inspect the local project and target repo.
2. Summarize differences in project structure, package configuration, build tooling, and app code.
3. Confirm the scope of changes if important custom work may be overwritten.
4. Apply only the necessary updates to align with the target repo.
5. Validate with the smallest relevant command, such as a project build or targeted tests.
6. Report the exact files changed, the reason for each change, and any remaining blockers.

## Output format

Provide a concise update with these sections:

- Summary of comparison
- Files or folders that will be updated
- Why each change is necessary
- Validation results
- Any risks or follow-up actions

## Guardrails

- Preserve app intent and user work.
- Keep changes scoped to the repo alignment task.
- If the target repo is incomplete, outdated, or unclear, say so and ask for the correct source.
- If a mismatch cannot be safely resolved automatically, stop and explain the blocker.
