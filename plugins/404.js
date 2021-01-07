export function patchRoutes(routes, config, _notFoundComponent) {
  if (config.exportStatic) return routes;
  let notFoundIndex = null;
  let notFoundComponent = '';
  routes.forEach((route, index) => {
    if (route.path === '/404' && route.component) {
      notFoundIndex = index;
      notFoundComponent = route.component;
    }
    if (route.routes) {
      route.routes = patchRoutes(route.routes, config, notFoundComponent);
    }
  });
  if (notFoundIndex !== null) {
    const notFoundRoute = routes.slice(notFoundIndex, notFoundIndex + 1)[0];
    if (notFoundRoute.component) {
      routes.push({ component: notFoundRoute.component });
    } else if (notFoundRoute.redirect) {
      routes.push({ redirect: notFoundRoute.redirect });
    } else {
      throw new Error('Invalid route config for /404');
    }
  } else if (_notFoundComponent) {
    routes.push({ component: _notFoundComponent });
  }
  return routes;
}

export default (api) => {
  api.modifyRoutes((routes) => patchRoutes(routes, api.config));
};
