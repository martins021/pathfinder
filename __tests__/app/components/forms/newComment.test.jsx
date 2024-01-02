import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import CommentForm from '@/app/components/forms/newComment';

describe('Comment form', () => {
  it('should render comment input form with submit button (KOM-1-T-1)', () => {
    render(<CommentForm />)

    const commentInput = screen.getByTestId("comment-input")
    expect(commentInput).toBeInTheDocument()
    expect(screen.getByRole('button', { name: "Add comment" })).toBeInTheDocument()
  })
  
  it('should not be able to add comment if content is empty (KOM-1-T-2)', () => {
    render(<CommentForm />)

    const commentInput = screen.getByTestId("comment-input")
    fireEvent.change(commentInput, { target: { value: " ".repeat(50) } });

    const addCommentBtn = screen.getByRole('button', { name: "Add comment" })
    expect(addCommentBtn).toBeDisabled()
  })

  it('should be able to add comment if content provided (KOM-1-T-3)', () => {
    render(<CommentForm />)

    const commentInput = screen.getByTestId("comment-input")
    const addCommentBtn = screen.getByRole('button', { name: "Add comment" })

    fireEvent.change(commentInput, { target: { value: "testComment" } });

    expect(addCommentBtn).not.toBeDisabled()
  })
});

