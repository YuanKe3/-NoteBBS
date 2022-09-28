export const formatDate = (date) => {
  const resArr = []
  date.split('-').forEach((item, index) => {
    if (index !== 2) resArr.push(item)
    if (index === 2) {
      const matchStr = item.match(/(.+)T.+$/i)
      resArr.push(matchStr[1])
    }
  })
  return resArr.join('-')
}
