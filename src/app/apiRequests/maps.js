export async function fetchMaps() {
  const res = await fetch(`http://localhost:3000/api/maps`)
  const data = await res.json()

  return data.data
}

export async function saveMap(data) {
  const res = await fetch(`http://localhost:3000/api/maps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  const newData = await res.json()

  return newData
}