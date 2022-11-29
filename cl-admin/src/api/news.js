import Request from '@/utils/request'
import { API_NEWS_LIST,API_NEWS_DELETE,API_NEW_INFO} from '@/constants/api'

export function loadList (data) {
  return new Request({
    url: API_NEWS_LIST,
    method: 'post',
    data
  })
}

export function delData (id) {
  return new Request({
    url: API_NEWS_DELETE+"/"+id,
    method: 'delete'
  })
}
export function getArticleById (id) {
  return new Request({
    url: API_NEW_INFO+"/"+id,
    method: 'get',
    id
  })
}
