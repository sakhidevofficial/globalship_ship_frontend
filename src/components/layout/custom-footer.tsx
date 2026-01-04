'use client'

import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CustomFooter = ({ className, logoHref }: { className?: string; logoHref?: string }) => (
  <footer className="bg-white text-dark mt-5 overflow-hidden">
    <Row className="my-4 px-2 px-md-4 gy-4">
      <Col xs={12} md={3}>
        <h3>CARTZILLA</h3>
        <p className="fs-7">CARTZILLA is the next step on our mission to make commerce better for everyone.</p>
        <div className="d-flex align-items-center">
          <img
            src="/img/qrcode.png"
            className="rounded me-3"
            alt="QR Code"
            style={{ width: '100px', height: '100px' }}
          />
          <div className="d-flex flex-column gap-2">
            <img src="/img/appstore.svg" alt="App Store" style={{ width: '140px' }} />
            <img src="/img/playstore.svg" alt="Google Play" style={{ width: '140px' }} />
          </div>
        </div>
      </Col>
      <Col xs={12} md={2}></Col>
      {/* Info */}
      <Col xs={6} md={2}>
        <div className="d-flex flex-column gap-1">
          <p className="fw-bold">Information</p>
          <a href="#" className="text-decoration-none text-muted fs-6">
            Store
          </a>
          <a href="#" className="text-decoration-none text-muted fs-6">
            Help Center
          </a>
          <a href="#" className="text-decoration-none text-muted fs-6">
            For Brands
          </a>
        </div>
      </Col>

      {/* Social */}
      <Col xs={6} md={2}>
        <div className="d-flex flex-column gap-1">
          <p className="fw-bold">Social</p>
          <a href="#" className="text-decoration-none text-muted fs-6">
            X (Twitter)
          </a>
          <a href="#" className="text-decoration-none text-muted fs-6">
            Instagram
          </a>
        </div>
      </Col>

      {/* Policies */}
      <Col xs={12} md={2}>
        <div className="d-flex flex-column gap-1">
          <p className="fw-bold">Information</p>
          <a href="#" className="text-decoration-none text-muted fs-6">
            Terms of Service
          </a>
          <a href="#" className="text-decoration-none text-muted fs-6">
            Privacy Policy
          </a>
          <a href="#" className="text-decoration-none text-muted fs-6">
            Do Not Sell or Share My Personal Information
          </a>
        </div>
      </Col>
    </Row>

    {/* Bottom row */}
    <Row className="p-3 border-top d-flex flex-column flex-md-row justify-content-between align-items-center">
      <Col xs={12} md="auto" className="text-center text-md-start mb-2 mb-md-0">
        Powered by CARTZILLA.org
      </Col>
      <Col xs={12} md="auto" className="d-flex justify-content-center justify-content-md-end gap-4">
        <a className="fs-6 text-decoration-none text-muted" href="#">
          Language
        </a>
        <a className="fs-6 text-decoration-none text-muted" href="#">
          &copy; CARTZILLA 2025
        </a>
      </Col>
    </Row>
  </footer>
)

export default CustomFooter
