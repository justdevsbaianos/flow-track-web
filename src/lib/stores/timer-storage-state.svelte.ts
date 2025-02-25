import { createLocalStorageKey } from "$lib/utils/create-key";
import { differenceInSeconds } from 'date-fns';
import { getContext, setContext } from "svelte";
import { LocalStore } from "./local-store.svelte";

type WorkTimestamp = {
  type: 'in' | 'out'
  timestamp: number
  elapsed?: number
}

export class TimerStorageState {
  private _key = createLocalStorageKey('timerStorage')
  private _ls = new LocalStore<WorkTimestamp[]>(this._key, [])

  get workTimestamps() {
    return this._ls.value
  }

  get lastWorkTimestamp() {
    return this._ls.value.at(0)
  }

  addWorkTimestamp(type: 'in' | 'out') {
    const timestamp = Date.now()
    const prev = this.lastWorkTimestamp?.timestamp ?? 0

    const data: WorkTimestamp = {
      type,
      timestamp,
      elapsed: prev ? differenceInSeconds(timestamp, prev) : undefined
    }

    this._ls.value.unshift(data)
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

