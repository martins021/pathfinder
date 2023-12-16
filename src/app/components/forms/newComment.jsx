"use client"
import React, { useState } from "react";
import { Input, Button } from '@chakra-ui/react'
import { useForm } from "react-hook-form"
import { postComment } from "@/app/apiRequests/comment";
import { useToast } from '@chakra-ui/react'

const CommentForm = ({ mapId, userId }) => {
  const [comment, setComment] = useState("");
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const submitComment = async ({ comment }) => {
    const resp = await postComment(userId, mapId, comment)
    
    if(resp.error){
      toast({
        description: resp.error,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    } else {
      toast({
        description: "Comment added successfully",
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
    }
  }

  return(
    <div className="flex justify-between m-2 mr-6 text-customWhite">
      <form
        onSubmit={handleSubmit(submitComment)}
        className="flex gap-4"
      >
        <Input 
          { ...register("comment") }
          placeholder="Comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <Input 
          disabled={!comment}
          type="submit" 
          value={"Add comment"} 
          style={{ 
            width: 200, 
            cursor: !comment ? "not-allowed" : "pointer" 
          }} 
        />
      </form>
      <Button
        className="border-2 border-customWhite text-customWhite rounded-md cursor-pointer hover:text-customBlack transition-all duration-200"
      >
        Comments
      </Button>
    </div>
  )
}

export default CommentForm;