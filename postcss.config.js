const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')

const purgecssConfig = {
  content: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  whitelistPatterns: [
    // Generated Icons
    /^Icon-/,
    /^odometer/,
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
}

const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    ...(isProduction ? [purgecss(purgecssConfig)] : []),
  ]
}
