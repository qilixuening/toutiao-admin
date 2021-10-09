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

export const setUserProfile = data => {
  return request({
    method: 'PATCH',
    url: 'mp/v1_0/user/profile',
    data
  })
}

export const setUserAvatar = formData => {
  return request({
    method: 'PATCH',
    url: 'mp/v1_0/user/photo',
    data: formData
  })
}
