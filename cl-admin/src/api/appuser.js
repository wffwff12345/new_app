import Request from '@/utils/request'
import { API_APPUSER_LIST, API_APPUSER_DEL,API_APPUSERREGISTER,API_APPUSERVALID,API_APPUSERINVALID } from '@/constants/api'

export function loadList (data) {
  return new Request({
    url: API_APPUSER_LIST,
    method: 'post',
    data
  })
}
export function delData (id) {
  return new Request({
    url: API_APPUSER_DEL+"/"+id,
    method: 'delete'
  })
}
export function saveData (data) {
  return new Request({
    url: API_APPUSERREGISTER,
    method: 'post',
    data
  })
}
export function ValidData (id) {
  return new Request({
    url: API_APPUSERVALID+'/'+id,
    method: 'put',
    id
  })
}
export function InvalidData (id) {
  return new Request({
    url: API_APPUSERINVALID+'/'+id,
    method: 'put',
    id
  })
}
