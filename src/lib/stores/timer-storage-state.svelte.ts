import { createLocalStorageKey } from "$lib/utils/create-key"
import { getContext, setContext } from "svelte"
import { LocalStore } from "./local-store.svelte"

type WorkTimestamp = {
  type: 'in' | 'out'
  timestamp: number
}

export class TimerStorageState {
  private _key = createLocalStorageKey('timerStorage')
  private _ls = new LocalStore<WorkTimestamp[]>(this._key, [])

  get workTimestamps() {
    return this._ls.value
  }

  get lastWorkTimestamp() {
    return this._ls.value.at(-1)
  }

  addWorkTimestamp(type: 'in' | 'out') {
    this._ls.value.push({ type, timestamp: Date.now() })
  }

  toggle() {
    if (this.lastWorkTimestamp?.type === 'in') {
      this.addWorkTimestamp('out')
    } else {
      this.addWorkTimestamp('in')
    }
  }

  clearWorkTimestamps() {
    this._ls.value = []
  }
}

const CTX_KEY = 'timerStorageState'

export function getTimerStorageState() {
  return getContext<TimerStorageState>(CTX_KEY)
}

export function setTimerStorageState(store: TimerStorageState) {
  setContext(CTX_KEY, store)
}

