'use client'

import React from 'react'
import Image from 'next/image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function AcrossBordersSection() {
  const countries = [
    { 
      country: 'Korea', 
      flag: '🇰🇷', 
      desc: 'Ultimate finds from around the world',
      image: '/images/countries/korea.png'
    },
    { 
      country: 'China', 
      flag: '🇨🇳', 
      desc: 'Ultimate finds from around the world',
      image: '/images/countries/china.png'
    },
    { 
      country: 'India', 
      flag: '🇮🇳', 
      desc: 'Ultimate finds from around the world',
      image: '/images/countries/india.png'
    }
  ];

  return (
    <>
      {/* Countries Display - 3 cards only */}
      <Row className="g-3 mb-3">
        {countries.map((item, index) => (
          <Col lg={4} key={index}>
            <div className="bg-light rounded-3 p-4 text-center position-relative h-100">
              <h6 className="mb-2">Products from {item.country}</h6>
              
              {/* Country Image */}
              <div className="mb-2 position-relative">
                <Image 
                  src={item.image} 
                  width={1440} 
                  height={640} 
                  alt={`Products from ${item.country}`}
                  className="mx-auto"
                  style={{ 
                    objectFit: 'cover',
                    borderRadius: '12px',
                    width: '172.8%',
                    height: '291px'
                  }}
                />
              </div>
              
              <p className="text-muted small mb-0">{item.desc}</p>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}
