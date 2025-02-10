import { yolo } from "$lib/utils/yolo";
import { faker } from '@faker-js/faker';

type LoginRequest = {
  password: string
  email: string
}

export async function fetchLogin(params: LoginRequest) {
  // const json = await jsonFetch('/auth/login', { json: params })
  // return json
  console.log(params)
  return yolo.fetch(() => ({
    message: faker.lorem.lines(1),
  }))
}

type RegisterRequest = {
  password: string
  email: string
}

export async function fetchRegister(params: RegisterRequest) {
  // const json = await jsonFetch('/auth/register', { json: params })
  // return json
  console.log(params)
  return yolo.fetch(() => ({
    message: faker.lorem.lines(1),
  }))
}
