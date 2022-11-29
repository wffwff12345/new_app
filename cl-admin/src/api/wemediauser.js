import Request from '@/utils/request'
import { API_WEMEDIAUSER_LIST, API_WEMEDIAUSER_DEL ,API_WEMEDIAUSERREGISTER,API_WEMEDIAUSERVALID,API_WEMEDIAUSERINVALID} from '@/constants/api'

export function loadList (data) {
  return new Request({
    url: API_WEMEDIAUSER_LIST,
    method: 'post',
    data
  })
}
export function delData (id) {
  return new Request({
    url: API_WEMEDIAUSER_DEL+"/"+id,
    method: 'delete'
  })
}
export function saveData (data) {
  return new Request({
    url: API_WEMEDIAUSERREGISTER,
    method: 'post',
    data
  })
}
export function ValidData (id) {
  return new Request({
    url: API_WEMEDIAUSERVALID+'/'+id,
    method: 'put',
    id
  })
}
export function InvalidData (id) {
  return new Request({
    url: API_WEMEDIAUSERINVALID+'/'+id,
    method: 'put',
    id
  })
}
