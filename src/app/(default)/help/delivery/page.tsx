'use client'

import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function DeliveryPage() {
  const helpCategories = [
    { name: 'Delivery & Tracking', path: '/help/delivery', active: true },
    { name: 'Refunds & Returns', path: '/help/refunds', active: false },
    { name: 'Ordering', path: '/help/ordering', active: false },
    { name: 'Sales, Promotions and Coupons', path: '/help/sales', active: false },
    { name: 'Legal Information & Safety', path: '/help/legal', active: false },
    { name: 'Products & Reviews', path: '/help/products', active: false },
    { name: 'Payment', path: '/help/payment', active: false }
  ]

  const deliveryQuestions = [
    'What is a non-delivery warranty?',
    'How do I confirm receipt of an item?',
    'I\'ve mistakenly marked my order as Delivered. What should I do?',
    'Will my orders be shipped together?',
    'When will my order be shipped?',
    'My order is delayed! What should I do?',
    'Where\'s my order now?',
    'Why can\'t I track my order?',
    'Fees & Taxes',
    'One of the orders is missing from a consolidated parcel. What should I do?',
    'My order is marked as delivered, but I have not received it',
    'Where is my order?'
  ]

  return (
    <>
      <HeaderElectronics />
      <div className="min-vh-100 bg-white">
        <div className="container py-5">
          {/* Breadcrumb */}
          <div className="d-flex justify-content-end mb-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link href="/" className="text-muted text-decoration-none">Home</Link>
                </li>
                <li className="breadcrumb-item active text-muted" aria-current="page">
                  Help centre
                </li>
              </ol>
            </nav>
          </div>

          <Row>
            {/* Left Sidebar Navigation */}
            <Col lg={3} className="mb-4">
              <div className="border-end pe-4">
                <h5 className="fw-bold text-danger mb-3">Delivery & Tracking</h5>
                <nav className="nav flex-column">
                  {helpCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.path}
                      className={`nav-link px-0 py-2 text-decoration-none ${
                        category.active 
                          ? 'text-danger fw-bold' 
                          : 'text-dark'
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </Col>

            {/* Main Content Area */}
            <Col lg={9}>
              <h1 className="display-6 fw-bold text-dark mb-4">Delivery & Tracking</h1>
              
              <div className="d-flex flex-column gap-3">
                {deliveryQuestions.map((question, index) => (
                  <Link
                    key={index}
                    href={`/help/delivery/${index + 1}`}
                    className="text-decoration-underline text-danger fw-medium"
                    style={{ fontSize: '16px' }}
                  >
                    {question}
                  </Link>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <FooterElectronics />
    </>
  )
}
