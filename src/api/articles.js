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

export const deleteUserArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `mp/v1_0/articles/${articleId}`
  })
}

export const publishArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/articles',
    params: {
      // 用于指定是否存为草稿
      draft
    },
    data
  })
}
