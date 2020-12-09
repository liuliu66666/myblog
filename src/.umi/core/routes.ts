// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/dengyunlong/Desktop/project/myblog/blog/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.jsx').default,
    "routes": [
      {
        "path": "/home",
        "exact": true,
        "component": require('@/pages/home/index.jsx').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.js').default
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
