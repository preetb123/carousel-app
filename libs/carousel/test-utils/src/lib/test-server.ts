import { createServer } from "miragejs";

const response = [
  {
    title: "Test title1", images: [""]
  },
  {
    title: "Test title2", images: [""]
  },
  {
    title: "Test title3", images: [""]
  },
  {
    title: "Test title4", images: [""]
  },
]

export function makeServer(environment = "development") {
  return createServer({
    environment,
    routes() {
      this.get("/api/images", async (schema, request) => {
        return response;
      });
    },
  });
}
