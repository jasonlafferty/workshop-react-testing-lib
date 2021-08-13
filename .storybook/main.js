module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  typescript: {
    check: true, // type-check stories during Storybook build
  }
}