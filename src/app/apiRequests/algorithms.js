export const launchDfs = async (data, size, start, target) => {
  const res = await fetch(`/api/algorithms/dfs`, {
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

export const launchBfs = async (data, size, start, target) => {
  try {
    const res = await fetch(`/api/algorithms/bfs`, {
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
    
    const newData = res.json()
    return newData
  } catch (error) {
    console.log("Error launching Bfs: ", error);
  }
} 

export const launchDijkstra = async (data, size, start, target) => {
  try {
    const res = await fetch(`/api/algorithms/dijkstra`, {
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

    const newData = res.json()
    return newData
  } catch (error) {
    console.log("Error launching dijkstra: ", error);
  }
}