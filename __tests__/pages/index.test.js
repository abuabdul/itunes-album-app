import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import Home from '@/pages/index'
import store from '@/store/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <Provider store={store} >
        <Home />
      </Provider>
    )

    const heading = screen.getByText('No results Found')

    expect(heading).toBeInTheDocument()
  })
})