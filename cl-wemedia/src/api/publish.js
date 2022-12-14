import Request from '@/utils/request'
import {API_USERIMAGES_LIST, API_USERIMAGES_ADD, API_CHANNELS, API_ARTICLES, API_MODIFYIMAGE_COL, API_MODIFYIMAGE_COL_CANCEL, API_MODIFYIMAGE_DELETE
} from '@/constants/api'
// 拉取全部的素材图片
export function getAllImgData (data) {
  return Request({
    url: API_USERIMAGES_LIST,
    method: 'post',
    params: {},
    data: data
  })
}
// 上传图片
export function uploadImg (data) {
  return Request({
    url: API_USERIMAGES_ADD,
    method: 'post',
    data
  })
}
// 拉取文章
export function getChannels () {
  return Request({
    url: API_CHANNELS,
    method: 'get'
  })
}
// 发表文章
export function publishArticles (data) {
  delete data.id
  return Request({
    url: API_ARTICLES,
    method: 'post',
    data
  })
}
// 编辑文章
export function modifyArticles (articleId,data) {
  return Request({
    url: API_ARTICLES,
    method: 'post',
    data
  })
}
// 删除图片素材
export function delImg (id) {
  return Request({
    url: API_MODIFYIMAGE_DELETE+'/'+id,
    method: 'delete'
  })
}
// 收藏或取消收藏方法
export function collectOrCancel (id, data) {
  const collect = data.collection
  console.log(id)
  let url = API_MODIFYIMAGE_COL
  if (collect === 0) {
    url = API_MODIFYIMAGE_COL_CANCEL
  }
  return Request({
    url: url+'/'+id,
    method: 'put'
  })
}
