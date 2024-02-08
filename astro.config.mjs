import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"

// https://astro.build/config
export default defineConfig({
  integrations: [
    // https://starlight.astro.build
    starlight({
      title: "Unscene",
      social: {
        github: "https://github.com/wagerfield/unscene",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Navigation Menu
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
})
