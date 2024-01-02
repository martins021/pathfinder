import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react' 
import Home from '@/app/page'

describe('Home', () => {
  it('renders welcome message and button', () => {
    render(<Home />)
    expect(screen.getByText('Pathfinding Algorithm Visualizer')).toBeInTheDocument()
    expect(screen.getByText('Create a new map')).toBeInTheDocument()
  })
})