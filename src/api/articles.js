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

export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `mp/v1_0/articles/${articleId}`
  })
}

export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `mp/v1_0/articles/${articleId}`,
    params: {
      // 用于指定是否存为草稿
      draft
    },
    data
  })
}

export const toggleArticleCommentStatus = (articleId, isAllowed) => {
  return request({
    method: 'PUT',
    url: 'mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: isAllowed
    }
  })
}
