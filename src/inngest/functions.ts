import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("First Step", "15s");
    await step.sleep("Second Step", "10s");
    await step.sleep("Third Step", "5s");
    return { message: `Hello ${event.data.email}!` };
  },
);