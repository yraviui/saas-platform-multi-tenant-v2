import { createProxyMiddleware } from "http-proxy-middleware";

export const createServiceProxy = (target, routePrefix) => {
  const escapedPrefix = routePrefix.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const routeRegex = new RegExp(
    `^${escapedPrefix}(?:/|$)`
  );

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,

    pathFilter: (pathname) => {
      return routeRegex.test(pathname);
    },

    pathRewrite: (path, req) => {
      const rewrittenPath = path.replace(
        routeRegex,
        ""
      );

      const finalPath = rewrittenPath || "/";

      const normalizedTarget = target.replace(/\/+$/, "");

      console.log(
        `[PROXY] ${req.method} ${req.originalUrl} -> ${normalizedTarget}${finalPath}`
      );

      return finalPath;
    },

    on: {
      error: (error, req) => {
        console.error(
          `[PROXY ERROR] ${req.method} ${req.originalUrl}`
        );
        console.error(error.message);
      }
    }
  });
};