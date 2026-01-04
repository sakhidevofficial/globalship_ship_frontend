'use client'

import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'

interface HelpCategory {
  title: string
  questions?: string[]
  moreCount?: number
  subtitle?: string
  isContact?: boolean
}

export default function HelpCentrePage() {
  const helpCategories: HelpCategory[] = [
    {
      title: 'Delivery & Tracking',
      questions: [
        'What is a non-delivery warranty?',
        'How do I confirm receipt of an item?',
        'I\'ve mistakenly marked my order as Delivered. What should I do?'
      ],
      moreCount: 9
    },
    {
      title: 'Refunds & Returns',
      questions: [
        'I\'ve received a poor quality product. What should I do?',
        'My package arrived incomplete, or I received the wrong product.',
        'How do I return an item?'
      ],
      moreCount: 5
    },
    {
      title: 'Ordering',
      questions: [
        'K-pop album and merch pre-orders from Korea',
        'Unable to place an order to my address',
        'How can I change the size/color/version of a purchased item?'
      ],
      moreCount: 7
    },
    {
      title: 'Sales, Promotions and Coupons',
      questions: [
        'Rules for participating in the "Almost Free" promotion',
        '"Special Price" promotion',
        'What are coupons?'
      ],
      moreCount: 11
    },
    {
      title: 'Legal Information & Safety',
      questions: [
        'Personal data protection',
        'National consumer protection and market surveillance authorities in EU',
        'Additional information about recipients of your personal data'
      ],
      moreCount: 11
    },
    {
      title: 'Products & Reviews',
      questions: [
        'Reviews',
        'How do product reviews work?',
        'Unable to leave a review'
      ],
      moreCount: 4
    },
    {
      title: 'Payment',
      questions: [
        'What are points?',
        'Why is my payment being declined?',
        'Item Pricing and Why It May Change'
      ],
      moreCount: 6
    },
    {
      title: 'Account management',
      questions: [
        'Notifications',
        'Can I delete some of my orders?',
        'Why do I need to log in?'
      ],
      moreCount: 3
    },
    {
      title: 'Still have questions?',
      subtitle: 'Let us know',
      isContact: true
    }
  ]

  return (
    <>
      <HeaderElectronics />
      <div className="min-vh-100 bg-white">
        <div className="container py-5">
          {/* Page Title */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-dark mb-3">
              Popular articles and common questions
            </h1>
            <p className="text-muted lead">
              Find answers to frequently asked questions and get the help you need
            </p>
          </div>

          {/* Help Categories Grid */}
          <Row className="g-4">
            {helpCategories.map((category, index) => (
              <Col lg={4} md={6} key={index}>
                {category.isContact ? (
                  // Contact Us Card
                  <Card className="h-100 border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                    <Card.Body className="p-4 text-center d-flex flex-column justify-content-center">
                      <h4 className="fw-bold text-dark mb-2">{category.title}</h4>
                      <p className="text-muted mb-4">{category.subtitle}</p>
                      <Button 
                        variant="danger" 
                        size="lg" 
                        className="w-100 rounded-pill"
                        style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                      >
                        Contact us
                      </Button>
                    </Card.Body>
                  </Card>
                ) : (
                  // Regular Category Card
                  <Link 
                    href={category.title === 'Delivery & Tracking' ? '/delivery' : '#'} 
                    className="text-decoration-none"
                  >
                    <Card className="h-100 border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                      <Card.Body className="p-4">
                        <h4 className="fw-bold text-dark mb-3">{category.title}</h4>
                        <ul className="list-unstyled mb-3">
                          {category.questions?.map((question, qIndex) => (
                            <li key={qIndex} className="mb-2">
                              <span className="text-muted">
                                {question}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <span className="text-muted small">
                          View {category.moreCount} more questions
                        </span>
                      </Card.Body>
                    </Card>
                  </Link>
                )}
              </Col>
            ))}
          </Row>

          {/* Additional Help Section */}
          <div className="text-center mt-5 pt-4">
            <div className="bg-light rounded-3 p-4">
              <h3 className="mb-3">Need more specific help?</h3>
              <p className="text-muted mb-4">
                Can't find what you're looking for? Our support team is here to help 24/7
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="outline-primary" size="lg">
                  📞 Call Support
                </Button>
                <Button variant="outline-primary" size="lg">
                  💬 Live Chat
                </Button>
                <Button variant="outline-primary" size="lg">
                  📧 Email Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterElectronics />
    </>
  )
}
