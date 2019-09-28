import svelte from "rollup-plugin-svelte"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"
import typescriptCompiler from "typescript"
import dotenv from "rollup-plugin-dotenv"
import serve from "rollup-plugin-serve"

const production = !process.env.ROLLUP_WATCH

export default {
  input: "src/main.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    !production && dotenv(),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("public/bundle.css")
      }
    }),
    typescript({ typescript: typescriptCompiler }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    !production &&
      serve({
        contentBase: "public",
        host: "0.0.0.0",
        port: 5000,
        historyApiFallback: false
      })
  ],
  watch: {
    clearScreen: false
  }
}
