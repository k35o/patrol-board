import * as github from "@actions/github";

type Octokit = ReturnType<typeof github.getOctokit>;

interface IssueParams {
  octokit: Octokit;
  owner: string;
  repo: string;
  title: string;
  body: string;
  label: string;
}

async function findIssueByTitle(
  octokit: Octokit,
  owner: string,
  repo: string,
  title: string,
): Promise<number | null> {
  const issues = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: "open",
    per_page: 100,
  });

  const matched = issues.data.find((issue) => issue.title === title);
  return matched?.number ?? null;
}

function buildBody(content: string): string {
  const timestamp = new Date().toISOString();
  return `${content}\n\n---\n> Last updated: ${timestamp}`;
}

export async function createOrUpdateIssue(
  params: IssueParams,
): Promise<number> {
  const { octokit, owner, repo, title, body, label } = params;
  const formattedBody = buildBody(body);
  const labels = label ? [label] : undefined;

  const existingIssueNumber = await findIssueByTitle(
    octokit,
    owner,
    repo,
    title,
  );

  if (existingIssueNumber) {
    await octokit.rest.issues.update({
      owner,
      repo,
      issue_number: existingIssueNumber,
      body: formattedBody,
    });
    return existingIssueNumber;
  }

  const { data } = await octokit.rest.issues.create({
    owner,
    repo,
    title,
    body: formattedBody,
    labels,
  });
  return data.number;
}
