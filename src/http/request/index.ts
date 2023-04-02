import instance from './instance'

const JSONType = 'application/json'
const FORMType = 'application/x-www-form-urlencoded;charset=UTF-8'

// const request = instance.request 别使用这种方式简写，会报错

export function $post(url, data, contentType) {
  const ct = contentType || JSONType
  return instance.request({
    method: 'POST',
    url: url,
    data: data,
    header: { 'Content-Type': ct }
  })
}
export function $get(url, data, contentType) {
  const ct = contentType || JSONType
  return instance.request({
    method: 'GET',
    url: url,
    params: data,
    header: {
      'Content-Type': ct
    }
  })
}

export function $delete(url, data, contentType) {
  const ct = contentType || FORMType
  return instance.request({
    method: 'delete',
    url: url,
    params: data,
    header: {
      'Content-Type': ct
    }
  })
}
export function $put(url, data, contentType) {
  const ct = contentType || JSONType
  return instance.request({
    method: 'put',
    url: url,
    data: data,
    header: { 'Content-Type': ct }
  })
}
export function $getBlob(url, data, contentType) {
  const ct = contentType || 'application/x-www-form-urlencoded;charset=UTF-8'
  return instance.request({
    method: 'get',
    url: url,
    params: data,
    responseType: 'blob',
    header: {
      'Content-Type': ct
    }
  })
}

export function $postBlob(url, data, contentType) {
  const ct = contentType || JSONType
  return instance.request({
    method: 'post',
    url: url,
    data: data,
    responseType: 'blob',
    header: { 'Content-Type': ct }
  })
}

export function $arraybuffer(url, data, contentType) {
  const ct = contentType || JSONType
  return instance.request({
    method: 'post',
    url: url,
    data: data,
    responseType: 'arraybuffer',
    header: { 'Content-Type': ct }
  })
}
