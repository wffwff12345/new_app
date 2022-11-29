import Request from '@/utils/request'
import { API_USEREDITOR,API_USERGET} from '@/constants/api'

export function editorData (data) {
  return new Request({
    url: API_USEREDITOR,
    method: 'post',
    data
  })
}
export function get(data){
  return new Request(
    {
      url:API_USERGET,
      method:'post',
      data
    }
  )
}
