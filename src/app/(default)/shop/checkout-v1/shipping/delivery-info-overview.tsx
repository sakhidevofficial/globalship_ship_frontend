'use client'

import { useContext } from 'react'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Link from 'next/link'
import AccordionCollapse from 'react-bootstrap/AccordionCollapse'
import Nav from 'react-bootstrap/Nav'

interface DeliveryInfoOverviewCheckout_V1Props {
  postcode?: string
  deliveryDate?: string
  deliveryTime?: string
}

const DeliveryInfoOverviewCheckout_V1 = ({ 
  postcode = 'Enter postcode', 
  deliveryDate = 'To be calculated', 
  deliveryTime = 'To be calculated' 
}: DeliveryInfoOverviewCheckout_V1Props) => {
  // Custom accordion toggle
  const CustomToggle = ({ label, eventKey }: { label: string; eventKey: string }) => {
    const { activeEventKey } = useContext(AccordionContext)
    const accordionToggle = useAccordionButton(eventKey)

    const isCurrentEventKey = activeEventKey === eventKey

    const handleClick = (e: React.SyntheticEvent) => {
      accordionToggle(e)
    }

    return (
      <button
        type="button"
        className={`accordion-button fs-5 d-lg-none py-1 ${isCurrentEventKey ? '' : 'collapsed'}`}
        onClick={handleClick}
      >
        <span className="me-2">{label}</span>
      </button>
    )
  }

  return (
    <div className="accordion-item d-flex align-items-start border-0">
      <div
        className="d-flex align-items-center justify-content-center bg-body-secondary text-dark-emphasis rounded-circle flex-shrink-0"
        style={{ width: '2rem', height: '2rem', marginTop: '-.125rem' }}
      >
        <i className="ci-check fs-base" />
      </div>
      <div className="w-100 ps-3 ps-md-4">
        <div className="d-flex align-items-center">
          <h2 className="accordion-header h5 mb-0 me-3" id="deliveryInfoHeading">
            <span className="d-none d-lg-inline">Delivery information</span>
            <CustomToggle label="Delivery information" eventKey="deliceryInfo" />
          </h2>
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="../delivery-2" className="text-decoration-underline p-0">
              Edit
            </Nav.Link>
          </Nav>
        </div>
        <AccordionCollapse eventKey="deliceryInfo" className="d-lg-block">
          <div className="accordion-body p-0 pt-3 pt-md-4" aria-labelledby="deliveryInfoHeading">
            <h3 className="fs-sm mb-2">Postcode</h3>
            <p className="fs-sm">{postcode}</p>
            <h3 className="fs-sm mb-2">Estimated delivery date</h3>
            <div className="d-flex align-items-center fs-sm">
              {deliveryDate}
              {deliveryTime !== 'To be calculated' && (
                <>
                  <span className="opacity-40 mx-2">|</span>
                  {deliveryTime}
                </>
              )}
            </div>
          </div>
        </AccordionCollapse>
      </div>
    </div>
  )
}

export default DeliveryInfoOverviewCheckout_V1
