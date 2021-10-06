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
