module.exports = {
  singleQuote: true,
  semi: false,
  bracketSpacing: false,
  overrides: [
    {
      files: '*.pug',
      options: {
        parser: 'pug',
        bracketSpacing: false, // for stein expedite
      },
    },
  ],
}
