import { browser } from '$app/environment';

export class LocalStore<T> {
  value = $state<T>() as T;
  key = '';
  version = 0;

  constructor(key: string, value: T, version = 0) {
    this.key = key;
    this.value = value;
    this.version = version;

    if (browser) {
      const item = localStorage.getItem(key);
      if (item) this.value = this.deserialize(item);
    }

    $effect(() => {
      localStorage.setItem(this.key, this.serialize(this.value));
    });
  }

  serialize(value: T): string {
    return JSON.stringify(value);
  }

  deserialize(item: string): T {
    return JSON.parse(item);
  }
}
