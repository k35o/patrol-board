# patrol-board

## 0.0.1

### Patch Changes

- [#6](https://github.com/k35o/patrol-board/pull/6) [`1056d54`](https://github.com/k35o/patrol-board/commit/1056d54611e4929b599b855e84d615a790ab6620) Thanks [@k35o](https://github.com/k35o)! - Introduce automated release workflow using changesets.

  Releases are now managed via [changesets](https://github.com/changesets/changesets). On every push to `main`, a "Version Packages" pull request is automatically created. Merging it publishes a GitHub Release and updates the `v1` major version tag, so users can always reference `k35o/patrol-board@v1` to get the latest stable release.
