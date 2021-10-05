import request from '@/utils/request'

export const getUserArticles = params => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/articles',
    params
  })
}

export const getChannels = () => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/channels'
  })
}

export const deleteUserArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `mp/v1_0/articles/${articleId}`
  })
}
