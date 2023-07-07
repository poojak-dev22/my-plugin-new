import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

// Check if a repository exists
const checkRepositoryExists = async (owner: any, repo: any) => {
    // console.log("**********************repo",repo, owner)
    // const res = await octokit.repos.get({ owner, repo });
    // console.log("**********************go",res)
    // return true;
    try {
      await octokit.repos.get({ owner, repo });
      return true;
    } catch (error) {
      return false;
    }
};

// Create custom actions
export const checkRepositoryExistsAction = () => {
return createTemplateAction({
    id: 'github.check-repo-exists',
    schema: {
      input: {
        type: 'object',
        properties: {
          owner: { type: 'string' },
          repo: { type: 'string' },
        },
        required: ['owner', 'repo'],
      },
      output: {
        type: 'object',
        properties: {
          exists: { type: 'boolean' },
        },
      },
    },
    handler: async (ctx:any) => {
      console.log("**************",ctx);
      let { owner, repo } = ctx.input;
      console.log("inside custom actions", owner, repo)
      const splitRepoUrl = repo?.split("?");
      const splitRepoUrlValues = splitRepoUrl[1].split("&");
      const ownerValue = splitRepoUrlValues[0].split("=");
      owner = ownerValue[1];
      const repoValue = splitRepoUrlValues[1].split("=");
      repo = repoValue[1];
      console.log("splitRepoUrl",owner, repo)
        if(await checkRepositoryExists(owner, repo)){
          console.log("========>>")
          ctx.output('exists', true);
        }
        else{
          console.log("========**")
          ctx.output('exists', false);
        }
    },
  });
}