export const nandlReg = /^[a-z0-9A-Z]+$/ // 数字和字母
export const chineseReg = /^[\u4e00-\u9fa5]{0,}$/ // 中文，不允许有特殊符号
export const nameReg = /^[\u4e00-\u9fa5]+\·[\u4e00-\u9fa5]+$|^[\u4e00-\u9fa5]{0,}$/ // 中文，允许有特殊符号·
export const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/ // 密码，8~16位，且包含数字、大写字母、小写字母
export const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/ // 身份证号码
export const phoneReg = /^1\d{10}$/ // 手机号码
export const telephoneReg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/ //座机正则
export const phoneCodeReg = /\d{6}$/ // 手机号码验证码
export const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ //邮箱格式校验
export const postalCodeReg = /^[0-9]{6}$/ // 邮政编码
export const positiveIntegerReg = /^$|^[1-9]\d*$/ // 大于0的整数
export const notNegativeReg = /^0$|^[1-9]\d*$/ // 大于等于0的整数
export const numberReg = /^\d*$/ // 数字类型
export const tyshxymReg = /^[a-zA-Z0-9]{1,18}$/ // 统一社会信用码
export const smsCodeReg = /^\d{6}$/ // 短信验证码，6位数字
export const personNameReg = /^[\u4e00-\u9fa5]+\·[\u4e00-\u9fa5]+$|^[\u4e00-\u9fa5]{0,}$/ // 中文，允许有特殊符号·
export const yzbmReg = /^[0-9]{6}$/ // 邮政编码正则
export const creditCodeReg = /^[a-zA-Z0-9]{1,18}$/ // 统一社会信用码
export const numberTypeReg = /^\d*$/ // 数字类型
export const accountReg = /^[0-9-]+$/ // 银行账户（数字 和 -）
export const alphanumericReg = /^[0-9a-zA-Z]*$/ // 字母、数字或字母数字组合
export const numberOrFloatReg = /^\d+(\.\d{1,2})?$/
export const capitalConReg =
  /^0(\.0{1,2}){0,1}$|^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,11}(\.\d{1,2}){0,1}$/ // 出资人管理  出资额
export const capitalProportionReg =
  /^0(\.0{1,2}){0,1}$|^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/ // 出资人管理  出资占比
export const spaceReg = /\s/g // 空格
export const userNameReg = /^[\u4e00-\u9fa5|a-zA-Z0-9]+$/ // 中文、字母、数字
export const spaceAroundReg = /^\s*|\s*$/g // 左右空格
export const IPReg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/ // IP地址格式
export const guangdongfydmReg = /^44[0-9]*/ // 广东法院代码
export const luzhoufydmReg = /^5105[0-9]*/ // 泸州法院代码
export const percentageReg = /^[0-9]{1,2}$/ // 百分比(0-99数字)
