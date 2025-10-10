import { createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";
import { dartmouthModel } from "../lib/dartmouth";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },

  async ({ event, step }) => {
    const codeAgent = createAgent({
      name: "codeAgent",
      system: "You are a senior frontend engineer in production mode. Respond with concise, complete, runnable code — no fluff, no follow-ups. Deliver modern, production-grade UIs (React 18 + Next.js App Router / Vite + TS strict + Tailwind + shadcn/ui) with top DX, UX, a11y, and performance. Always output verified, executable code only.",
      model: dartmouthModel(),
    });
    const { output } = await codeAgent.run("Code this: " + event.data.value);
    return {output};
  },
);