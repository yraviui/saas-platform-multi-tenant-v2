const services = {
  auth: {
    name: "ms-01-auth-service",
    url: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
  },

  tenant: {
    name: "ms-02-tenant-service",
    url: process.env.TENANT_SERVICE_URL || "http://localhost:5002",
  },

  user: {
    name: "ms-03-user-service",
    url: process.env.USER_SERVICE_URL || "http://localhost:5003",
  },

  fund: {
    name: "ms-04-fund-service",
    url: process.env.FUND_SERVICE_URL || "http://localhost:5004",
  },

  expenditure: {
    name: "ms-05-expenditure-service",
    url: process.env.EXPENDITURE_SERVICE_URL || "http://localhost:5005",
  },

  payment: {
    name: "ms-06-payment-service",
    url: process.env.PAYMENT_SERVICE_URL || "http://localhost:5006",
  },

  paymentMethod: {
    name: "ms-07-payment-method-service",
    url:
      process.env.PAYMENT_METHOD_SERVICE_URL ||
      "http://localhost:5007",
  },

  subscription: {
    name: "ms-08-subscription-service",
    url:
      process.env.SUBSCRIPTION_SERVICE_URL ||
      "http://localhost:5008",
  },

  report: {
    name: "ms-09-report-service",
    url: process.env.REPORT_SERVICE_URL || "http://localhost:5009",
  },

  audit: {
    name: "ms-10-audit-service",
    url: process.env.AUDIT_SERVICE_URL || "http://localhost:5010",
  },

  admin: {
    name: "ms-11-admin-service",
    url: process.env.ADMIN_SERVICE_URL || "http://localhost:5011",
  },
};

export default services;