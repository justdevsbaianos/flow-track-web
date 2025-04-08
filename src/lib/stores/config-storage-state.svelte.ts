// src/lib/stores/config-storage-state.svelte.ts

import { LocalStore } from '$lib/stores/local-store.svelte';
import { getContext, setContext } from 'svelte';

// Define a unique key for the context
const CTX_KEY = Symbol('configStorageState');

// Define the shape of your configuration.
export type Config = {
  dailyHours: Record<
    string,
    {
      hours: number;
      rest: boolean;
    }
  >;
};

// Define a default configuration.
export const DEFAULT_CONFIG: Config = {
  dailyHours: {
    Monday: { hours: 8, rest: false },
    Tuesday: { hours: 8, rest: false },
    Wednesday: { hours: 8, rest: false },
    Thursday: { hours: 8, rest: false },
    Friday: { hours: 8, rest: false },
    Saturday: { hours: 0, rest: true },
    Sunday: { hours: 0, rest: true }
  }
};

// A helper function to create a localStorage key.
// (You might have a more elaborate version in your app.)
function createLocalStorageKey(name: string, version: number = 1): string {
  return `app-${name}-v${version}`;
}

export class ConfigStorageState {
  // Create a key and a local store using your default configuration.
  private _key = createLocalStorageKey('configStorage');
  private _ls = new LocalStore<Config>(this._key, DEFAULT_CONFIG);

  // The getter exposes the current config from the underlying LocalStore.
  get config(): Config {
    return this._ls.value;
  }

  // The update method takes a partial config, merges it with the existing config,
  // and assigns the new value so that the LocalStore will persist it.
  updateConfig(newConfig: Partial<Config>): void {
    // Here we perform a shallow merge; you can adjust as needed.
    this._ls.value = {
      ...this.config,
      ...newConfig,
      // In case you need to merge nested objects like `dailyHours`:
      dailyHours: {
        ...this.config.dailyHours,
        ...(newConfig.dailyHours ?? {})
      }
    };
  }
}

// These helper functions let you set and get the ConfigStorageState from Svelte’s context.
export function getConfigStorageState(): ConfigStorageState {
  return getContext<ConfigStorageState>(CTX_KEY);
}

export function setConfigStorageState(store: ConfigStorageState): void {
  setContext(CTX_KEY, store);
}
