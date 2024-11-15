// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: "all",
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    maxLineLenght: 200,
    //evita '>' ficar em outra linha
    bracketSameLine: true,

  };
  
  export default config;