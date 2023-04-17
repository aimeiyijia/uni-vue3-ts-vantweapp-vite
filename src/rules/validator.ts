import {
  emailReg,
  idCardReg,
  numberTypeReg,
  passwordReg,
  personNameReg,
  phoneReg,
  smsCodeReg
} from './regular'

export function validatorPassword(rule, value, callback) {
  if (!passwordReg.test(value)) {
    callback(new Error('密码必须为8~16位，且包含数字、大写字母、小写字母'))
  } else {
    callback()
  }
}

export function validatorPasswordAgain(this: any, rule, value, callback) {
  if (value !== this.form.password) {
    callback('两次输入密码不一致')
  } else {
    callback()
  }
}

export function validatorPhone(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else if (!phoneReg.test(value)) {
    callback(new Error('手机号码格式不正确'))
  } else {
    callback()
  }
}

export const validatePhone = validatorPhone

export function validatorMail(rule, value, callback) {
  if (value === '') {
    callback()
  } else if (!emailReg.test(value)) {
    callback(new Error('邮箱格式不正确'))
  } else {
    callback()
  }
}

// 短信验证码
export function validateSmsCode(rule, value, callback) {
  if (!smsCodeReg.test(value)) {
    callback(new Error('手机验证码必须为6位数字'))
  } else {
    callback()
  }
}

export function validateAccount(rule, value, callback) {
  if (!numberTypeReg.test(value)) {
    callback(new Error('请输入整数'))
  } else if (value.length > 30) {
    callback(new Error('请输入30个及以内的数字'))
  } else {
    callback()
  }
}
export function validateBankName(rule, value, callback) {
  if (value.length > 50) {
    callback(new Error('请输入50个及以内的字符'))
  } else {
    callback()
  }
}
export function validatePersonName(rule, value, callback) {
  if (!personNameReg.test(value)) {
    callback(new Error('请输入汉字，允许有特殊符号·(例：艾买提·麦提)'))
  } else if (value.length > 16) {
    callback(new Error('输入内容不能超过16个字符长度'))
  } else {
    callback()
  }
}

// 身份证号码
export function validateIdCard(rule, value, callback) {
  if (!idCardReg.test(value)) {
    callback(new Error('15或18位数字和大写字母X'))
  } else {
    callback()
  }
}
