import request from '@/utils/request'

export const userLogin = data => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    data
  })
}

export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: 'mp/v1_0/user/profile'
  })
}

export const setUserProfile = userData => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/user/profile',
    data: userData
  })
}
