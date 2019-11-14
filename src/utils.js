import { basename, dirname, isAbsolute, join, relative } from 'path'
import { gray, red } from 'chalk'
import glob from 'glob'
import { upperFirst, camelCase, lowerCase, upperCase } from 'lodash'

const { readdirSync } = require('fs')
import { copy, move, readFileSync, writeFileSync } from 'fs-extra'

export const getStoreName = (path) => {
  const parts = path.split('/')
  return parts[parts.length - 1]
}

export const getStoreFolder = (path) => {
  const parts = path.split('/')
  parts.pop()
  return './' + parts.join('/')
}

export const getFiles = (cwd, dirName) => {
  const extensions = '{js,ts,jsx,tsx,css,less,scss,sass,sss,json,md,mdx}'
  const pattern = dirName ? `**/${dirName}{.,.*.}${extensions}` : `**/*.${extensions}`

  console.log(pattern)

  return glob.sync(pattern, { cwd, absolute: true, nodir: true })
}

const isSubStore = (root, dirName) => {
  const absolutePath = join(root, dirName)
  return readdirSync(absolutePath, { withFileTypes: true }).some(dirent => dirent.isFile())
}

export const getReduxStoreDirectories = (root, workingDir = process.cwd()) => {
  const subStoreDirs = []

  function getAllSubStore (rootPath) {
    readdirSync(rootPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .forEach(dirent => {
        const dirName = dirent.name
        if (isSubStore(rootPath, dirName)) {
          const absolutePath = join(rootPath, dirName)
          const relativePath = relative(workingDir, absolutePath)

          subStoreDirs.push({
            name: `${dirName} ${gray(relativePath)}`,
            short: dirName,
            value: absolutePath,
          })
        } else {
          getAllSubStore(join(rootPath, dirName))
        }
      })
  }

  getAllSubStore(root)

  return subStoreDirs
}

export const replaceContents = (contents, oldName, newName) => {
  contents = contents.replace(new RegExp(oldName, 'g'), newName)
  contents = contents.replace(new RegExp(upperCase(oldName).replace(' ', '_'), 'g'), upperCase(newName.replace(' ', '_')))
  contents = contents.replace(new RegExp(lowerCase(oldName).replace(' ', '_'), 'g'), lowerCase(newName.replace(' ', '_')))
  contents = contents.replace(new RegExp(upperFirst(oldName), 'g'), upperFirst(newName))

  return contents
}

export const replicate = async (originalPath, answers, workingDir = process.cwd()) => {
  const originalName = getStoreName(originalPath)
  const absolutePath = isAbsolute(originalPath) ? originalPath : join(workingDir, originalPath)

  const destinationPath = join(workingDir, answers.folder, answers.name)

  if (destinationPath === absolutePath) {
    console.log(red.bold(`${answers.name} already exists at ${answers.folder}`))
    return process.exit(1)
  }

  await copy(absolutePath, destinationPath)
  const files = getFiles(destinationPath)

  files.forEach((file) => {
    const contents = readFileSync(file).toString()

    writeFileSync(file, replaceContents(contents, originalName, answers.name))
  })
}
