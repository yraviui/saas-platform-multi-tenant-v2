import { createProxyMiddleware } from "http-proxy-middleware";

export const createServiceProxy = (target, routePrefix) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,

    pathRewrite: {
      [`^${routePrefix}`]: ""
    }
  });
};