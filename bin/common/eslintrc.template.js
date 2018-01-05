let template = ''

template += `{\n`
template += `  "parser": "babel-eslint",\n`
template += `  "env": {\n`
template += `    "commonjs": true,\n`
template += `    "es6": true,\n`
template += `    "node": true\n`
template += `  },\n`
template += `  "extends": [\n`
template += `    "eslint:recommended"\n`
template += `  ],\n`
template += `  "rules": {\n`
template += `    "indent": ["error", 2],\n`
template += `    "no-mixed-spaces-and-tabs":"error",\n`
template += `    "comma-dangle": ["error", "always-multiline"],\n`
template += `    "arrow-body-style": 0,\n`
template += `    "import/prefer-default-export": 0,\n`
template += `    "import/no-extraneous-dependencies": 0,\n`
template += `    "linebreak-style": 0,\n`
template += `    "func-names": 0,\n`
template += `    "camelcase": 0\n`
template += `  }\n`
template += `}\n`

module.exports = template
