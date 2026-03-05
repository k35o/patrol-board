---
"patrol-board": patch
---

Introduce automated release workflow using changesets.

Releases are now managed via [changesets](https://github.com/changesets/changesets). On every push to `main`, a "Version Packages" pull request is automatically created. Merging it publishes a GitHub Release and updates the `v1` major version tag, so users can always reference `k35o/patrol-board@v1` to get the latest stable release.
