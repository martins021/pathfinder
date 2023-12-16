"use client"
import React, { useEffect } from "react";
import Loading from "./loading";
import { Button } from '@chakra-ui/react'
import dayjs from "dayjs"

const CommentSection = ({ fetchComments, comments, loading, totalComments }) => {
  useEffect(() => {
    fetchComments()
  }, [])

  return(
    (loading 
     ? <Loading />
     : 
     <div className="text-customWhite">
      <h1 className="text-xl mt-4 ml-4 mr-4 font-bold">Comments</h1>
      <h1 className="m-4">Showing {comments.length} of {totalComments}</h1>
      <div className="flex flex-col gap-2">
        {comments.map(comment => (
          <div key={comment.id} className="p-2 ml-4">
            <div className="flex gap-2">
              <h2 className="font-bold">{comment.authorName}</h2>
              <p>{dayjs(comment.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      {comments.length !== totalComments && <div className="flex justify-center mb-6">
        <Button className="text-customWhite hover:text-customBlack" onClick={() => fetchComments()}>
          Load more comments
        </Button>
      </div>}
     </div>
    )
  )
}

export default CommentSection;