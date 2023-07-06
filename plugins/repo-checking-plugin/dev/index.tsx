import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { repoCheckingPluginPlugin, RepoCheckingPluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(repoCheckingPluginPlugin)
  .addPage({
    element: <RepoCheckingPluginPage />,
    title: 'Root Page',
    path: '/repo-checking-plugin'
  })
  .render();
