import unoConfig from "@slidev/client/uno.config.ts";
import { mergeConfigs, presetIcons, presetWebFonts } from "unocss";

export default mergeConfigs([
  unoConfig,
  {
    presets: [
      presetWebFonts({
        provider: "google",
        fonts: {
          sans: "Montserrat",
        },
      }),
      presetIcons({
        collections: {
          carbon: () =>
            import("@iconify-json/carbon/icons.json").then((i) => i.default),
        },
      }),
    ],
    content: {
      pipeline: {
        include: [
          // the default
          /\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|html)($|\?)/,
          // include js/ts files
          "src/**/*.{js,ts}",
        ],
      },
    },
    theme: {
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui"],
        serif: ["Montserrat", "Georgia"],
      },
    },
  },
]);
