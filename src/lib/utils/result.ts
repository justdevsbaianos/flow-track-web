import type { FetchResult } from "./fetch-result.svelte";

export type Ok<T> = {
  readonly status: 'ok';
  readonly value: T;
};

export type Fail = {
  readonly status: 'fail';
  readonly message: string;
};

export type Result<T> = Ok<T> | Fail;

export function ok<T>(value: T): Ok<T> {
  return { status: 'ok', value };
}

export function fail(message: string): Fail {
  return { status: 'fail', message };
}

export function isFail<T>(result: FetchResult<T>): result is Fail {
  return result.status === 'fail';
}

export function isOk<T>(result: FetchResult<T>): result is Ok<T> {
  return result.status === 'ok';
}

export async function wrapAsync<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const value = await promise;
    return ok(value);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return fail(message);
  }
}

export function wrapSync<T>(fn: () => T): Result<T> {
  try {
    const value = fn();
    return ok(value);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return fail(message);
  }
}
