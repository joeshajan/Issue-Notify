import { type NextPage } from "next";
import Head from "next/head";
import { Octokit } from "octokit";

interface IssuesProps {
  issues: Record<string, Array<{ title: string }>>;
}

const Issues: NextPage<IssuesProps> = ({ issues }) => {
  console.log(issues);

  return (
    <>
      <Head>
        <title>Issues</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/logo.jfif" />
      </Head>

      <div className="mx-auto mt-20 w-9/12">
        {Object.entries(issues).map(([repoName, values]) => (
          <div className="mt-5 rounded border" key={repoName}>
            <div className="bg-slate-100">{repoName}</div>

            {values.map(({ title }, idx: number) => (
              <div className="bg-green-50" key={idx}>
                {title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Issues;

export async function getServerSideProps() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const repos = [
    { owner: "EddieHubCommunity", repo: "LinkFree" },
    { owner: "excalidraw", repo: "excalidraw" },
  ];

  try {
    const issues: Record<string, Array<object>> = {};

    for (const { owner, repo } of repos) {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/issues",
        {
          owner,
          repo,
        }
      );

      const issuesWithOutPullRequests = response.data.filter(
        (issue) => !issue.pull_request
      );
      issues[repo] = issuesWithOutPullRequests;
    }

    return {
      props: { issues },
    };
  } catch (error) {
    console.log("Cannot fetch github issues ", error);
  }
}
