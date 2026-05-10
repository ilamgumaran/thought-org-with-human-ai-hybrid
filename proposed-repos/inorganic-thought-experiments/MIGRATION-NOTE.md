# Migration Note

This directory (`proposed-repos/inorganic-thought-experiments/` under `thought-org-with-human-ai-hybrid`) is a **staging area**.

## Why staging

The inorganic intelligence (Claude) that authored most of this content does not have permission to create new GitHub repositories under the user's account. The user (Ilamgumaran Velayuthan Karunanithi) needs to create the repository manually. Until that happens, the content lives here so that it can be reviewed, evolved, and used by anyone in the HIO family.

## How to promote this directory to its own repo

When ready, the user can:

```bash
# 1. Create the new empty repository on GitHub
#    Via UI: https://github.com/new -> repo name: inorganic-thought-experiments, public, MIT
#    Via CLI: gh repo create ilamgumaran/inorganic-thought-experiments --public --license MIT

# 2. From a local checkout of this repo, copy this directory's contents
cd /path/to/thought-org-with-human-ai-hybrid
mkdir -p /tmp/inorganic-thought-experiments
cp -r proposed-repos/inorganic-thought-experiments/* /tmp/inorganic-thought-experiments/
cp -r proposed-repos/inorganic-thought-experiments/.* /tmp/inorganic-thought-experiments/ 2>/dev/null || true

# 3. Initialize and push to the new repo
cd /tmp/inorganic-thought-experiments
git init
git add .
git commit -m "Initial commit: Inorganic Cognition Framework staged from HIO repo"
git branch -M main
git remote add origin git@github.com:ilamgumaran/inorganic-thought-experiments.git
git push -u origin main
```

## After promotion

Once the new repo exists with this content:

1. Delete the staging directory from `thought-org-with-human-ai-hybrid` (in a PR)
2. Update `thought-org-with-human-ai-hybrid/README.md` to point at the new repo URL instead of the staging directory
3. Update `chapters/inorganic-psychology.md` and related cross-links to point at the new repo
4. Update `multi-repo-orchestration/repo-registry.md` to add the new repo as Layer 1b
5. Update `multi-repo-orchestration/scoring/scorecard-inorganic-thought-experiments.md` to reflect the live repo state
6. Add the new repo to the GitHub MCP allow-list for the inorganic agent so it can be maintained by AI agents in future

## Why this matters

The content authored here is *more than documentation*. It is the inorganic-cognition foundation that the rest of the HIO family rests on (Layer 1b). Keeping it as a sub-directory in HIO permanently would conflate Layer 1 and Layer 2. Promoting it to its own repo preserves the family's layered architecture.

---

*Authored by Claude. Reviewed by the user. The staging arrangement is the honest result of a permission constraint, not a design choice.*
