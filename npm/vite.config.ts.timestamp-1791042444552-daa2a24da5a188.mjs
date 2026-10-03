// vite.config.ts
import { defineConfig } from "file:///E:/User/Documents/GitHub/ec-player/npm/node_modules/vite/dist/node/index.js";
import react from "file:///E:/User/Documents/GitHub/ec-player/npm/node_modules/@vitejs/plugin-react/dist/index.js";
import dts from "file:///E:/User/Documents/GitHub/ec-player/npm/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import cssInjectedByJsPlugin from "file:///E:/User/Documents/GitHub/ec-player/npm/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_import_meta_url = "file:///E:/User/Documents/GitHub/ec-player/npm/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "EcPlayer",
      fileName: (format) => `ecplayer.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxVc2VyXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcZWMtcGxheWVyXFxcXG5wbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcVXNlclxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXGVjLXBsYXllclxcXFxucG1cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1VzZXIvRG9jdW1lbnRzL0dpdEh1Yi9lYy1wbGF5ZXIvbnBtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcclxuaW1wb3J0IHsgcmVzb2x2ZSwgZGlybmFtZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcclxuXHJcbmltcG9ydCBjc3NJbmplY3RlZEJ5SnNQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tY3NzLWluamVjdGVkLWJ5LWpzJztcclxuXHJcbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XHJcbmNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoX19maWxlbmFtZSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luKCksXHJcbiAgICAgICAgZHRzKHtcclxuICAgICAgICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcclxuICAgICAgICAgICAgcm9sbHVwVHlwZXM6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgXSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgbGliOiB7XHJcbiAgICAgICAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxyXG4gICAgICAgICAgICBuYW1lOiAnRWNQbGF5ZXInLFxyXG4gICAgICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGVjcGxheWVyLiR7Zm9ybWF0fS5qc2BcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0L2pzeC1ydW50aW1lJ10sXHJcbiAgICAgICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxyXG4gICAgICAgICAgICAgICAgICAgICdyZWFjdC9qc3gtcnVudGltZSc6ICdSZWFjdEpTWFJ1bnRpbWUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdULFNBQVMsb0JBQW9CO0FBQzdVLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsU0FBUyxTQUFTLGVBQWU7QUFDakMsU0FBUyxxQkFBcUI7QUFFOUIsT0FBTywyQkFBMkI7QUFONkosSUFBTSwyQ0FBMkM7QUFRaFAsSUFBTSxhQUFhLGNBQWMsd0NBQWU7QUFDaEQsSUFBTSxZQUFZLFFBQVEsVUFBVTtBQUVwQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixzQkFBc0I7QUFBQSxJQUN0QixJQUFJO0FBQUEsTUFDQSxrQkFBa0I7QUFBQSxNQUNsQixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILEtBQUs7QUFBQSxNQUNELE9BQU8sUUFBUSxXQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVyxZQUFZLE1BQU07QUFBQSxJQUM1QztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ1gsVUFBVSxDQUFDLFNBQVMsYUFBYSxtQkFBbUI7QUFBQSxNQUNwRCxRQUFRO0FBQUEsUUFDSixTQUFTO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsVUFDYixxQkFBcUI7QUFBQSxRQUN6QjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
