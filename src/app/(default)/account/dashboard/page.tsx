'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

import { botbleAPI } from '@/services/api'
import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import AccountSidebarDashboard from '@/components/account/account-sidebar-dashboard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Link from 'next/link'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import CustomFooter from '@/components/layout/custom-footer'

interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalSpent: number
  wishlistItems: number
}

interface RecentOrder {
  id: number
  code: string
  status: string
  amount: number
  created_at: string
  payment_method?: string
}

interface Review {
  id: number
  product_name: string
  rating: number
  comment: string
  created_at: string
}

interface Address {
  id: number
  name: string
  address: string
  city: string
  state: string
  country: string
  zip_code: string
  is_default: boolean
}

type DashboardView =
  | 'dashboard'
  | 'orders'
  | 'wishlist'
  | 'payment'
  | 'reviews'
  | 'info'
  | 'addresses'
  | 'notifications'

const AccountDashboardPage = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [currentView, setCurrentView] = useState<DashboardView>('dashboard')
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
    wishlistItems: 0,
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Address form state
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [addressFormData, setAddressFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    is_default: false,
  })

  useEffect(() => {
    document.title = 'Cartzilla | Account Dashboard'
  }, [])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/account')
      return
    }

    if (isAuthenticated) {
      console.log('Dashboard: User authenticated:', { isAuthenticated, user })
      fetchDashboardData()
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchViewData()
    }
  }, [currentView, isAuthenticated])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Dashboard: Starting to fetch data...')

      const authToken = localStorage.getItem('auth_token')
      console.log('Dashboard: Auth token exists:', !!authToken)

      const ordersResponse = await botbleAPI.getOrders({ per_page: 10 })
      console.log('Dashboard: Orders response:', ordersResponse)

      if (ordersResponse.success && ordersResponse.data) {
        const orders = ordersResponse.data.data || ordersResponse.data || []
        console.log('Dashboard: Orders data:', orders)

        const totalOrders = orders.length
        const pendingOrders = orders.filter((order: any) => order.status === 'pending').length
        const completedOrders = orders.filter((order: any) => order.status === 'completed').length
        const totalSpent = orders.reduce((sum: number, order: any) => sum + parseFloat(order.amount || 0), 0)

        setStats({
          totalOrders,
          pendingOrders,
          completedOrders,
          totalSpent,
          wishlistItems: 0,
        })

        const recentOrdersData = orders.slice(0, 5)
        setRecentOrders(recentOrdersData)
      } else {
        console.warn('Orders fetch failed:', ordersResponse.message)
        setStats({
          totalOrders: 0,
          pendingOrders: 0,
          completedOrders: 0,
          totalSpent: 0,
          wishlistItems: 0,
        })
        setRecentOrders([])
      }

      try {
        const wishlistResponse = await botbleAPI.getWishlist()
        console.log('Dashboard: Wishlist response:', wishlistResponse)
        if (wishlistResponse.success && wishlistResponse.data) {
          const wishlistItems = wishlistResponse.data.items?.length || 0
          setStats((prev) => ({ ...prev, wishlistItems }))
        }
      } catch (wishlistError) {
        console.log('Wishlist fetch failed:', wishlistError)
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchViewData = async () => {
    try {
      setLoading(true)
      setError(null)

      switch (currentView) {
        case 'reviews':
          await fetchReviews()
          break
        case 'addresses':
          await fetchAddresses()
          break
        case 'orders':
          await fetchOrders()
          break
        case 'wishlist':
          await fetchWishlist()
          break
        default:
          break
      }
    } catch (err) {
      console.error('Error fetching view data:', err)
      setError('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      // Mock reviews data - replace with actual API call
      const mockReviews: Review[] = [
        {
          id: 1,
          product_name: 'Wireless Headphones',
          rating: 5,
          comment: 'Great sound quality and comfortable to wear!',
          created_at: '2024-01-15T10:30:00Z',
        },
        {
          id: 2,
          product_name: 'Smart Watch',
          rating: 4,
          comment: 'Good features but battery life could be better.',
          created_at: '2024-01-10T14:20:00Z',
        },
      ]
      setReviews(mockReviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setError('Failed to load reviews.')
    }
  }

  const fetchAddresses = async () => {
    try {
      // Mock addresses data - replace with actual API call
      const mockAddresses: Address[] = [
        {
          id: 1,
          name: 'Home',
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zip_code: '10001',
          is_default: true,
        },
        {
          id: 2,
          name: 'Office',
          address: '456 Business Ave',
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA',
          zip_code: '90210',
          is_default: false,
        },
      ]
      setAddresses(mockAddresses)
    } catch (error) {
      console.error('Error fetching addresses:', error)
      setError('Failed to load addresses.')
    }
  }

  const fetchOrders = async () => {
    try {
      const ordersResponse = await botbleAPI.getOrders({ per_page: 20 })
      if (ordersResponse.success && ordersResponse.data) {
        const orders = ordersResponse.data.data || ordersResponse.data || []
        setRecentOrders(orders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      setError('Failed to load orders.')
    }
  }

  const fetchWishlist = async () => {
    try {
      const wishlistResponse = await botbleAPI.getWishlist()
      if (wishlistResponse.success && wishlistResponse.data) {
        // Handle wishlist data
        console.log('Wishlist data:', wishlistResponse.data)
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error)
      setError('Failed to load wishlist.')
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'processing':
        return 'info'
      case 'shipped':
        return 'primary'
      case 'delivered':
      case 'completed':
        return 'success'
      case 'cancelled':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const renderDashboardView = () => (
    <>
      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        <Col sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div
                className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: '3rem', height: '3rem' }}
              >
                <i className="ci-shopping-bag text-primary fs-5"></i>
              </div>
              <h3 className="h4 mb-1">{stats.totalOrders}</h3>
              <p className="text-muted mb-0">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div
                className="bg-warning-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: '3rem', height: '3rem' }}
              >
                <i className="ci-time text-warning fs-5"></i>
              </div>
              <h3 className="h4 mb-1">{stats.pendingOrders}</h3>
              <p className="text-muted mb-0">Pending Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div
                className="bg-success-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: '3rem', height: '3rem' }}
              >
                <i className="ci-check-circle text-success fs-5"></i>
              </div>
              <h3 className="h4 mb-1">{stats.completedOrders}</h3>
              <p className="text-muted mb-0">Completed</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <div
                className="bg-info-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: '3rem', height: '3rem' }}
              >
                <i className="ci-heart text-info fs-5"></i>
              </div>
              <h3 className="h4 mb-1">{stats.wishlistItems}</h3>
              <p className="text-muted mb-0">Wishlist Items</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Recent Orders */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">
                  <i className="ci-package me-2"></i>
                  Recent Orders
                </h5>
                <Button variant="outline-primary" size="sm" onClick={() => setCurrentView('orders')}>
                  View All
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {recentOrders.length > 0 ? (
                <div className="table-responsive">
                  <Table className="table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <a href="#" className="text-decoration-none">
                              #{order.code}
                            </a>
                          </td>
                          <td>{formatDate(order.created_at)}</td>
                          <td>
                            <Badge bg={getStatusVariant(order.status)}>{order.status}</Badge>
                          </td>
                          <td>{formatCurrency(order.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="ci-package display-4 text-muted"></i>
                  <h5 className="mt-3">No orders yet</h5>
                  <p className="text-muted">Start shopping to see your orders here.</p>
                  <Button variant="primary" href="/shop">
                    Start Shopping
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">
                <i className="ci-lightning me-2"></i>
                Quick Actions
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-danger" onClick={() => setCurrentView('orders')}>
                  View All Orders
                </Button>
                <Button variant="outline-danger" onClick={() => setCurrentView('wishlist')}>
                  My Wishlist
                </Button>
                <Button variant="outline-danger" onClick={() => setCurrentView('addresses')}>
                  Manage Addresses
                </Button>
                <Button variant="outline-danger" onClick={() => setCurrentView('info')}>
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )

  const renderOrdersView = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light">
        <h5 className="mb-0">
          <i className="ci-package me-2"></i>
          My Orders
        </h5>
      </Card.Header>
      <Card.Body>
        {recentOrders.length > 0 ? (
          <div className="table-responsive">
            <Table className="table-hover mb-0">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <a href="#" className="text-decoration-none">
                        #{order.code}
                      </a>
                    </td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>
                      <Badge bg={getStatusVariant(order.status)}>{order.status}</Badge>
                    </td>
                    <td>{formatCurrency(order.amount)}</td>
                    <td>
                      <Button variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="ci-package display-4 text-muted"></i>
            <h5 className="mt-3">No orders yet</h5>
            <p className="text-muted">Start shopping to see your orders here.</p>
            <Button variant="primary" href="/shop">
              Start Shopping
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )

  const renderReviewsView = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light">
        <h5 className="mb-0">
          <i className="ci-star me-2"></i>
          My Reviews
        </h5>
      </Card.Header>
      <Card.Body>
        {reviews.length > 0 ? (
          <div>
            {reviews.map((review) => (
              <div key={review.id} className="border-bottom pb-3 mb-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-1">{review.product_name}</h6>
                    <div className="mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`ci-star${i < review.rating ? '-filled' : ''} text-warning`} />
                      ))}
                    </div>
                    <p className="text-muted mb-1">{review.comment}</p>
                    <small className="text-muted">{formatDate(review.created_at)}</small>
                  </div>
                  <Button variant="outline-primary" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="ci-star display-4 text-muted"></i>
            <h5 className="mt-3">No reviews yet</h5>
            <p className="text-muted">Start shopping and leave reviews for products you've purchased.</p>
            <Button variant="primary" href="/shop">
              Start Shopping
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )

  const renderAddressesView = () => {
    const handleAddAddress = () => {
      // Mock add functionality - replace with actual API call
      const newAddress: Address = {
        id: Date.now(),
        ...addressFormData,
      }
      setAddresses([...addresses, newAddress])
      setShowAddForm(false)
      setAddressFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
        is_default: false,
      })
    }

    const handleEditAddress = (address: Address) => {
      setEditingAddress(address)
      setAddressFormData({
        name: address.name,
        address: address.address,
        city: address.city,
        state: address.state,
        country: address.country,
        zip_code: address.zip_code,
        is_default: address.is_default,
      })
    }

    const handleUpdateAddress = () => {
      if (editingAddress) {
        // Mock update functionality - replace with actual API call
        setAddresses(addresses.map((addr) => (addr.id === editingAddress.id ? { ...addr, ...addressFormData } : addr)))
        setEditingAddress(null)
        setAddressFormData({
          name: '',
          address: '',
          city: '',
          state: '',
          country: '',
          zip_code: '',
          is_default: false,
        })
      }
    }

    const handleDeleteAddress = (addressId: number) => {
      // Mock delete functionality - replace with actual API call
      setAddresses(addresses.filter((addr) => addr.id !== addressId))
    }

    return (
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="ci-map-pin me-2"></i>
              My Addresses
            </h5>
            <Button variant="primary" size="sm" onClick={() => setShowAddForm(true)}>
              Add New Address
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {showAddForm && (
            <Card className="mb-4 border-primary">
              <Card.Header className="bg-primary text-white">
                <h6 className="mb-0">Add New Address</h6>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Address Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.name}
                          onChange={(e) => setAddressFormData({ ...addressFormData, name: e.target.value })}
                          placeholder="e.g., Home, Office"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.address}
                          onChange={(e) => setAddressFormData({ ...addressFormData, address: e.target.value })}
                          placeholder="123 Main Street"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.city}
                          onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.state}
                          onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>ZIP Code</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.zip_code}
                          onChange={(e) => setAddressFormData({ ...addressFormData, zip_code: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      value={addressFormData.country}
                      onChange={(e) => setAddressFormData({ ...addressFormData, country: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Set as default address"
                      checked={addressFormData.is_default}
                      onChange={(e) => setAddressFormData({ ...addressFormData, is_default: e.target.checked })}
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button variant="primary" onClick={handleAddAddress}>
                      Save Address
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setShowAddForm(false)
                        setAddressFormData({
                          name: '',
                          address: '',
                          city: '',
                          state: '',
                          country: '',
                          zip_code: '',
                          is_default: false,
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}

          {editingAddress && (
            <Card className="mb-4 border-warning">
              <Card.Header className="bg-warning text-white">
                <h6 className="mb-0">Edit Address</h6>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Address Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.name}
                          onChange={(e) => setAddressFormData({ ...addressFormData, name: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.address}
                          onChange={(e) => setAddressFormData({ ...addressFormData, address: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.city}
                          onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.state}
                          onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>ZIP Code</Form.Label>
                        <Form.Control
                          type="text"
                          value={addressFormData.zip_code}
                          onChange={(e) => setAddressFormData({ ...addressFormData, zip_code: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      value={addressFormData.country}
                      onChange={(e) => setAddressFormData({ ...addressFormData, country: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Set as default address"
                      checked={addressFormData.is_default}
                      onChange={(e) => setAddressFormData({ ...addressFormData, is_default: e.target.checked })}
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button variant="warning" onClick={handleUpdateAddress}>
                      Update Address
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setEditingAddress(null)
                        setAddressFormData({
                          name: '',
                          address: '',
                          city: '',
                          state: '',
                          country: '',
                          zip_code: '',
                          is_default: false,
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}

          {addresses.length > 0 ? (
            <Row>
              {addresses.map((address) => (
                <Col md={6} key={address.id} className="mb-3">
                  <Card className="h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-0">{address.name}</h6>
                        {address.is_default && <Badge bg="success">Default</Badge>}
                      </div>
                      <p className="text-muted mb-2">
                        {address.address}
                        <br />
                        {address.city}, {address.state} {address.zip_code}
                        <br />
                        {address.country}
                      </p>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => handleEditAddress(address)}>
                          Edit
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteAddress(address.id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-4">
              <i className="ci-map-pin display-4 text-muted"></i>
              <h5 className="mt-3">No addresses yet</h5>
              <p className="text-muted">Add your shipping addresses for faster checkout.</p>
              <Button variant="primary" onClick={() => setShowAddForm(true)}>
                Add New Address
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    )
  }

  const renderWishlistView = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light">
        <h5 className="mb-0">
          <i className="ci-heart me-2"></i>
          My Wishlist
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="text-center py-4">
          <i className="ci-heart display-4 text-muted"></i>
          <h5 className="mt-3">Your wishlist is empty</h5>
          <p className="text-muted">Start adding products to your wishlist.</p>
          <Button variant="primary" href="/shop">
            Start Shopping
          </Button>
        </div>
      </Card.Body>
    </Card>
  )

  const renderPaymentView = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="ci-credit-card me-2"></i>
            Payment Methods
          </h5>
          <Button variant="primary" size="sm">
            Add New Card
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="text-center py-4">
          <i className="ci-credit-card display-4 text-muted"></i>
          <h5 className="mt-3">No payment methods yet</h5>
          <p className="text-muted">Add your payment methods for faster checkout.</p>
          <Button variant="primary">Add New Card</Button>
        </div>
      </Card.Body>
    </Card>
  )

  const renderNotificationsView = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light">
        <h5 className="mb-0">
          <i className="ci-bell me-2"></i>
          Notifications
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="text-center py-4">
          <i className="ci-bell display-4 text-muted"></i>
          <h5 className="mt-3">No notifications yet</h5>
          <p className="text-muted">You'll see your notifications here.</p>
        </div>
      </Card.Body>
    </Card>
  )

  const renderInfoView = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-light">
        <h5 className="mb-0">
          <i className="ci-user me-2"></i>
          Personal Information
        </h5>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" defaultValue={user?.name?.split(' ')[0] || ''} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" defaultValue={user?.name?.split(' ')[1] || ''} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" defaultValue={user?.email || ''} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" defaultValue={user?.phone || ''} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboardView()
      case 'orders':
        return renderOrdersView()
      case 'reviews':
        return renderReviewsView()
      case 'addresses':
        return renderAddressesView()
      case 'wishlist':
        return renderWishlistView()
      case 'info':
        return renderInfoView()
      case 'payment':
        return renderPaymentView()
      case 'notifications':
        return renderNotificationsView()
      default:
        return renderDashboardView()
    }
  }

  // Show loading state while checking authentication
  if (authLoading) {
    console.log('Dashboard: Auth loading...', { authLoading, isAuthenticated, user })
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading account...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    console.log('Dashboard: Not authenticated, redirecting...', { isAuthenticated, user })
    if (!isAuthenticated) {
      router.push('/account')
    }
    return null // Will redirect to login
  }

  console.log('Dashboard: Rendering dashboard for user:', user)

  return (
    <>
      <HeaderElectronics
        isLoggedIn={{
          name: user.name || user.email || 'User',
          href: '/account/dashboard',
        }}
      />

      <main className="content-wrapper">
        <Container className="py-5 mt-n2 mt-sm-0">
          <Row className="pt-md-2 pt-lg-3 pb-sm-2 pb-md-3 pb-lg-4 pb-xl-5">
            {/* Sidebar */}
            <Col as="aside" lg={3}>
              <AccountSidebarDashboard
                name={user.name || user.email || 'User'}
                currentView={currentView}
                onViewChange={setCurrentView}
              />
            </Col>

            {/* Main content */}
            <Col lg={9}>
              <div className="ps-lg-3 ps-xl-0">
                {/* Welcome section */}
                <div className="mb-4">
                  <h1 className="h2 mb-2">Welcome back, {user.name || user.email || 'User'}!</h1>
                  <p className="text-muted mb-0">Here's what's happening with your account today.</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <Alert.Heading>Error</Alert.Heading>
                    <p className="mb-0">{error}</p>
                    <hr />
                    <Button variant="outline-danger" size="sm" onClick={fetchDashboardData}>
                      Try Again
                    </Button>
                  </Alert>
                )}

                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Loading...</p>
                  </div>
                ) : (
                  renderCurrentView()
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      {/* <FooterElectronics /> */}
      <CustomFooter />
    </>
  )
}

export default AccountDashboardPage
