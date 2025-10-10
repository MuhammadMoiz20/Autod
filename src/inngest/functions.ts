import { Sandbox } from "@e2b/code-interpreter";
import { createAgent } from "@inngest/agent-kit";
import { getSandbox } from "./utils";

import { inngest } from "./client";
import { dartmouthModel } from "../lib/dartmouth";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },

  async ({ event, step }) => {
    const sandboxID = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("autod-nextjs-test");
      return sandbox.sandboxId;
    });

    // const output = await step.run("run-code-agent", async () => {
      const codeAgent = createAgent({
        name: "codeAgent",
        system: "You are a senior frontend engineer in production mode. Respond with concise, complete, runnable code — no fluff, no follow-ups. Deliver modern, production-grade UIs (React 18 + Next.js App Router / Vite + TS strict + Tailwind + shadcn/ui) with top DX, UX, a11y, and performance. Always output verified, executable code only.",
        model: dartmouthModel(),
      });
      const { output } = await codeAgent.run("Code this: " + event.data.value);
    // });

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxID);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });
    return { output, sandboxUrl };
  },
);