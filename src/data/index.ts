import { UserSettings, Word } from '../types'
import { getItem, setItem } from './storage'

const USER_SETTINGS = 'user_settings'
const DB_VERSION = 'db_version'

const CURRENT_VERSION = 1

interface DataSets {
  [k: string]: { name: string; list: Word[] };
}

const dataSets = require('../../data/*.json') as DataSets

export async function getDbVersion (defaultVersion = 1) {
  return Number.parseInt(await getItem(DB_VERSION), 10) || defaultVersion
}

export async function setDbVersion () {
  await setItem(DB_VERSION, CURRENT_VERSION)
}

export async function migrateDb () {
  const dbVer = await getDbVersion()
  if (dbVer === CURRENT_VERSION) {
    return
  }
  await setDbVersion()
}

export async function getWord (bookNo = '01') {
  const words = dataSets[bookNo].list
  const idx = Math.floor(Math.random() * words.length)
  const word = words[idx] as Word
  return word
}

export async function getAllUserSettings (): Promise<UserSettings> {
  const settings = await getItem(USER_SETTINGS)
  return settings || {}
}

export async function setUserSettings (settings: UserSettings) {
  await setItem(USER_SETTINGS, settings)
}
