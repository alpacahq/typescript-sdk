import { build, emptyDir } from "@deno/dnt";

// Create the npm directory
await emptyDir("./npm");

// Generate the npm package
await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  // @todo: enable typeCheck in the future (unfinished types right now)
  typeCheck: false,
  test: false,
  scriptModule: false,
  declaration: "inline",
  package: {
    name: "@alpacahq/typescript-sdk",
    version: Deno.args[0],
    description:
      "A TypeScript SDK for the https://alpaca.markets REST API and WebSocket streams.",
    repository: {
      type: "git",
      url: "git+https://github.com/@alpacahq/typescript-sdk.git",
    },
    keywords: [
      "alpaca",
      "alpaca.markets",
      "alpaca api",
      "alpaca sdk",
      "alpaca typescript",
      "alpaca websocket",
      "alpaca rest",
      "alpaca trading",
      "alpaca trading api",
      "alpaca trading sdk",
      "alpaca trading typescript",
      "alpaca trading websocket",
      "alpaca trading rest",
      "alpaca markets",
      "alpaca markets api",
      "alpaca markets sdk",
      "alpaca markets typescript",
      "alpaca markets websocket",
      "alpaca markets rest",
    ],
    author: "117",
    license: "MIT",
    bugs: {
      url: "https://github.com/@alpacahq/typescript-sdk/issues",
    },
    homepage: "https://github.com/@alpacahq/typescript-sdk#readme",
  },
  postBuild() {
    // Copy the README to the npm directory (for npmjs.com)
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
