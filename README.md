# Patrol Board

A GitHub Action that periodically runs scripts and displays/updates the results as a dashboard in GitHub Issues.

## Usage

```yaml
name: Patrol Board

on:
  schedule:
    - cron: '0 0 * * *' # Run daily
  workflow_dispatch:

jobs:
  patrol:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - uses: actions/checkout@v4
      - uses: k35o/patrol-board@main
        with:
          script: './scripts/check.ts'
          issue-title: 'Daily Report'
          issue-label: 'patrol'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Name | Required | Description |
| --- | --- | --- |
| `script` | Yes | Path to the script to execute (`.ts` / `.js` / `.sh`) |
| `issue-title` | Yes | Title of the Issue |
| `issue-label` | No | Label to attach to the Issue |
| `token` | No | GitHub token (defaults to `GITHUB_TOKEN` env var) |

## Outputs

| Name | Description |
| --- | --- |
| `issue-number` | The number of the created/updated Issue |

## How It Works

1. Runs the specified script and captures its stdout
2. Searches for an existing open Issue with the given title
3. If found, updates the Issue body; otherwise, creates a new Issue
4. Appends a "Last updated" timestamp to the Issue body

## Supported Script Types

| Extension | Runtime |
| --- | --- |
| `.ts` | `npx tsx` |
| `.js` | `npx tsx` |
| `.sh` | `bash` |

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Type check
pnpm typecheck

# Build
pnpm build
```

## License

MIT
