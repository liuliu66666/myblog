// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/dengyunlong/Desktop/project/myblog/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.jsx').default,
    "routes": [
      {
        "path": "/admin/articlelist/ArtCard",
        "exact": true,
        "component": require('@/pages/admin/articlelist/ArtCard.jsx').default
      },
      {
        "path": "/admin/articlelist",
        "exact": true,
        "component": require('@/pages/admin/articlelist/index.jsx').default
      },
      {
        "path": "/admin",
        "exact": true,
        "component": require('@/pages/admin/index.jsx').default
      },
      {
        "path": "/admin/write",
        "exact": true,
        "component": require('@/pages/admin/write/index.jsx').default
      },
      {
        "path": "/article",
        "exact": true,
        "component": require('@/pages/article/index.jsx').default
      },
      {
        "path": "/home",
        "exact": true,
        "component": require('@/pages/home/index.jsx').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.js').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('@/pages/login/index.jsx').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
