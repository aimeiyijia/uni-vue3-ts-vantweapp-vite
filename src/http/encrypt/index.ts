import cloneDeep from 'clone-deep'
import CryptoJS from 'crypto-js'
import isString from 'lodash.isstring'
// 加密配置
const SECRET = 'd2e47b46e2b1987032aab5a82862119f'
const iv = '96384232'
const { isEncrypt, downloadUrl } = pcglConfig
console.log(pcglConfig, 'hahahahahah')
// 定义不需要被处理的接口
const whiteList = ['/file/upload', downloadUrl]

// 匹配加密方式
const encryptType = {
  GET: encryptGet,
  POST: encryptPost,
  DELETE: encryptGet,
  PUT: encryptPost
}

// 加密
export function encrypt(word, needParse = true, needReplace = false, isUrl = true) {
  let value
  if (!isEncrypt) {
    return word
  }
  if (needParse) {
    value = CryptoJS.enc.Utf8.parse(word)
  } else {
    value = word
  }

  const keys = CryptoJS.enc.Utf8.parse(SECRET)
  const ivs = CryptoJS.enc.Utf8.parse(iv)
  let encrypted = CryptoJS.TripleDES.encrypt(value, keys, {
    iv: ivs,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  if (isUrl) {
    encrypted = encodeURIComponent(encrypted)
  }
  if (needReplace) {
    return encrypted.toString().replace('+', '%2B')
  }
  return encrypted.toString()
}

// 解密
export function decrypted(params) {
  const keys = CryptoJS.enc.Utf8.parse(SECRET)
  const ivs = CryptoJS.enc.Utf8.parse(iv)
  return CryptoJS.TripleDES.decrypt(params, keys, {
    iv: ivs,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8)
}

// 加密get
function encryptGet(httpConfig) {
  try {
    const { params } = httpConfig
    const cloneParams = cloneDeep(params)
    const paramsKeys = Object.keys(cloneParams)
    paramsKeys.forEach((key) => {
      const value = cloneParams[key]
      if (value !== '') {
        cloneParams[key] = encrypt(value, true, false, false)
      }
    })
    // console.log(encrypt(JSON.stringify(params)));
    httpConfig.params = cloneParams
    // console.log(httpConfig, '加密后的GET请求配置')
    return httpConfig
  } catch (error) {
    console.log(error, 'get error')
    return httpConfig
  }
}

// 把对象编码成&name=value&name=value形式
function toQueryString(obj) {
  if (!obj) return ''
  return cloneDeep(
    Object.keys(obj).map((key) => {
      if (obj[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    })
  ).join('&')
}

// 加密post
function encryptPost(httpConfig) {
  try {
    const { data } = httpConfig
    let theRequest = {}
    // 传参类型为 FormData
    if (Object.prototype.toString.call(data).includes('FormData')) {
      const formData = new FormData()
      data.forEach((value, key) => {
        // console.log(key, value)
        if (value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, encrypt(value))
        }
      })
      httpConfig.data = formData
      // console.log(httpConfig, '加密后的POST请求配置(FormData)')
      return httpConfig
    } else if (isString(data)) {
      // 当是post请求，Content-Type是 application/x-www-form-urlencoded
      // 判断是否是 key1=value1&key2=value2 的传参格式
      if (data.includes('=')) {
        const strs = data.split('&')

        // 把&name=value&name=value变为对象形式
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
        }
        // 对象的key不加密 value加密
        const theRequestKeys = Object.keys(theRequest)
        theRequestKeys.forEach((key) => {
          theRequest[key] = encrypt(theRequest[key])
        })
        // console.log(theRequest, "数据项目");
        // console.log(toQueryString(theRequest), "数据项目");

        httpConfig.params = {}
        Object.assign(httpConfig.params, theRequest)

        httpConfig.data = toQueryString(theRequest)

        console.log(httpConfig, '加密后的POST请求配置')
        return httpConfig
      }
      // 传入参数为字符串格式的 list 集合
      httpConfig.data = {
        body: encrypt(data)
      }
      return httpConfig
    }
    // 当是post请求，Content-Type是 application/json
    theRequest = data
    httpConfig.data = {
      body: encrypt(JSON.stringify(data), true, false, false)
    }
    console.log(httpConfig, '加密后的POST请求配置 application/json')
    return httpConfig
  } catch (error) {
    console.log(error, 'post error')
    return httpConfig
  }
}

// 判断是不是在白名单中
function isInWhiteLists(httpConfig) {
  for (let i = 0; i < whiteList.length; i++) {
    if (httpConfig.url.indexOf(whiteList[i]) > -1) {
      return true
    }
  }
  return false
}

// 加密配置
export function goEncrypt(httpConfig) {
  // 判断是否配置了加密
  if (!isEncrypt) {
    return httpConfig
  }
  console.log(httpConfig, '原始请求配置')
  // 在白名单中直接不加密
  const isWhite = isInWhiteLists(httpConfig)
  if (isWhite) {
    return httpConfig
  }
  const cloneHttpConfig = cloneDeep(httpConfig)
  const encrypteMethod = encryptType[cloneHttpConfig.method.toUpperCase()]
  const config = encrypteMethod(cloneHttpConfig)
  return config
}
