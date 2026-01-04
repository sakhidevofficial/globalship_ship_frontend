import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CustomFooter from '@/components/layout/custom-footer'

export const metadata: Metadata = {
  title: 'Cartzilla | About Us - Your Trusted Shopping Partner',
  description: 'Learn about Cartzilla - your trusted shopping partner since 2015',
}

const About_V1_Page = () => (
  <>
    {/* Navigation bar (Page header) */}
    <HeaderElectronics />

    {/* Page content */}
    <main className="content-wrapper">
      {/* Breadcrumb */}
      <Container className="pt-3 my-3 my-md-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/home">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              About
            </li>
          </ol>
        </nav>
      </Container>

      {/* Hero Section */}
      <Container as="section" className="py-5">
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="pe-lg-4">
              <h1 className="display-4 fw-bold text-dark mb-4">🚀 Cartzilla - More than just shopping</h1>
              <p className="lead text-muted mb-4">
                We're your trusted partner in discovering amazing products at unbeatable prices. From electronics to
                fashion, home goods to gadgets - we've got everything you need to make life better, easier, and more
                enjoyable.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button href="#mission" variant="primary" size="lg" className="px-4 py-3">
                  🎯 Our Mission
                </Button>
                <Button href="#stats" variant="outline-primary" size="lg" className="px-4 py-3">
                  📊 Company Stats
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-center">
              <div className="fs-1 mb-3">🏢</div>
              <h4>Building the Future</h4>
              <p className="mb-0">Your trusted shopping partner</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Stats Section */}
      <Container as="section" id="stats" className="py-5 bg-light rounded-4">
        <Row xs={2} md={4} className="g-4 text-center">
          {[
            { number: '14k+', label: 'Products Available', icon: '🛍️' },
            { number: '120M+', label: 'Happy Customers', icon: '😊' },
            { number: '800+', label: 'Global Team', icon: '🌍' },
            { number: '92%', label: 'Return Rate', icon: '🔄' },
          ].map((item, index) => (
            <Col key={index}>
              <div className="p-4">
                <div className="fs-1 mb-2">{item.icon}</div>
                <div className="h2 fw-bold text-primary mb-2">{item.number}</div>
                <p className="text-muted mb-0 small">{item.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Mission Section */}
      <Container as="section" id="mission" className="py-5 mt-5" style={{ scrollMarginTop: 60 }}>
        <div className="text-center mx-auto" style={{ maxWidth: 800 }}>
          <h2 className="display-5 fw-bold text-dark mb-4">The best products at fair prices</h2>
          <div className="bg-light rounded-4 p-5 mb-5">
            <p className="fs-xl text-muted mb-4 fst-italic">
              "We believe that things exist to make life easier, more pleasant and kinder. That's why the search for the
              right thing should be quick, convenient and enjoyable. We do not just sell household appliances and
              electronics, but comfort and accessibility."
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center"
                style={{ width: '80px', height: '80px' }}
              >
                <span className="fs-1 text-white">👨‍💼</span>
              </div>
              <div className="text-start">
                <h6 className="mb-1 fw-bold">William Lacker</h6>
                <p className="text-muted mb-0 small">Founder & CEO, Cartzilla</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container as="section" className="py-5">
        <div className="text-center">
          <h3 className="mb-3">Ready to start shopping?</h3>
          <p className="mb-4">Join millions of satisfied customers worldwide</p>
          <Button variant="primary" size="lg" href="/shop">
            Start Shopping
          </Button>
        </div>
      </Container>
    </main>

    {/* Page footer */}
    {/* <FooterElectronics /> */}
    <CustomFooter />
  </>
)

export default About_V1_Page
