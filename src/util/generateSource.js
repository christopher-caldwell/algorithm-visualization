
export const createSource = numberOfBars => {
  const output = []
  for(let i = 0; i < numberOfBars; i++){
    output[i] = Math.floor(Math.random() * 100)
  }
  return output
}