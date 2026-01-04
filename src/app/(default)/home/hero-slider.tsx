'use client'

import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function HeroBannerJoom() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  return (
    <section className="hero-banner-joom">
      <Container fluid className="px-0">
        <div 
          className="hero-banner position-relative d-flex align-items-center"
          style={{
            background: '#ff6b35',
            minHeight: '320px',
            padding: '48px 50px',
            width: '100%',
            marginBottom: '0',
            marginTop: '20px',
            marginLeft: '0',
            marginRight: '0',
            borderRadius: '16px'
          }}
        >
          {/* Content */}
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="text-white">
                <h1 className="fw-bold mb-0" style={{ 
                  fontSize: '3.5rem', 
                  lineHeight: '1.1',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.02em'
                }}>
                  Outlet
                </h1>
                <h2 className="h3 mb-0" style={{ 
                  fontSize: '1.5rem', 
                  opacity: 0.95,
                  fontWeight: '400',
                  letterSpacing: '0.01em'
                }}>
                  Summer Sale
                </h2>
              </Col>
              
              {/* Illustration - Right Side */}
              <Col lg={6} className="text-center">
                <div className="hero-illustration">
                  {/* Placeholder for illustration - you can add your own image here */}
                  <div 
                    className="d-flex align-items-center justify-content-center"
                    style={{ 
                      height: '280px',
                      color: 'rgba(255,255,255,0.1)',
                      fontSize: '4rem'
                    }}
                  >
                    👕
                      </div>
                </div>
              </Col>
            </Row>
          </Container>

          {/* Navigation Arrows */}
          <button 
            className="btn rounded-circle position-absolute start-0 top-50 translate-middle-y ms-4"
            style={{ 
              width: '48px', 
              height: '48px',
              border: '2px solid #ff6b35',
              background: '#ff6b35',
              color: 'white',
              zIndex: 10
            }}
            onClick={() => setCurrentSlide(0)}
          >
            <i className="ci-arrow-left fs-4"></i>
          </button>
          
          <button 
            className="btn rounded-circle position-absolute end-0 top-50 translate-middle-y me-4"
            style={{ 
              width: '48px', 
              height: '48px',
              border: '2px solid #ff6b35',
              background: '#ff6b35',
              color: 'white',
              zIndex: 10
            }}
            onClick={() => setCurrentSlide(0)}
          >
            <i className="ci-arrow-right fs-4"></i>
          </button>

          {/* Pagination Dots */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
            <div className="d-flex gap-2">
              <div 
                className="rounded-circle" 
                style={{ 
                  width: '10px', 
                  height: '10px', 
                  background: '#ff6b35',
                  opacity: 1 
                }}
              ></div>
              <div 
                className="rounded-circle" 
                style={{ 
                  width: '10px', 
                  height: '10px', 
                  background: '#ff6b35',
                  opacity: 0.5 
                }}
              ></div>
            </div>
          </div>
        </div>
    </Container>
      
      <style jsx>{`
        .hero-banner-joom {
          margin: 0;
          padding: 0;
        }
        
        .hero-banner {
          background: #ff6b35 !important;
          min-height: 320px !important;
          padding: 48px 50px !important;
          width: 100% !important;
          margin: 20px 0 0 0 !important;
          border-radius: 16px !important;
        }
        
        @media (min-width: 992px) {
          .hero-banner {
            width: calc(100% - 100px) !important;
            margin: 20px 50px 0 50px !important;
          }
        }
        
        @media (max-width: 768px) {
          .hero-banner {
            min-height: 288px !important; /* 320px - 10% = 288px */
            padding: 32px 20px !important;
            margin: 20px 0 0 0 !important;
            width: 100% !important;
            border-radius: 12px !important;
          }
          
          .hero-banner h1 {
            font-size: 2.5rem !important;
          }
          
          .hero-banner h2 {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  )
}