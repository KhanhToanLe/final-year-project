module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    "no-unused-vars": "warn",
  },
  overrides: [
    {
        "files": ["*.js", "*.jsx","*.ts"],
        "rules": {
            "@typescript-eslint/explicit-function-return-type": "off"
        }
    }
]
}