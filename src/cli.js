#!/usr/bin/env node
/* eslint-disable no-console */
import { join, relative } from 'path'
import { green, red } from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import ora from 'ora'
import { subStore, name, folder } from './prompts'
import { existsSync } from 'fs'
import {
  getStoreName,
  getStoreFolder,
  getReduxStoreDirectories,
  replicate,
} from './utils'

const performReplication = async (path) => {
  const originalName = getStoreName(path)
  const relativePath = relative(process.cwd(), path)
  const originalFolder = getStoreFolder(relativePath)

  const answers = await inquirer.prompt([
    name(originalName),
    folder(originalFolder),
  ])

  replicate(path, answers)
}

const scan = async () => {
  const absoluteRoot = join(process.cwd(), 'src/store/')

  if (!existsSync(absoluteRoot)) {
    console.log(red.bold('Reddux store directory not exists'))
    return process.exit(1)
  }

  const spinner = ora(`Scanning ${green(absoluteRoot)} for redux store files...`).start()
  const dirs = await getReduxStoreDirectories(absoluteRoot)
  spinner.stop()

  if (!dirs.length) {
    console.log(red.bold('No redux store found! :('))
    return process.exit(1)
  }

  inquirer.registerPrompt('autocomplete', autocomplete)
  const answers = await inquirer.prompt([subStore(dirs)])

  return answers.subStore
}

scan().then(performReplication)
