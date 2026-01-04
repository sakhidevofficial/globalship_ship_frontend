'use client'

import { useState, Fragment, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useOrder } from '@/contexts/order-context'
import { useOffcanvas } from '@/contexts/offcanvas-context'
import type { Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Pagination from 'react-bootstrap/Pagination'
import Alert from 'react-bootstrap/Alert'
import Placeholder from 'react-bootstrap/Placeholder'
import SelectBox from '@/components/forms/select-box'

interface Order {
  id: string
  date: string
  status: 'In progress' | 'Delivered' | 'Canceled'
  products: Product[]
  delivery?: {
    date: string
    method: string
    address: string
  }
  payment?: {
    method: string
    tax: number
    shipping?: number
  }
}

const AccountOrders = () => {
  const { isAuthenticated } = useAuth()
  const { state: orderState, getOrders } = useOrder()
  const [status, setStatus] = useState<string>()
  const { openOffcanvas, closeOffcanvas, isOpen } = useOffcanvas()
  const [selectedOrderId, setSelectedOrderId] = useState<string>('')
  const hasLoadedOrders = useRef(false)

  // Fetch orders when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated && !hasLoadedOrders.current) {
      hasLoadedOrders.current = true
      getOrders()
    }
  }, [isAuthenticated])

  // Calculate order total
  const calculateOrderTotal = (order: any) => {
    // Use order total from API if available
    if (order.amount || order.total) {
      return order.amount || order.total
    }
    
    // Fallback calculation for products
    const productsTotal = (order.products || []).reduce((sum: number, product: any) => {
      const quantity = product.quantity || product.qty || 1
      const price = product.price || product.amount || 0
      return sum + price * quantity
    }, 0)

    const tax = order.tax_amount || 0
    const shipping = order.shipping_amount || 0
    const total = productsTotal + tax + shipping

    return total
  }

  // Transform Botble order data to match component expectations
  const transformOrder = (botbleOrder: any): Order => {
    return {
      id: botbleOrder.code || botbleOrder.id?.toString() || 'N/A',
      date: botbleOrder.created_at ? new Date(botbleOrder.created_at).toLocaleDateString() : 'N/A',
      status: mapOrderStatus(botbleOrder.status),
      products: botbleOrder.products || [],
      delivery: {
        date: botbleOrder.expected_delivery_date || 'N/A',
        method: botbleOrder.shipping_method_name || 'Standard',
        address: botbleOrder.address?.address || 'N/A'
      },
      payment: {
        method: botbleOrder.payment?.payment_channel?.label || 'N/A',
        tax: botbleOrder.tax_amount || 0,
        shipping: botbleOrder.shipping_amount || 0
      }
    }
  }

  // Map Botble order status to component expected status
  const mapOrderStatus = (botbleStatus: string): 'In progress' | 'Delivered' | 'Canceled' => {
    switch (botbleStatus?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'Delivered'
      case 'canceled':
      case 'cancelled':
        return 'Canceled'
      default:
        return 'In progress'
    }
  }

  if (orderState.loading || !isAuthenticated)
    return (
      <>
        <h1 className="h2 mb-md-4 pb-md-1 pb-lg-2">Orders</h1>
        <Table className="align-middle fs-sm text-nowrap">
          <thead>
            <tr>
              <th scope="col" className="py-3 ps-0">
                <span className="text-body fw-normal">
                  Order <span className="d-none d-md-inline">#</span>
                </span>
              </th>
              <th scope="col" className="py-3 d-none d-md-table-cell">
                <span className="text-body fw-normal">Order date</span>
              </th>
              <th scope="col" className="py-3 d-none d-md-table-cell">
                <span className="text-body fw-normal">Status</span>
              </th>
              <th scope="col" className="py-3 d-none d-md-table-cell">
                <span className="fw-normal text-body">Total</span>
              </th>
              <th scope="col" className="py-3">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }, (_, index) => {
              const placeholderCount = Math.floor(Math.random() * 3) + 1

              return (
                <tr key={index}>
                  <td className="py-3 ps-0">
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                  </td>
                  <td className="py-3 d-none d-md-table-cell">
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={8} />
                    </Placeholder>
                  </td>
                  <td className="py-3 d-none d-md-table-cell">
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={7} />
                    </Placeholder>
                  </td>
                  <td className="py-3 d-none d-md-table-cell">
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={5} />
                    </Placeholder>
                  </td>
                  <td className="py-3 pe-0">
                    <span className="d-flex align-items-center justify-content-end position-relative gap-1 gap-sm-2 opacity-75 ms-n2 ms-sm-0">
                      {Array.from({ length: placeholderCount }, (_, i) => (
                        <Placeholder
                          key={i}
                          as="div"
                          animation="wave"
                          className="position-relative"
                          style={{ width: 64 }}
                        >
                          <Placeholder className="ratio ratio-1x1 rounded-2" />
                          <i className="ci-image position-absolute top-50 start-50 translate-middle fs-4 opacity-40" />
                        </Placeholder>
                      ))}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </>
    )

  if (orderState.error)
    return (
      <>
        <h1 className="h2 mb-md-4 pb-md-1 pb-lg-2">Orders</h1>
        <Alert variant="danger" className="d-inline-flex">
          <i className="ci-alert-triangle fs-lg pe-1 mt-1 me-2" />
          <div>
            <span className="fw-semibold">Error loading orders:</span> {orderState.error}
          </div>
        </Alert>
      </>
    )

  // Transform orders for display
  const transformedOrders = orderState.orders.map(transformOrder)

  return (
    <>
      <div className="d-flex justify-content-between align-items-center pb-3 pb-md-4 mb-md-1 mb-lg-2">
        <h1 className="h2 me-3 mb-0">Orders</h1>
        <SelectBox
          choices={[
            {
              value: 'In progress',
              label:
                '<div class="d-flex align-items-center text-nowrap"><span class="bg-info rounded-circle p-1 me-2"></span>In progress</div>',
            },
            {
              value: 'Delivered',
              label:
                '<div class="d-flex align-items-center text-nowrap"><span class="bg-success rounded-circle p-1 me-2"></span>Delivered</div>',
            },
            {
              value: 'Canceled',
              label:
                '<div class="d-flex align-items-center text-nowrap"><span class="bg-danger rounded-circle p-1 me-2"></span>Canceled</div>',
            },
          ]}
          value={status}
          onChange={(value) => setStatus(value as string)}
          placeholder="Select status"
          className="w-100 ms-auto"
          style={{ maxWidth: 230 }}
        />
      </div>

      {transformedOrders.length === 0 ? (
        <div className="text-center py-5">
          <i className="ci-shopping-bag text-muted mb-4" style={{ fontSize: '4rem' }}></i>
          <h3 className="h4 mb-2">No orders yet</h3>
          <p className="text-muted mb-4">You haven't placed any orders yet. Start shopping to see your orders here.</p>
          <Link href="/shop">
            <Button variant="primary">
              <i className="ci-shopping-bag me-2"></i>
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <Table className="align-middle fs-sm text-nowrap">
          <thead>
            <tr>
              <th scope="col" className="py-3 ps-0">
                <span className="text-body fw-normal">
                  Order <span className="d-none d-md-inline">#</span>
                </span>
              </th>
              <th scope="col" className="py-3 d-none d-md-table-cell">
                <span className="text-body fw-normal">Order date</span>
              </th>
              <th scope="col" className="py-3 d-none d-md-table-cell">
                <span className="text-body fw-normal">Status</span>
              </th>
              <th scope="col" className="py-3 d-none d-md-table-cell">
                <span className="fw-normal text-body">Total</span>
              </th>
              <th scope="col" className="py-3">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody className="text-body-emphasis">
            {transformedOrders.map((order) => {
              const color = order.status === 'In progress' ? 'info' : order.status === 'Canceled' ? 'danger' : 'success'
              const total = calculateOrderTotal(order)
              
              if (status !== undefined && status !== order.status) {
                return null; // Don't render if filtered out
              }
              
              return (
                <Fragment key={order.id}>
                  <tr>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0">
                      <div
                        className="d-inline-block animate-underline text-body-emphasis cursor-pointer py-2"
                        onClick={() => {
                          setSelectedOrderId(order.id)
                          openOffcanvas(order.id)
                        }}
                        aria-label="Show order details"
                      >
                        <span className="animate-target">{order.id}</span>
                      </div>
                      <ul className="list-unstyled fw-normal text-body m-0 d-md-none">
                        <li>{order.date}</li>
                        <li className="d-flex align-items-center">
                          <span className={`bg-${color} rounded-circle p-1 me-2`}></span>
                          {order.status}
                        </li>
                        <li className="fw-medium text-body-emphasis">
                          ${typeof total === 'number' ? total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : total}
                        </li>
                      </ul>
                    </td>
                    <td className="fw-medium py-3 d-none d-md-table-cell">{order.date}</td>
                    <td className="fw-medium py-3 d-none d-md-table-cell">
                      <span className="d-flex align-items-center">
                        <span className={`bg-${color} rounded-circle p-1 me-2`}></span>
                        {order.status}
                      </span>
                    </td>
                    <td className="fw-medium py-3 d-none d-md-table-cell">
                      ${typeof total === 'number' ? total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : total}
                    </td>
                    <td className="py-3 pe-0">
                      <span className="d-flex align-items-center justify-content-end position-relative gap-1 gap-sm-2 ms-n2 ms-sm-0">
                        {order.products.map((product: any, index: number) => (
                          <div key={index} className="position-relative" style={{ width: 64 }}>
                            <Image
                              src={product.image_url || product.image || '/img/shop/electronics/thumbs/01.png'}
                              className="rounded-2"
                              width={64}
                              height={64}
                              alt={product.name || product.title || 'Product'}
                            />
                            {product.quantity > 1 && (
                              <span className="badge bg-dark position-absolute top-0 start-100 translate-middle z-2 rounded-pill">
                                {product.quantity}
                              </span>
                            )}
                          </div>
                        ))}
                      </span>
                    </td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </Table>
      )}

      {/* Order details offcanvas - this would need more detailed implementation */}
      <Offcanvas show={isOpen(selectedOrderId)} onHide={() => closeOffcanvas(selectedOrderId)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Order Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Order details will be implemented here with full Botble order data.</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default AccountOrders 