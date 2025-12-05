'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/cart-context'
import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import AccountSidebarShop from '@/components/account/account-sidebar-shop'
import { botbleAPI } from '@/services/api'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Badge from 'react-bootstrap/Badge'
import Image from 'next/image'
import Link from 'next/link'
import CustomFooter from '@/components/layout/custom-footer'

interface WishlistItem {
  id: number
  name: string
  slug: string
  price: number
  price_formatted: string
  sale_price?: number
  sale_price_formatted?: string
  image: string
  images: string[]
  is_out_of_stock: boolean
  stock_quantity: number
  rating: number
  reviews_count: number
  rowId: string
}

interface WishlistResponse {
  success: boolean
  data: {
    id: string
    count: number
    items: WishlistItem[]
  }
  message?: string
}

const AccountWishlistPage = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const { addToCart } = useCart('electronics')
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [wishlistId, setWishlistId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set())
  const [addingToCart, setAddingToCart] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/account')
      return
    }

    if (isAuthenticated) {
      fetchWishlist()
    }
  }, [isAuthenticated, authLoading, router])

  const fetchWishlist = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await botbleAPI.getWishlist()

      if (response.success && response.data) {
        setWishlistItems(response.data.items || [])
        setWishlistId(response.data.id || '')
      } else {
        setError(response.message || 'Failed to fetch wishlist')
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err)
      setError('Failed to load wishlist. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromWishlist = async (itemId: number) => {
    try {
      setRemovingItems((prev) => new Set(prev).add(itemId))

      const response = await botbleAPI.removeFromWishlist(itemId)

      if (response.success) {
        setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
      } else {
        setError(response.message || 'Failed to remove item from wishlist')
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err)
      setError('Failed to remove item. Please try again.')
    } finally {
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const handleAddToCart = async (product: WishlistItem) => {
    try {
      setAddingToCart((prev) => new Set(prev).add(product.id))

      await addToCart(product)

      // Optionally remove from wishlist after adding to cart
      const wishlistItem = wishlistItems.find((item) => item.id === product.id)
      if (wishlistItem) {
        await handleRemoveFromWishlist(wishlistItem.id)
      }
    } catch (err) {
      console.error('Error adding to cart:', err)
      setError('Failed to add item to cart. Please try again.')
    } finally {
      setAddingToCart((prev) => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="ci-star-filled text-warning"></i>)
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="ci-star-half text-warning"></i>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ci-star text-muted"></i>)
    }

    return stars
  }

  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <>
      <HeaderElectronics
        isLoggedIn={{
          name: user?.name || 'User',
          href: '/account/shop',
        }}
      />

      <main className="content-wrapper">
        <Container className="py-5 mt-n2 mt-sm-0">
          <Row className="pt-md-2 pt-lg-3 pb-sm-2 pb-md-3 pb-lg-4 pb-xl-5">
            {/* Sidebar */}
            <Col as="aside" lg={3}>
              <AccountSidebarShop name={user?.name || 'User'} />
            </Col>

            {/* Main content */}
            <Col lg={9}>
              <div className="ps-lg-3 ps-xl-0">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h1 className="h2 mb-0">My Wishlist</h1>
                  <Badge bg="primary" className="fs-sm">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
                  </Badge>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <Alert.Heading>Error</Alert.Heading>
                    <p className="mb-0">{error}</p>
                    <hr />
                    <Button variant="outline-danger" size="sm" onClick={fetchWishlist}>
                      Try Again
                    </Button>
                  </Alert>
                )}

                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Loading your wishlist...</p>
                  </div>
                ) : wishlistItems.length === 0 ? (
                  <Card className="text-center py-5">
                    <Card.Body>
                      <div className="mb-4">
                        <i className="ci-heart display-4 text-muted"></i>
                      </div>
                      <h5>Your wishlist is empty</h5>
                      <p className="text-muted mb-4">
                        Save items you love to your wishlist and never lose track of them.
                      </p>
                      <Button as="a" href="/shop/electronics" variant="primary">
                        Start Shopping
                      </Button>
                    </Card.Body>
                  </Card>
                ) : (
                  <Row className="g-4">
                    {wishlistItems.map((item) => (
                      <Col key={item.id} md={6} lg={4}>
                        <Card className="h-100">
                          <div className="position-relative">
                            <a href={`/shop/electronics/${item.slug}`}>
                              <Image
                                src={item.image || '/img/shop/electronics/placeholder.png'}
                                alt={item.name}
                                width={300}
                                height={200}
                                className="card-img-top"
                                style={{ objectFit: 'cover', height: '200px' }}
                              />
                            </a>

                            {item.sale_price && (
                              <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                                Sale
                              </Badge>
                            )}

                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="position-absolute top-0 end-0 m-2"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                              disabled={removingItems.has(item.id)}
                            >
                              {removingItems.has(item.id) ? (
                                <Spinner animation="border" size="sm" />
                              ) : (
                                <i className="ci-trash"></i>
                              )}
                            </Button>
                          </div>

                          <Card.Body className="d-flex flex-column">
                            <h6 className="mb-2">
                              <a href={`/shop/electronics/${item.slug}`} className="text-decoration-none text-dark">
                                {item.name}
                              </a>
                            </h6>

                            <div className="mb-2">
                              <div className="d-flex align-items-center mb-1">
                                <div className="me-2">{renderStars(item.rating)}</div>
                                <small className="text-muted">({item.reviews_count})</small>
                              </div>
                            </div>

                            <div className="mb-3">
                              {item.sale_price ? (
                                <div>
                                  <span className="h6 text-danger me-2">{item.sale_price_formatted}</span>
                                  <span className="text-muted text-decoration-line-through">
                                    {item.price_formatted}
                                  </span>
                                </div>
                              ) : (
                                <span className="h6">{item.price_formatted}</span>
                              )}
                            </div>

                            <div className="mt-auto">
                              {item.is_out_of_stock ? (
                                <Button variant="outline-secondary" disabled className="w-100">
                                  Out of Stock
                                </Button>
                              ) : (
                                <Button
                                  variant="primary"
                                  className="w-100"
                                  onClick={() => handleAddToCart(item)}
                                  disabled={addingToCart.has(item.id)}
                                >
                                  {addingToCart.has(item.id) ? (
                                    <>
                                      <Spinner animation="border" size="sm" className="me-2" />
                                      Adding...
                                    </>
                                  ) : (
                                    <>
                                      <i className="ci-shopping-cart me-2"></i>
                                      Add to Cart
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      {/* <FooterElectronics className="border-top" /> */}
      <CustomFooter />
    </>
  )
}

export default AccountWishlistPage
