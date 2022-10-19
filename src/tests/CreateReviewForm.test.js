import { render, screen } from '@testing-library/react'
import CreateReviewForm from '../components/CreateReviewForm'

test('CreateReviewForm test', () => {
  render(<CreateReviewForm/>)
  const listElement = screen.getByText(/написать рецензию/i)
  expect(listElement).toBeInTheDocument()
})