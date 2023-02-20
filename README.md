# Inngest SolidStart + Vercel Template

Everything you need to build a Solid + Inngest project, powered by [`solid-start`](https://start.solidjs.com);

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Finngest%2Fsdk-example-solidstart-vercel&redirect-url=https%3A%2F%2Fapp.inngest.com%2Fintegrations%2Fvercel&developer-id=oac_H9biZULoTuJYFO32xkUydDmT&integration-ids=oac_H9biZULoTuJYFO32xkUydDmT)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm install

npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.

## Learn More

- [Inngest Documentation](https://www.inngest.com/docs) - learn about the Inngest SDK, functions, and events
- [SolidStart Documentation](https://start.solidjs.com) - learn about SolidStart features and APIs
