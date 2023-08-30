export default function filterItem<T>(list: T[], getFormatDate: (t: T) => string) {
  const result = []
  const date = new Date()
  let e = 0
  let i = 0
  rootLoop: do {
    date.setDate(date.getDate() - Math.pow(2, e++))
    const formatDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    do {
      if (i === list.length) {
        break rootLoop
      }
      const item = list[i]
      const itemFormatDate = getFormatDate(item)
      if (itemFormatDate === formatDate) {
        result.push(item)
      } else if (itemFormatDate < formatDate) {
        break
      }
      i++
    } while (true)
  } while (true)
  return result
}