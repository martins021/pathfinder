import '@testing-library/jest-dom'
import React, { useState } from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import { act } from 'react-dom/test-utils';
import Map from '@/app/components/map/map';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('next-auth/react');

describe('Map component', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      prefetch: jest.fn(),
      replace: jest.fn(),
    })
    usePathname.mockReturnValue('/maps')
    useSearchParams.mockReturnValue({
      toString: jest.fn(),
    })
    useSession.mockReturnValue({
      status: 'unauthenticated',
    })
  });

  const MockPlaygroundComponent = ({ 
    tool = "start", 
    renderWalls = false, 
    mapSize={ x: 40, y: 23 } 
  }) => {
    const data = []
    for (let y = 0; y < mapSize.y; y++) {
      for (let x = 0; x < mapSize.x; x++) {
        data.push({ x, y, state: renderWalls ? "wall" : "empty", prevState: "empty", elev: 1 })
      }
    }
    const [mapData, setMapData] = useState(data); // Set initial data
    const [start, setStart] = useState(null); // start node
    const [target, setTarget] = useState(null); // target node  

    return <Map 
      tool={tool}  
      mapData={mapData}
      result={{}}
      mapSize={mapSize}
      brushSize={3}
      brushMode={1}
      animationSpeed={0.03}
      animate={false}
      animationId={{ current: 0 }}
      setMapData={setMapData}
      setAnimate={jest.fn()}
      setStart={setStart}
      setTarget={setTarget}
    />;
  };
  

  it('should render map component with all nodes with size 5 (KAM-1-T-1)', () => {
    render(<MockPlaygroundComponent mapSize={{ x: 40, y: 23 }} />)

    const grid = screen.getByTestId('map-grid')
    const gridItems = screen.getAllByTestId('map-node')

    gridItems.forEach(item => {
      expect(item).toHaveClass('cell empty')
    })
    expect(grid).toBeInTheDocument()
    expect(gridItems.length).toBe(920)
  })

  it('should render map component with all nodes with size 1 (KAM-1-T-2)', () => {
    render(<MockPlaygroundComponent mapSize={{ x: 20, y: 11 }} />)

    const grid = screen.getByTestId('map-grid')
    const gridItems = screen.getAllByTestId('map-node')

    gridItems.forEach(item => {
      expect(item).toHaveClass('cell empty')
    })
    expect(grid).toBeInTheDocument()
    expect(gridItems.length).toBe(220)
  })

  it('should render map component with all nodes with size 9 (KAM-1-T-3)', () => {
    render(<MockPlaygroundComponent mapSize={{ x: 60, y: 34 }} />)

    const grid = screen.getByTestId('map-grid')
    const gridItems = screen.getAllByTestId('map-node')

    gridItems.forEach(item => {
      expect(item).toHaveClass('cell empty')
    })
    expect(grid).toBeInTheDocument()
    expect(gridItems.length).toBe(2040)
  })

  it('should turn empty node to wall node on click (KAM-1-T-4)', () => {

    render(<MockPlaygroundComponent tool={"wall"} />)

    const gridItems = screen.getAllByTestId('map-node')
    const node = gridItems[0]

    fireEvent.click(node)
    expect(node).toHaveClass('cell wall')
  })

  it('should turn empty node to start node on click (KAM-1-T-5)', () => {

    render(<MockPlaygroundComponent tool={"start"}/>)

    const gridItems = screen.getAllByTestId('map-node')
    const node = gridItems[0]

    fireEvent.click(node)
    expect(node).toHaveClass('cell start')
  })

  it('should not change wall node to start (KAM-1-T-6)', () => {

    render(<MockPlaygroundComponent tool={"start"} renderWalls/>)

    const gridItems = screen.getAllByTestId('map-node')
    const node = gridItems[0]

    fireEvent.click(node)
    expect(node).toHaveClass('cell wall')
  })

  it('should apply terrain to nodes (KAM-1-T-7)', () => {
    render(<MockPlaygroundComponent tool={"terrain"}/>)
      
    const gridItems = screen.getAllByTestId('map-node')
    const node = gridItems[0]

    fireEvent.click(node)
    expect(gridItems[0]).toHaveStyle('background-color: rgb(219, 232, 215);')
    expect(gridItems[1]).toHaveStyle('background-color: rgb(221, 231, 218);')
    expect(gridItems[2]).toHaveStyle('background-color: rgb(224, 231, 222);')
    expect(gridItems[3]).toHaveStyle('background-color: rgb(227, 230, 225);')
  })
});
