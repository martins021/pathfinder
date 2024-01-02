import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from '@/app/login/page'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signIn } from "next-auth/react";
import { act } from 'react-dom/test-utils';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('next-auth/react');

describe('Login page', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      prefetch: jest.fn(),
      push: jest.fn(),
    })
    usePathname.mockReturnValue('/login')
    useSession.mockReturnValue({
      status: 'unauthenticated',
    })
  })

  it('should render login page (LM-2-T-1)', () => {
    render(<LoginPage />)

    expect(screen.getByRole('heading', { name: "Log in" })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "to publish maps," })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "like published maps," })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "add comments" })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "and more" })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: "E-mail:" })).toBeInTheDocument()
    expect(screen.getByLabelText("Password:")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: "Log in" })).toBeInTheDocument()
  })

  it('should show messages if fields are empty (LM-2-T-2)', async () => {
    render(<LoginPage />);
  
    const loginBtn = screen.getByRole('button', { name: "Log in" });
    loginBtn.click();
  
    const emailErrorMessage = await screen.findByText("Email is required");
    const passwordErrorMessage = await screen.findByText("Password is required");
    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  it('should show message if email is too long (LM-2-T-3)', async () => {
    render(<LoginPage />);
  
    const emailInput = screen.getByRole('textbox', { name: "E-mail:" });
    const loginBtn = screen.getByRole('button', { name: "Log in" });
  
    fireEvent.change(emailInput, { target: { value: "a".repeat(250) + "@gmail.com" } });
    loginBtn.click();
  
    const emailErrorMessage = await screen.findByText("Email is too long");
    expect(emailErrorMessage).toBeInTheDocument();
  });

  it('should call signIn function with correct data  (LM-2-T-4)', async () => {
    signIn.mockReturnValue({ 
      error: "test error"
    });
    render(<LoginPage />);
  
    const emailInput = screen.getByRole('textbox', { name: "E-mail:" });
    const passwordInput = screen.getByLabelText("Password:");
    const loginBtn = screen.getByRole('button', { name: "Log in" });
  
    fireEvent.change(emailInput, { target: { value: "testemail@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    await act(async () => {
      fireEvent.click(loginBtn);
    })

    expect(signIn).toHaveBeenCalledWith("credentials", {
      redirect: false,
      email: "testemail@test.com",
      password: "testpassword"
    });
    expect(signIn).toHaveBeenCalledTimes(1);
    expect(signIn).toHaveReturnedWith({ error: "test error" });
  });
})