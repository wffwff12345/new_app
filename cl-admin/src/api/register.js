import Request from '@/utils/request'
import { API_USERREGISTER} from '@/constants/api'

export function saveData (data) {
  return new Request({
    url: API_USERREGISTER,
    method: 'post',
    data
  })
}
