import Request from '@/utils/request'
import { API_ARTICLES_INFO, API_SEARCHARTICELS, API_ARTICLES_DELETE } from '@/constants/api'

export function getArticleById (articlesId) {
  return Request({
    url: API_ARTICLES_INFO+"/"+articlesId,
    method: 'get',
    articlesId
  })
}
export function deleteArticles (articlesId) {
  return Request({
    url: API_ARTICLES_DELETE+'/'+articlesId,
    method: 'delete',
  })
}

export function searchArticle (data) {
  return Request({
    url: API_SEARCHARTICELS,
    method: 'post',
    data,
    params: {}
  })
}

