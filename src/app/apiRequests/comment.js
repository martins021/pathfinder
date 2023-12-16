export async function postComment(userId, mapId, comment) {
  const res = await fetch(
    `http://localhost:3000/api/comment`, 
    {
      method: "POST",
      body: JSON.stringify({
        userId,
        mapId,
        comment
      })
    }
  )
  const resp = await res.json()
  return resp;
}