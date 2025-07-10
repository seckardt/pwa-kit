import rsc from "@hiogawa/vite-rsc/plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [
    react(),
    rsc({
      entries: {
        client: "src/browser.tsx",
        rsc: "src/server.tsx",
        ssr: "src/prerender.tsx",
      },
    }),
    devtoolsJson(),
  ],
  optimizeDeps: {
    include: [
      "@chakra-ui/react", 
      "react-icons",
      "next-themes",
    ],
  },
  ssr: {
    noExternal: ["@chakra-ui/react", "react-icons", "next-themes"],
  },
  define: {
    global: "globalThis",
  },
});
