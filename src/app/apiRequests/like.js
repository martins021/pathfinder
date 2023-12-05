export async function modifyMapLike(id, userId) {
  const res = await fetch(`http://localhost:3000/api/like?id=${id}&userId=${userId}`, {
    method: "POST"
  })
  const data = await res.json()

  return data
}