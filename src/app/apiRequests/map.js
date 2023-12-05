export async function fetchMap(id) {
  const res = await fetch(`http://localhost:3000/api/map?id=${id}`)
  const data = await res.json()

  return data
}