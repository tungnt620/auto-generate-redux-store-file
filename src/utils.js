import { basename, dirname, isAbsolute, join, relative } from 'path'
import { camelCase, upperFirst } from 'lodash'
import { gray } from 'chalk'
import glob from 'glob'
import listReactFiles from 'list-react-files'
import { copy, move, readFileSync, writeFileSync } from 'fs-extra'

const removeExt = path => path.replace(/\.[^.]+$/, '')

export const getComponentName = (path) => (
  path.split('/').reduce((name, part) => {
    if (/^[A-Z]/.test(part)) {
      return removeExt(part)
    } else if (/^((?!index).+)\.[^.]+$/.test(part)) {
      return upperFirst(camelCase(removeExt(part)))
    }
    return name
  }, '')
)

export const getComponentFolder = (path) => {
  const name = getComponentName(path)
  return dirname(path).split('/').reduce((folder, part) => {
    if (removeExt(part) === name) {
      return folder
    }
    return join(folder, part)
  }, './')
}

export const isSingleFile = (path) => {
  const name = getComponentName(path)
  const [dir] = dirname(path).split('/').reverse()

  return dir !== name
}

export const getFiles = (cwd, componentName) => {
  const extensions = '{js,ts,jsx,tsx,css,less,scss,sass,sss,json,md,mdx}'
  const pattern = componentName ? `**/${componentName}{.,.*.}${extensions}` : `**/*.${extensions}`
  return glob.sync(pattern, { cwd, absolute: true, nodir: true })
}

export const getComponentFiles = (root, workingDir = process.cwd()) => (
  listReactFiles(root).then((files) =>
    files.map((path) => {
      const name = getComponentName(path)
      const absolutePath = join(root, path)
      const relativePath = relative(workingDir, absolutePath)
      return {
        name: `${name} ${gray(relativePath)}`,
        short: name,
        value: absolutePath,
      }
    })
  )
)

export const replaceContents = (contents, oldName, newName) => contents.replace(
  new RegExp(`([^a-zA-Z0-9_$])${oldName}([^a-zA-Z0-9_$]|Container)|(['|"]./[a-zA-Z0-9_$]*?)${oldName}([a-zA-Z0-9_$]*?)`, 'g'),
  `$1$3${newName}$2$4`
)

export const replicate = async (originalPath, answers, workingDir = process.cwd()) => {
  const originalName = getComponentName(originalPath)
  const absolutePath = isAbsolute(originalPath) ? originalPath : join(workingDir, originalPath)

  const promises = []

  if (isSingleFile(originalPath)) {
    const files = getFiles(dirname(absolutePath), originalName)

    files.forEach(async (file) => {
      const filename = basename(file).replace(originalName, answers.name)
      const destinationPath = join(workingDir, answers.folder, filename)
      const promise = copy(file, destinationPath).then(() => {
        const contents = readFileSync(destinationPath).toString()
        writeFileSync(destinationPath, replaceContents(contents, originalName, answers.name))
      })
      promises.push(promise)
    })
  } else {
    const destinationPath = join(workingDir, answers.folder, answers.name)
    await copy(dirname(absolutePath), destinationPath)
    const files = getFiles(destinationPath)

    files.forEach((file) => {
      const contents = readFileSync(file).toString()
      const renamedPath = join(dirname(file), basename(file).replace(originalName, answers.name))
      writeFileSync(file, replaceContents(contents, originalName, answers.name))
      const promise = move(file, renamedPath)
      promises.push(promise)
    })
  }
  await Promise.all(promises)
}
