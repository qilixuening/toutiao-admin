import request from '@/utils/request'

export const uploadImage = data => {
  // 文件上传一般需要设置Content-Type为multipart/form-data
  // 但axios上传文件无需手动设置，只需要使data作为一个FormData即可
  // new FormData()
  return request({
    method: 'POST',
    url: 'mp/v1_0/user/images',
    data
  })
}

export const getUserImages = params => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/user/images',
    params
  })
}

export const alterImageInfo = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}

export const deleteImage = imageId => {
  return request({
    method: 'DELETE',
    url: `mp/v1_0/user/images/${imageId}`
  })
}
