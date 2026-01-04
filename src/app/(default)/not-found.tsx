import type { Metadata } from 'next'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

export const metadata: Metadata = {
  title: 'Cartzilla | Page Not Found',
}

export default function NotFound() {
  return (
    <main className="content-wrapper">
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 py-5">
        <div className="text-center">
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <h2 className="h3 mb-3">Page Not Found</h2>
          <p className="text-muted mb-4">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                <i className="ci-home me-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline-secondary" size="lg">
                <i className="ci-shopping-bag me-2" />
                Browse Shop
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
