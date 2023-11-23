export default function filterItem<T>(list: T[], getFormatDate: (t: T) => string) {
  const result = []
  const date = new Date('2023-11-22')
  let e = 0
  let i = 0
  rootLoop: do {
    const formatDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    console.log(formatDate)
    do {
      if (i === list.length) {
        break rootLoop
      }
      const item = list[i]
      const itemFormatDate = getFormatDate(item)
      if (itemFormatDate === formatDate) {
        result.unshift(item)
      } else if (itemFormatDate < formatDate) {
        break
      }
      i++
    } while (true)
    date.setDate(date.getDate() - Math.pow(2, e++))
  } while (true)
  return result
}