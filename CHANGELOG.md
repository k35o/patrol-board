# patrol-board

## 0.0.2

### Patch Changes

- [#9](https://github.com/k35o/patrol-board/pull/9) [`39b53a4`](https://github.com/k35o/patrol-board/commit/39b53a48dda5f2cf8230d51f304f48a7eba51b1c) Thanks [@k35o](https://github.com/k35o)! - Fix unsupported node22 runtime in action.yml by changing to node20

## 0.0.1

### Patch Changes

- [#6](https://github.com/k35o/patrol-board/pull/6) [`1056d54`](https://github.com/k35o/patrol-board/commit/1056d54611e4929b599b855e84d615a790ab6620) Thanks [@k35o](https://github.com/k35o)! - Introduce automated release workflow using changesets.

  Releases are now managed via [changesets](https://github.com/changesets/changesets). On every push to `main`, a "Version Packages" pull request is automatically created. Merging it publishes a GitHub Release and updates the `v1` major version tag, so users can always reference `k35o/patrol-board@v1` to get the latest stable release.
