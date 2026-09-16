export const createServicePath = (service, path = "") => {
  return `/api/${service}${path}`;
};