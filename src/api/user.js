import request from '@/utils/request'

export const userLogin = data => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    data
  })
}
