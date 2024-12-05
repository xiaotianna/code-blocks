// 获取当前具体时间
export const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  return `${year}-${month}-${day} ${hour}:${min < 10 ? '0' + min : min}`
}
