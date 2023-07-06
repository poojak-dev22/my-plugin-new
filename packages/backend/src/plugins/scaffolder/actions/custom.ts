import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

// Check if a repository exists
const checkRepositoryExists = async (owner: any, repo: any) => {
  try {
    await octokit.repos.get({ owner, repo });
    console.log(`Repository ${owner}/${repo} exists.`);
  } catch (error) {
    console.error(`Repository ${owner}/${repo} does not exist.`, error);
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
    handler: async (ctx) => {
      const { owner, repo } = ctx.input;
      console.log("inside custom actions", owner, repo)
      try {
        await checkRepositoryExists(owner, repo);
  
        ctx.output('exists', true);
      } catch (error) {
        ctx.output('exists', false);
      }
    },
  });
}