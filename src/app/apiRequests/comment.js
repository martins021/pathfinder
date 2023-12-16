export async function postComment(userId, userName, mapId, comment) {
  const res = await fetch(
    `http://localhost:3000/api/comment`, 
    {
      method: "POST",
      body: JSON.stringify({
        userId,
        userName,
        mapId,
        comment
      })
    }
  )
  const resp = await res.json()
  return resp;
}

export async function getComments(mapId, skip) {
  const res = await fetch(
    `http://localhost:3000/api/comment?mapId=${mapId}&skip=${skip}`, 
    {
      method: "GET",
    }
  )
  const resp = await res.json()
  return resp
}