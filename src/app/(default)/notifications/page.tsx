'use client'

import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CustomFooter from '@/components/layout/custom-footer'

export default function NotificationsPage() {
  return (
    <>
      <HeaderElectronics />
      <main className="content-wrapper">
        <Container className="py-5">
          <Row>
            <Col xs={12}>
              <h1 className="mb-4">Notifications</h1>
              <div className="bg-light rounded-3 p-4">
                <p className="mb-0">You have 1 unread notification</p>
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
