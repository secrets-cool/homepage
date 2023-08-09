import { localStorageRef } from "./util"

const isLight = window.matchMedia('(prefers-color-scheme: light)').matches
export const theme = localStorageRef('ui.theme', isLight ? 'light' : 'dark')
