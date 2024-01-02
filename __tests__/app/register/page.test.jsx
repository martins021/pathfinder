import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signIn } from "next-auth/react";
import { act } from 'react-dom/test-utils';
import RegisterPage from '@/app/register/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('next-auth/react');

describe('Register page', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      prefetch: jest.fn(),
      push: jest.fn(),
    })
    usePathname.mockReturnValue('/register')
    useSession.mockReturnValue({
      status: 'unauthenticated',
    })
  })

  it('should render register page (LM-1-T-1)', () => {
    render(<RegisterPage />)

    expect(screen.getByRole('heading', { name: "Register" })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "to publish maps," })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "like published maps," })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "add comments" })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "and more" })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: "Username:" })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: "E-mail:" })).toBeInTheDocument()
    expect(screen.getByLabelText("Password:")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: "Register" })).toBeInTheDocument()
  });

  it('should show messages if fields are empty (LM-1-T-2)', async () => {
    render(<RegisterPage />);
  
    const registerBtn = screen.getByRole('button', { name: "Register" });
    registerBtn.click();
  
    const usernameErrorMessage = await screen.findByText("Username is required");
    const emailErrorMessage = await screen.findByText("Email is required");
    const passwordErrorMessage = await screen.findByText("Password is required");
    expect(usernameErrorMessage).toBeInTheDocument();
    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  it('should show message if email is too long (LM-1-T-3)', async () => {
    render(<RegisterPage />);
  
    const emailInput = screen.getByRole('textbox', { name: "E-mail:" });
    const registerBtn = screen.getByRole('button', { name: "Register" });
    
    fireEvent.change(emailInput, { target: { value: "a".repeat(250) + "@gmail.com" } });
    registerBtn.click();
  
    const emailErrorMessage = await screen.findByText("Email is too long");
    expect(emailErrorMessage).toBeInTheDocument();
  });

  it('should show message if username is too long (LM-1-T-4)', async () => {
    render(<RegisterPage />);
  
    const usernameInput = screen.getByRole('textbox', { name: "Username:" });
    const registerBtn = screen.getByRole('button', { name: "Register" });
    
    fireEvent.change(usernameInput, { target: { value: "b".repeat(260) } });
    registerBtn.click();
  
    const usernameErrorMessage = await screen.findByText("Username is too long");
    expect(usernameErrorMessage).toBeInTheDocument();
  });
})