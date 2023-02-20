import { Inngest, InngestCommHandler, ServeHandler } from "inngest";
import { APIEvent } from "solid-start/api";

const serve: ServeHandler = (nameOrInngest, functions, opts) => {
  const handler = new InngestCommHandler(
    "solidstart",
    nameOrInngest,
    functions,
    {
      ...opts,
    },
    (method: "GET" | "POST" | "PUT", event: APIEvent) => {
      const isProduction = Boolean(event.env.manifest);
      const env = process.env;
      const scheme = isProduction ? "https" : "http";
      const url = new URL(
        event.request.url as string,
        `${scheme}://${event.request.headers.get("Host") || ""}`
      );

      return {
        register: () => {
          if (method === "PUT") {
            return {
              env,
              isProduction,
              url,
              deployId: url.searchParams.get("deployId")!,
            };
          }
        },
        run: async () => {
          if (method === "POST") {
            return {
              env,
              isProduction,
              url,
              data: await event.request.json(),
              fnId: url.searchParams.get("fnId")!,
              stepId: url.searchParams.get("stepId")!,
              signature: event.request.headers.get("x-inngest-signature")!,
            };
          }
        },
        view: () => {
          if (method === "GET") {
            return {
              env,
              isProduction,
              url,
              isIntrospection: url.searchParams.has("introspect")!,
            };
          }
        },
      };
    },
    ({ body, headers, status }) => {
      return new Response(body, { headers, status });
    }
  ).createHandler();

  return {
    GET: handler.bind(null, "GET"),
    POST: handler.bind(null, "POST"),
    PUT: handler.bind(null, "PUT"),
  };
};

const inngest = new Inngest({ name: "My SolidStart", eventKey: "123" });

export const { GET, POST, PUT } = serve(inngest, [
  inngest.createFunction("Something", "t", async ({ step }) => {
    const winner = await Promise.race([
      step.run("A", () => "A"),
      step.run("B", () => "B"),
    ]);

    return `The winner is: ${winner}`;
  }),
]);
