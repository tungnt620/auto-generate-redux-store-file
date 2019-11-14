import { isAbsolute, relative } from 'path'

export const subStore = (files) => ({
  type: 'autocomplete',
  name: 'subStore',
  message: 'Which sub store do you want to replicate?',
  source: (_, input) =>
    Promise.resolve(
      files.filter(file => !input || file.value.toLowerCase().indexOf(input.toLowerCase()) >= 0)
    ),
})

export const name = (originalName) => ({
  type: 'input',
  name: 'name',
  message: `How do you want to name ${originalName} sub store?`,
  default: originalName,
})

export const folder = (originalFolder) => ({
  type: 'input',
  name: 'folder',
  message: answers => `In which folder do you want to put ${answers.name} sub store?`,
  default: originalFolder,
  filter: input => (isAbsolute(input) ? relative(process.cwd(), input) : input),
})
