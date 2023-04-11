export function getCamelCase(str) {
  return str.replace(/-([a-z])/g, function (all, i) {
    return i.toUpperCase()
  })
}
