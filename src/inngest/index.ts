import { inngest } from "./client";

export default [
  inngest.createFunction("Race", "demo/race", async ({ step }) => {
    const winner = await Promise.race([
      step.run("A", () => "A"),
      step.run("B", () => "B"),
    ]);

    return `The winner is: ${winner}`;
  }),
];
