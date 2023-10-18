export const launchDfs = async (data, size, start, target) => {
  const res = await fetch(`http://localhost:3000/api/algorithms/dfs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      data, 
      size, 
      start, 
      target 
    })
  })

  const newData = await res.json()

  return newData
} 