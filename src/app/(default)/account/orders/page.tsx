'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import AccountSidebarShop from '@/components/account/account-sidebar-shop'
import { botbleAPI } from '@/services/api'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Link from 'next/link'
import CustomFooter from '@/components/layout/custom-footer'

interface Order {
  id: number
  code: string
  status: string
  status_html: string
  created_at: string
  amount: number
  amount_formatted: string
  payment_method?: string
  payment_status?: string
  shipping_status?: string
  products_count?: number
}

interface OrdersResponse {
  success: boolean
  data: {
    data: Order[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  message?: string
}

const AccountOrdersPage = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalOrders, setTotalOrders] = useState(0)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/account')
      return
    }

    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated, authLoading, router, currentPage])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await botbleAPI.getOrders({
        per_page: 10,
      })

      if (response.success && response.data) {
        setOrders(response.data.data || [])
        setCurrentPage(response.data.current_page || 1)
        setTotalPages(response.data.last_page || 1)
        setTotalOrders(response.data.total || 0)
      } else {
        setError(response.message || 'Failed to fetch orders')
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError('Failed to load orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page)
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
      hour: '2-digit',
      minute: '2-digit',
    })
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
                  <h1 className="h2 mb-0">My Orders</h1>
                  <Badge bg="primary" className="fs-sm">
                    {totalOrders} {totalOrders === 1 ? 'Order' : 'Orders'}
                  </Badge>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <Alert.Heading>Error</Alert.Heading>
                    <p className="mb-0">{error}</p>
                    <hr />
                    <Button variant="outline-danger" size="sm" onClick={fetchOrders}>
                      Try Again
                    </Button>
                  </Alert>
                )}

                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Loading your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <Card className="text-center py-5">
                    <Card.Body>
                      <div className="mb-4">
                        <i className="ci-shopping-bag display-4 text-muted"></i>
                      </div>
                      <h5>No orders found</h5>
                      <p className="text-muted mb-4">
                        You haven't placed any orders yet. Start shopping to see your orders here.
                      </p>
                      <Button as="a" href="/shop/electronics" variant="primary">
                        Start Shopping
                      </Button>
                    </Card.Body>
                  </Card>
                ) : (
                  <>
                    {/* Orders Table */}
                    <Card>
                      <Card.Body className="p-0">
                        <Table responsive className="mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th className="border-0 py-3 px-4">Order</th>
                              <th className="border-0 py-3">Date</th>
                              <th className="border-0 py-3">Status</th>
                              <th className="border-0 py-3">Payment</th>
                              <th className="border-0 py-3">Total</th>
                              <th className="border-0 py-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order) => (
                              <tr key={order.id}>
                                <td className="py-3 px-4">
                                  <div>
                                    <div className="fw-medium">#{order.code}</div>
                                    <small className="text-muted">
                                      {order.products_count} {order.products_count === 1 ? 'item' : 'items'}
                                    </small>
                                  </div>
                                </td>
                                <td className="py-3">
                                  <small className="text-muted">{formatDate(order.created_at)}</small>
                                </td>
                                <td className="py-3">
                                  <Badge bg={getStatusVariant(order.status)}>{order.status}</Badge>
                                </td>
                                <td className="py-3">
                                  <div>
                                    <small className="text-muted d-block">{order.payment_method || 'N/A'}</small>
                                    {order.payment_status && (
                                      <Badge
                                        bg={order.payment_status === 'completed' ? 'success' : 'warning'}
                                        className="small"
                                      >
                                        {order.payment_status}
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3">
                                  <div className="fw-medium">{order.amount_formatted}</div>
                                </td>
                                <td className="py-3">
                                  <div className="d-flex gap-2">
                                    <Button
                                      as="a"
                                      href={`/account/orders/${order.id}`}
                                      variant="outline-primary"
                                      size="sm"
                                    >
                                      View
                                    </Button>
                                    {order.status === 'pending' && (
                                      <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => {
                                          // TODO: Implement cancel order
                                          console.log('Cancel order:', order.id)
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="d-flex justify-content-center mt-4">
                        <Pagination>
                          <Pagination.Prev
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                          />

                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Pagination.Item
                              key={page}
                              active={page === currentPage}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Pagination.Item>
                          ))}

                          <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                          />
                        </Pagination>
                      </div>
                    )}
                  </>
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

export default AccountOrdersPage
