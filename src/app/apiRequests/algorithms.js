export const launchDfs = async (data) => {
  const res = await fetch(`http://localhost:3000/api/algorithms/dfs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  const newData = await res.json()

  return newData
} 