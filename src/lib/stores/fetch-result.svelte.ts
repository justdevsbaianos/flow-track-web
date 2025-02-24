import { fail, ok, type Fail, type Ok } from "../utils/result";

export type Idle = {
  readonly status: 'idle';
};

export function idle(): Idle {
  return { status: 'idle' }
}

export type Fetching = {
  readonly status: 'fetching';
};

export function fetching(): Fetching {
  return { status: 'fetching' }
}


export type FetchResult<T> = Ok<T> | Fail | Fetching | Idle

export function isIdle<T>(result: FetchResult<T>): result is Idle {
  return result.status === 'idle';
}

export function isFetching<T>(result: FetchResult<T>): result is Fetching {
  return result.status === 'fetching';
}

export class FetchState<T> {
  private res = $state<FetchResult<T>>(idle())

  constructor() {
    this.res = idle()
  }

  get wrapper() {
    return this.res || idle()
  }

  public async wrap(promise: Promise<T>): Promise<FetchResult<T>> {
    try {
      this.res = fetching()
      const value = await promise;
      this.res = ok(value);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.res = fail(message);
    }

    return this.res
  }

}
