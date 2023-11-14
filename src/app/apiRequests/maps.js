const baseUrl = process.env.BASE_URL

export async function fetchMaps() {
  const res = await fetch(`http://localhost:3000/api/maps`)
  const data = await res.json()

  return data.data
}

export async function saveMap(data) {
  console.log("SAve map receives data: ", data);
  const res = await fetch(`http://localhost:3000/api/maps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  console.log({ res });
  const newData = await res.json()
  console.log({ newData });
  return newData
}