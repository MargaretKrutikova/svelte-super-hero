const tailwindcss = require("tailwindcss")

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte", "./public/**/*.html"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelist: [
    "bg-deep-blue-200",
    "bg-deep-blue-300",
    "bg-deep-blue-400",
    "bg-deep-blue-500",
    "bg-deep-blue-600",
    "bg-deep-blue-700",
    "bg-deep-blue-800",
    "bg-deep-blue-900"
  ]
})

module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),

    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
}
