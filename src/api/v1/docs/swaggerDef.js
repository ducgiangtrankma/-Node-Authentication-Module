const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "API documentation",
    version: "1.0.0",
    license: {
      name: "MIT",
      url: "",
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.APP_PORT}/api/v1`,
    },
  ],
};

export { swaggerDef };
