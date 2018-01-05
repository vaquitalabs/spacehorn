let template = ''

template += `# EditorConfig helps developers define and maintain consistent\n`
template += `# coding styles between different editors and IDEs\n`
template += `# editorconfig.org`
template += `\n\n`
template += `root = true`
template += `\n\n`
template += `[*]`
template += `\n\n`
template += `# Change these settings to your own preference\n`
template += `indent_style = space\n`
template += `indent_size = 2`
template += `\n\n`
template += `# We recommend you to keep these unchanged\n`
template += `end_of_line = lf\n`
template += `charset = utf-8\n`
template += `trim_trailing_whitespace = true\n`
template += `insert_final_newline = true`
template += `\n\n`
template += `[*.md]\n`
template += `trim_trailing_whitespace = false\n`

module.exports = template
