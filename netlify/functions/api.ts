import serverless from "serverless-http";
import { createApp } from "../../server/_core/app";

let handlerPromise: Promise<ReturnType<typeof serverless>> | undefined;

export async function handler(event: any, context: any) {
  handlerPromise ??= createApp().then((app) => serverless(app));
  const handler = await handlerPromise;
  return handler(event, context);
}
