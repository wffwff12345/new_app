import Request from '@/utils/request'
import {API_CHANNELS,API_ARTICLES,API_ARTICLESBYCONDITION,API_ARTICLESBYID,
  API_NEWARTICLES,API_ARTICLEINFO,API_ARTICLECOMMENTS,API_ARTICLELIKELIST,API_ARTICLEFOCUSLIST,API_ARTICLELISTBYNAME,API_ARTICLELISTBYHISTORY,
  API_ARTICLEAPPUSER,API_ARTICLEADDAPPUSER,API_ARTICLE_LIKE,
  API_ARTICLE_CANLLIKE,API_ARTICLE_LIKENUMBER,
  API_ARTICLEAPPFOCUS,API_ARTICLEADDAPPFOCUS,API_ARTICLE_CANCELFOCUS,API_ARTICLE_FOCUS,
  API_ARTICLE_FOCUSNUMBER,
  API_USER_HISTORY,API_USER_DELETEHISTORY} from '@/constants/api'
export function getChannels () {
  return Request({
    url: API_CHANNELS,
    method: 'get'
  })
}
export function getArticles (data) {
  return Request({
    url: API_ARTICLES,
    method: 'post',
    data,
  })
}export function getArticle (id) {
  return Request({
    url: API_ARTICLESBYID+'/'+id,
    method: 'post',
    id,
  })
}
export function getArticlebycondition(data) {
  return Request({
    url: API_ARTICLESBYCONDITION,
    method: 'post',
    data,
  })
}export function getArticlebyname(data) {
  return Request({
    url: API_ARTICLELISTBYNAME,
    method: 'post',
    data,
  })
}
export function getNewArticles (data) {
  return Request({
    url: API_NEWARTICLES,
    method: 'post',
    data,
  })
}

export function getArticleInfo (data) {
  return Request({
    url: API_ARTICLEINFO,
    method: 'post',
    data,
  })
}
export function PostArticlecomment (data) {
  return Request({
    url: API_ARTICLECOMMENTS,
    method: 'post',
    data,
  })
}

export function addAPPARTICLE (data) {
  return Request({
    url: API_ARTICLEADDAPPUSER,
    method: 'post',
    data,
  })
}
export function getAPPARTICLE (data) {
  return Request({
    url: API_ARTICLEAPPUSER,
    method: 'post',
    data,
  })
}
export function like (id) {
  return Request({
    url: API_ARTICLE_LIKE+'/'+id,
    method: 'post',
    id
  })
}
export function getArticlebylike(data) {
  return Request({
    url: API_ARTICLELIKELIST,
    method: 'post',
    data,
  })
}
export function getAuthorbyfocus(data) {
  return Request({
    url: API_ARTICLEFOCUSLIST,
    method: 'post',
    data,
  })
}
export function number () {
  return Request({
    url: API_ARTICLE_LIKENUMBER,
    method: 'post',

  })
}export function focusnumber () {
  return Request({
    url: API_ARTICLE_FOCUSNUMBER,
    method: 'post',

  })
}
export function cancellike (id) {
  return Request({
    url: API_ARTICLE_CANLLIKE+'/'+id,
    method: 'post',
    id
  })
}
export function addfocus (data) {
  return Request({
    url: API_ARTICLEADDAPPFOCUS,
    method: 'post',
    data,
  })
}
export function getfocus (data) {
  return Request({
    url: API_ARTICLEAPPFOCUS,
    method: 'post',
    data,
  })
}
export function focus (id) {
  return Request({
    url: API_ARTICLE_FOCUS+'/'+id,
    method: 'post',
    id
  })
}
export function cancelfocus (id) {
  return Request({
    url: API_ARTICLE_CANCELFOCUS+'/'+id,
    method: 'post',
    id
  })
}
export function addhistory (data) {
  return Request({
    url: API_USER_HISTORY,
    method: 'post',
    data,
  })
}
export function getHistoryArticles (data) {
  return Request({
    url: API_ARTICLELISTBYHISTORY,
    method: 'post',
    data,
  })
}
export function deletehistory (id) {
  return new Request({
    url: API_USER_DELETEHISTORY+'/'+id,
    method: 'delete'
  })
}
