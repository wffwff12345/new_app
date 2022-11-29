import { USER_KEY } from '@/constants/user'
import emitter from '@/utils/event'
export function setStore (key, value) {
  if (!key) {
    console.warn('本地存储的key不能为空')
    return
  }
  if (value) {
    value = typeof value !== 'string' ? JSON.stringify(value) : value
  }
  localStorage.setItem(key, value)
}
export function getStore (key) {
  if (!key) {
    console.warn('本地存储的key不能为空')
    return
  }
  let data = localStorage.getItem(key)
  if (data) {
    data = JSON.parse(data)
  }
  return data
}
export function clearStore (key) {
  if (!key) {
    console.warn('本地存储的key不能为空')
    return
  }
  localStorage.removeItem(key)
}
export function setUser (value) {
  setStore(USER_KEY, value)
}
export function getUser () {
  return getStore(USER_KEY)
}

export function clearUser () {
  clearStore(USER_KEY)
}
