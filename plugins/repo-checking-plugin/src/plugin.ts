import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const repoCheckingPluginPlugin = createPlugin({
  id: 'repo-checking-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const RepoCheckingPluginPage = repoCheckingPluginPlugin.provide(
  createRoutableExtension({
    name: 'RepoCheckingPluginPage',
    component: () =>
      import('./components/RepoCheckerCard').then(m => m.RepoCheckerCard),
      mountPoint: rootRouteRef,
  }),
);