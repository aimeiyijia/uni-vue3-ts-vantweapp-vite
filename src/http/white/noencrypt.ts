const { VITE_downloadUrl } = import.meta.env
const whiteList = ['/file/upload', VITE_downloadUrl]
export default whiteList
