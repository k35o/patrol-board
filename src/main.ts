import * as core from "@actions/core";
import * as github from "@actions/github";
import { runScript } from "./run-script.js";
import { createOrUpdateIssue } from "./issue.js";

async function run(): Promise<void> {
  try {
    const script = core.getInput("script", { required: true });
    const issueTitle = core.getInput("issue-title", { required: true });
    const issueLabel = core.getInput("issue-label");
    const token = core.getInput("token") || process.env.GITHUB_TOKEN;

    if (!token) {
      throw new Error(
        "GitHub token is required. Set GITHUB_TOKEN environment variable or provide 'token' input.",
      );
    }

    core.info(`Running script: ${script}`);
    const stdout = await runScript(script);
    core.info("Script executed successfully.");

    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    const issueNumber = await createOrUpdateIssue({
      octokit,
      owner,
      repo,
      title: issueTitle,
      body: stdout,
      label: issueLabel,
    });

    core.setOutput("issue-number", issueNumber);
    core.info(`Issue #${issueNumber} has been created/updated.`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unexpected error occurred.");
    }
  }
}

run();
