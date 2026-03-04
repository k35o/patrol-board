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
export declare function createOrUpdateIssue(params: IssueParams): Promise<number>;
export {};
