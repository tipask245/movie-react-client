export const getTotalPages = (totalCount: number, limit: never): number => {
  return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages: number) => {
  let res: Array<number> = []
  for (let i = 0; i < totalPages; i++){
    res.push(i + 1)
  }
  return res
}