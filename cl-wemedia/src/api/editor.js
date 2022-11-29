import Request from '@/utils/request'
import { API_USEREDITOR,API_USEREGET} from '@/constants/api'

export function EditorData (data) {
  return new Request({
    url: API_USEREDITOR,
    method: 'post',
    data
  })
}
export function get(data){
  return new Request({
    url:API_USEREGET,
    method:'post',
    data
  })
}
