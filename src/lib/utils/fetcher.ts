import { PUBLIC_API_URL } from '$env/static/public';

export function urlBuilder(input: string | URL) {
  return input instanceof URL ? input : new URL(PUBLIC_API_URL, input);
}

export async function requester(input: string | URL, init?: RequestInit): Promise<Response> {
  const url = urlBuilder(input);
  const res = await fetch(url, init);

  if (res.status < 200 || res.status >= 400) {
    throw new Error('Request failed! Try again later', {
      cause: `${init?.method ?? 'GET'} ${url.toString()}`
    });
  }

  return res;
}

export async function responseToJSON<T>(res: Response, validator?: (body: unknown) => body is T): Promise<T> {
  const json = await res.json();

  if (validator) {
    if (validator(json)) return json;
    throw new TypeError('Unexpected response format, did not passed validation!', { cause: json });
  }

  return json;
}

/**
 * Fetch and parse as JSON
 * @throws
 */
export async function jsonFetch<T>(
  input: string | URL,
  init?: RequestInit & { validator?: (body: unknown) => body is T; json?: unknown }
): Promise<T> {
  const url = urlBuilder(input);

  const res = await requester(
    url,
    init
      ? {
        ...init,
        body: init.json ? JSON.stringify(init.json) : init.body
      }
      : undefined
  );

  const json = await responseToJSON(res, init?.validator);
  return json;
}
