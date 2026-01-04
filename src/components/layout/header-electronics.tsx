'use client'

import { useState } from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Form } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Offcanvas from 'react-bootstrap/Offcanvas'
import AuthModal from '@/components/auth/auth-modal'

interface HeaderElectronicsProps {
  logoHref?: string
  isLoggedIn?: {
    name: string
    href: string
  }
  expandedCategories?: boolean
  categories?: any[]
}

const HeaderElectronics = ({
  logoHref = '/',
  isLoggedIn,
  expandedCategories,
  categories,
}: HeaderElectronicsProps = {}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  // Use provided categories or fallback to simplified ones
  const joomCategories =
    categories && categories.length > 0
      ? categories.map((cat: any) => cat.name).slice(0, 20)
      : [
          'Outlet',
          'Free gift with purchase',
          'Xiaomi',
          "Men's Fashion",
          'Pet Supplies',
          'Shoes',
          'Home Improvement',
          'Electronics',
          'Smartphone Cases',
          'Home Appliances',
          'Home & Kitchen',
          'Kids',
          'Parties & Events',
          'Beauty',
          'Health',
          'Bags & Suitcases',
          "Women's Fashion",
          'Office & School',
          'Watches & Clocks',
        ]

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <>
      {/* Mobile Header - Joom Style */}
      <div className="bg-white border-bottom d-lg-none">
        <Container fluid className="px-3">
          <Row className="py-2 align-items-center">
            {/* Left: Hamburger Menu + Logo */}
            <Col xs={6} className="d-flex align-items-center">
              <Button
                variant="link"
                className="text-dark text-decoration-none p-0 me-3"
                onClick={() => setShowMobileMenu(true)}
              >
                <i className="ci-menu fs-4"></i>
              </Button>
              <Link href={logoHref} className="text-decoration-none d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <span className="h5 mb-0 fw-bold bg-danger text-white px-1 py-1 rounded me-1">C</span>
                  <span className="h5 mb-0 fw-bold text-dark">ARTZILLA</span>
                </div>
              </Link>
            </Col>

            {/* Right: Icons */}
            <Col xs={6} className="d-flex align-items-center justify-content-end gap-2">
              {/* Notifications */}
              <Link href="/notifications" className="text-decoration-none position-relative">
                <i className="ci-bell text-dark" style={{ fontSize: '18px' }}></i>
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{
                    fontSize: '8px',
                    padding: '1px 3px',
                    minWidth: '12px',
                    height: '12px',
                    top: '-2px',
                    right: '-2px',
                  }}
                >
                  1
                </Badge>
              </Link>

              {/* Profile */}
              <Button variant="link" className="text-decoration-none p-0" onClick={() => handleAuthClick('login')}>
                <i className="ci-user text-dark" style={{ fontSize: '18px' }}></i>
              </Button>

              {/* Orders */}
              <Link href="/account/orders" className="text-decoration-none">
                <i className="ci-package text-dark" style={{ fontSize: '18px' }}></i>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="text-decoration-none position-relative">
                <i className="ci-shopping-cart text-dark" style={{ fontSize: '18px' }}></i>
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{
                    fontSize: '8px',
                    padding: '1px 3px',
                    minWidth: '12px',
                    height: '12px',
                    top: '-2px',
                    right: '-2px',
                  }}
                >
                  3
                </Badge>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Desktop Header - Hidden on Mobile */}
      {/* <div className="bg-white border-bottom d-none d-lg-block">
        <Container>
          <Row className="py-2 align-items-center">
            <Col className="d-flex gap-4 align-items-center">
              
              <div className="dropdown">
                <Button variant="link" className="text-dark text-decoration-none p-0 d-flex align-items-center">
                  <i className="fi fi-gb me-1"></i>
                  English
                  <i className="ci-chevron-down ms-1 small"></i>
                </Button>
              </div>
              
              <div className="dropdown">
                <Button variant="link" className="text-dark text-decoration-none p-0 d-flex align-items-center">
                  USD
                  <i className="ci-chevron-down ms-1 small"></i>
                </Button>
              </div>
            </Col>
            <Col className="text-center text-end">
              <div className="d-flex gap-3 align-items-center justify-content-center justify-content-lg-end">
                <Link href="/help" className="text-dark text-decoration-none small">
                  Help centre
                </Link>
                <Link href="/delivery" className="text-dark text-decoration-none small">
                  Delivery
                </Link>
                <Link href="/warranty" className="text-dark text-decoration-none small">
                  Warranty
                </Link>
                <Button variant="dark" size="sm" className="px-3 py-1">
                  Cartzilla Geek
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
      <div className="bg-dark text-white" style={{ backgroundColor: '#121212' }}>
        <Container>
          <Row className="py-2 align-items-center">
            {/* Left Side */}
            <Col
              lg={4}
              className="d-flex gap-4 align-items-center justify-content-lg-start justify-content-center mb-2 mb-lg-0"
            >
              {/* Language Dropdown */}
              {/* <div className="dropdown">
                <Button variant="link" className="text-white text-decoration-none p-0 d-flex align-items-center">
                  <i className="fi fi-gb me-1"></i>
                  English
                  <i className="ci-chevron-down ms-1 small"></i>
                </Button>
              </div> */}

              {/* Currency Dropdown */}
              {/* <div className="dropdown">
                <Button variant="link" className="text-white text-decoration-none p-0 d-flex align-items-center">
                  USD
                  <i className="ci-chevron-down ms-1 small"></i>
                </Button>
              </div> */}
            </Col>

            {/* Center Message */}
            <Col lg={4} className="text-center mb-2 mb-lg-0">
              <span className="small text-white fw-semibold">
                Download <span className="text-warning">Cartzilla Geek</span>. Available on iOS &amp; Android
              </span>
            </Col>

            {/* Right Side */}
            <Col lg={4} className="d-flex gap-3 align-items-center justify-content-lg-end justify-content-center">
              {/* <Link href="/help" className="text-white text-decoration-none small">
                Help centre
              </Link>
              <Link href="/delivery" className="text-white text-decoration-none small">
                Delivery
              </Link>
              <Link href="/warranty" className="text-white text-decoration-none small">
                Warranty
              </Link>
              <Button variant="warning" size="sm" className="px-3 py-1 fw-semibold">
                Cartzilla Geek
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mobile Search Bar - Full Width on Mobile */}
      <div className="bg-white border-bottom d-lg-none">
        <Container fluid className="px-3">
          <Row className="py-3">
            <Col>
              <div className="d-flex align-items-center search-container">
                <div className="position-relative d-flex flex-grow-1">
                  <FormControl
                    type="text"
                    placeholder="What are you looking for?"
                    className="border-0 rounded-pill ps-4 pe-5 py-3 search-input"
                    style={{
                      fontSize: '16px',
                      minHeight: '48px',
                      backgroundColor: '#F8F9FA',
                      border: 'none',
                      boxShadow: 'none',
                      outline: 'none',
                    }}
                  />
                  {/* Camera Icon inside search bar */}
                  <i
                    className="ci-camera position-absolute"
                    style={{
                      right: '5%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6c757d',
                      fontSize: '16px',
                      zIndex: 5,
                    }}
                  ></i>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Desktop Main Header - Hidden on Mobile */}
      {/* <div className="bg-white d-none d-lg-block">
        <Container>
          <Row className="py-4 align-items-center">
            <Col lg={3}>
              <Link href={logoHref} className="text-decoration-none d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <span className="h2 mb-0 fw-bold bg-danger text-white px-2 py-1 rounded me-2">C</span>
                  <span className="h2 mb-0 fw-bold text-dark">ARTZILLA</span>
                </div>
              </Link>
            </Col>

            <Col lg={6}>
              <div className="d-flex align-items-center search-container">
                <div className="position-relative d-flex flex-grow-1">
                  <FormControl
                    type="text"
                    placeholder="What are you looking for?"
                    className="border-0 rounded-start-pill ps-4 pe-5 py-3 search-input"
                    style={{
                      fontSize: '16px',
                      minHeight: '52px',
                      backgroundColor: '#F8F9FA',
                      border: 'none',
                      boxShadow: 'none',
                      outline: 'none',
                    }}
                  />

                  <i
                    className="ci-camera position-absolute"
                    style={{
                      right: '60px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6c757d',
                      fontSize: '18px',
                      zIndex: 5,
                    }}
                  ></i>
                </div>

                <Button
                  variant="danger"
                  className="rounded-end-pill px-4 py-3 border-0 search-button"
                  style={{
                    backgroundColor: '#dc3545',
                    borderColor: '#dc3545',
                    minHeight: '52px',
                    fontSize: '15px',
                    fontWeight: '600',
                    border: 'none',
                    boxShadow: 'none',
                    marginLeft: '-1px',
                  }}
                >
                  Search
                </Button>
              </div>
            </Col>

            <Col lg={3}>
              <div className="d-flex gap-4 align-items-center justify-content-end">
                <Link href="/notifications" className="text-decoration-none">
                  <div className="text-center position-relative">
                    <i className="ci-bell fs-4 text-dark" style={{ fontSize: '20px', color: '#333' }}></i>
                    <div className="small text-dark" style={{ fontSize: '13px', marginTop: '4px', color: '#333' }}>
                      Notifications
                    </div>
                    <Badge
                      bg="danger"
                      className="position-absolute top-0 start-100 translate-middle rounded-pill"
                      style={{
                        fontSize: '10px',
                        padding: '2px 4px',
                        minWidth: '18px',
                        height: '18px',
                        backgroundColor: '#dc3545',
                      }}
                    >
                      1
                    </Badge>
                  </div>
                </Link>

                <Button variant="link" className="text-decoration-none p-0" onClick={() => handleAuthClick('login')}>
                  <div className="text-center">
                    <i className="ci-user fs-4 text-dark" style={{ fontSize: '20px', color: '#333' }}></i>
                    <div className="small text-dark" style={{ fontSize: '13px', marginTop: '4px', color: '#333' }}>
                      Log in
                    </div>
                  </div>
                </Button>

                <Link href="/account/orders" className="text-decoration-none">
                  <div className="text-center">
                    <i className="ci-package fs-4 text-dark" style={{ fontSize: '20px', color: '#333' }}></i>
                    <div className="small text-dark" style={{ fontSize: '13px', marginTop: '4px', color: '#333' }}>
                      My orders
                    </div>
                  </div>
                </Link>

                <Link href="/cart" className="text-decoration-none">
                  <div className="text-center position-relative">
                    <div className="position-relative">
                      <i className="ci-shopping-cart fs-4 text-dark" style={{ fontSize: '20px', color: '#333' }}></i>

                      <Badge
                        bg="danger"
                        className="position-absolute top-0 start-100 translate-middle rounded-pill"
                        style={{
                          fontSize: '10px',
                          padding: '2px 4px',
                          minWidth: '18px',
                          height: '18px',
                          backgroundColor: '#dc3545',
                        }}
                      >
                        3
                      </Badge>
                    </div>
                    <div className="small text-dark" style={{ fontSize: '13px', marginTop: '4px', color: '#333' }}>
                      Shopping cart
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
      <header className="bg-white border-bottom shadow-sm sticky-top">
        <Container>
          <Row className="align-items-center py-3">
            {/* LEFT SIDE: Logo + Menu */}
            <Col xs={6} lg={4} className="d-flex align-items-center">
              {/* Logo */}
              <Link href="/" className="d-flex align-items-center text-decoration-none me-3">
                <span className="h5 fw-bold text-danger mb-0">C</span>
                <span className="h5 fw-bold text-dark mb-0 ms-1">ARTZILLA</span>
              </Link>

              {/* Menu - mobile pe hide, lg se visible */}
              <nav className="d-none d-lg-flex gap-4">
                <Link href="/" className="text-dark fw-medium text-decoration-none">
                  Home
                </Link>
                <Link href="/shop/electronics/" className="text-muted fw-medium text-decoration-none">
                  Explore
                </Link>
              </nav>
            </Col>

            {/* CENTER: Search Bar */}
            <Col xs={12} lg={4} className="d-flex justify-content-center mt-3 mt-lg-0">
              <Form className="w-100" style={{ maxWidth: '400px' }}>
                <Form.Control type="text" placeholder="Search products..." className="rounded-pill" />
              </Form>
            </Col>

            {/* RIGHT SIDE: Cart, Wishlist, Login */}
            <Col xs={6} lg={4} className="d-flex justify-content-end align-items-center gap-2 gap-lg-3 mt-3 mt-lg-0">
              <Link href="/notifications" className="text-decoration-none position-relative">
                <i className="ci-bell text-dark" style={{ fontSize: '18px' }}></i>
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  // style={{
                  //   fontSize: '8px',
                  //   padding: '1px 3px',
                  //   minWidth: '12px',
                  //   height: '12px',
                  //   top: '-2px',
                  //   right: '-2px',
                  // }}
                >
                  1
                </Badge>
              </Link>
              {/* Cart */}
              <Link href="/cart" className="position-relative btn btn-light rounded-circle p-2">
                <i className="ci-shopping-cart fs-5 text-dark"></i>
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  3
                </Badge>
              </Link>

              {/* Notifications */}

              {/* Wishlist */}
              <Link href="/wishlist" className="btn btn-light rounded-circle p-2">
                <i className="ci-heart fs-5 text-dark"></i>
              </Link>

              {/* Login Button */}
              <Button
                onClick={() => handleAuthClick('login')}
                variant="outline-dark"
                className="fw-medium px-2 px-lg-3"
              >
                Sign in
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Category Navigation Bar - Perfect Spacing - Hidden on Mobile */}
      {/* <div className="bg-white border-top border-bottom d-none d-lg-block">
        <Container>
          <Row className="py-2">
            <Col>
              <div
                className="d-flex gap-3 align-items-center overflow-auto category-nav"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                
                <Button variant="outline-dark" size="sm" className="text-nowrap border me-3">
                  <i className="ci-menu me-1"></i>
                  All categories
                </Button>

                
                <Link
                  href="/outlet"
                  className="text-dark text-decoration-none small text-nowrap d-flex align-items-center me-4"
                >
                  <i className="ci-tag text-danger me-1"></i>
                  Outlet
                </Link>
                <Link
                  href="/free-gift"
                  className="text-dark text-decoration-none small text-nowrap d-flex align-items-center me-4"
                >
                  <i className="ci-gift text-danger me-1"></i>
                  Free gift with purchase
                </Link>

                
                {joomCategories.slice(2).map((category, index) => (
                  <Link
                    key={index}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-muted text-decoration-none text-nowrap small me-4"
                    style={{ fontSize: '13px' }}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}

      {/* Mobile Offcanvas Menu */}
      <Offcanvas show={showMobileMenu} onHide={() => setShowMobileMenu(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-3">
            {/* Account Links */}
            <div>
              <h6 className="fw-bold mb-3">Account</h6>
              <div className="d-flex flex-column gap-2">
                <Link href="/account" className="text-dark text-decoration-none py-2 border-bottom">
                  <i className="ci-user me-2"></i>
                  My Account
                </Link>
                <Link href="/account/orders" className="text-dark text-decoration-none py-2 border-bottom">
                  <i className="ci-package me-2"></i>
                  My Orders
                </Link>
                <Link href="/notifications" className="text-dark text-decoration-none py-2 border-bottom">
                  <i className="ci-bell me-2"></i>
                  Notifications
                </Link>
              </div>
            </div>

            {/* Help Links */}
            <div>
              <h6 className="fw-bold mb-3">Help</h6>
              <div className="d-flex flex-column gap-2">
                <Link href="/help" className="text-dark text-decoration-none py-2 border-bottom">
                  Help Centre
                </Link>
                <Link href="/delivery" className="text-dark text-decoration-none py-2 border-bottom">
                  Delivery
                </Link>
                <Link href="/warranty" className="text-dark text-decoration-none py-2 border-bottom">
                  Warranty
                </Link>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Auth Modal */}
      <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} initialMode={authMode} />

      <style jsx>{`
        .search-container {
          display: flex;
          align-items: center;
          border-radius: 50px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .search-input {
          background-color: #f8f9fa !important;
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
        }

        .search-button {
          border: none !important;
          box-shadow: none !important;
          margin-left: -1px !important;
        }

        .category-nav::-webkit-scrollbar {
          display: none;
        }

        /* Mobile specific styles */
        @media (max-width: 991px) {
          .search-container {
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </>
  )
}

export default HeaderElectronics

// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
// import FormControl from 'react-bootstrap/FormControl'
// import { Form } from 'react-bootstrap'
// import Badge from 'react-bootstrap/Badge'
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
// import Offcanvas from 'react-bootstrap/Offcanvas'
// import AuthModal from '@/components/auth/auth-modal'

// interface HeaderElectronicsProps {
//   logoHref?: string
//   isLoggedIn?: {
//     name: string
//     href: string
//   }
//   expandedCategories?: boolean
//   categories?: any[]
// }

// const HeaderElectronics = ({
//   logoHref = '/',
//   isLoggedIn,
//   expandedCategories,
//   categories,
// }: HeaderElectronicsProps = {}) => {
//   const [showMobileMenu, setShowMobileMenu] = useState(false)
//   const [showCategories, setShowCategories] = useState(false)
//   const [showAuthModal, setShowAuthModal] = useState(false)
//   const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

//   // Use provided categories or fallback to simplified ones
//   const joomCategories =
//     categories && categories.length > 0
//       ? categories.map((cat: any) => cat.name).slice(0, 20)
//       : [
//           'Outlet',
//           'Free gift with purchase',
//           'Xiaomi',
//           "Men's Fashion",
//           'Pet Supplies',
//           'Shoes',
//           'Home Improvement',
//           'Electronics',
//           'Smartphone Cases',
//           'Home Appliances',
//           'Home & Kitchen',
//           'Kids',
//           'Parties & Events',
//           'Beauty',
//           'Health',
//           'Bags & Suitcases',
//           "Women's Fashion",
//           'Office & School',
//           'Watches & Clocks',
//         ]

//   const handleAuthClick = (mode: 'login' | 'signup') => {
//     setAuthMode(mode)
//     setShowAuthModal(true)
//   }

//   return (
//     <>
//       {/* Mobile Header - Joom Style */}
//       <div className="bg-white border-bottom d-lg-none">
//         <Container fluid className="px-3">
//           <Row className="py-2 align-items-center">
//             {/* Left: Hamburger Menu + Logo */}
//             <Col xs={6} className="d-flex align-items-center">
//               <Button
//                 variant="link"
//                 className="text-dark text-decoration-none p-0 me-3"
//                 onClick={() => setShowMobileMenu(true)}
//               >
//                 <i className="ci-menu fs-4"></i>
//               </Button>
//               <Link href={logoHref} className="text-decoration-none d-flex align-items-center">
//                 <div className="d-flex align-items-center">
//                   <span className="h5 mb-0 fw-bold bg-danger text-white px-1 py-1 rounded me-1">C</span>
//                   <span className="h5 mb-0 fw-bold text-dark">ARTZILLA</span>
//                 </div>
//               </Link>
//             </Col>

//             {/* Right: Icons */}
//             <Col xs={6} className="d-flex align-items-center justify-content-end gap-2">
//               {/* Notifications */}
//               <Link href="/notifications" className="text-decoration-none position-relative">
//                 <i className="ci-bell text-dark" style={{ fontSize: '18px' }}></i>
//                 <Badge
//                   bg="danger"
//                   className="position-absolute top-0 start-100 translate-middle rounded-pill"
//                   style={{
//                     fontSize: '8px',
//                     padding: '1px 3px',
//                     minWidth: '12px',
//                     height: '12px',
//                     top: '-2px',
//                     right: '-2px',
//                   }}
//                 >
//                   1
//                 </Badge>
//               </Link>

//               {/* Profile */}
//               <Button variant="link" className="text-decoration-none p-0" onClick={() => handleAuthClick('login')}>
//                 <i className="ci-user text-dark" style={{ fontSize: '18px' }}></i>
//               </Button>

//               {/* Orders */}
//               <Link href="/account/orders" className="text-decoration-none">
//                 <i className="ci-package text-dark" style={{ fontSize: '18px' }}></i>
//               </Link>

//               {/* Cart */}
//               <Link href="/cart" className="text-decoration-none position-relative">
//                 <i className="ci-shopping-cart text-dark" style={{ fontSize: '18px' }}></i>
//                 <Badge
//                   bg="danger"
//                   className="position-absolute top-0 start-100 translate-middle rounded-pill"
//                   style={{
//                     fontSize: '8px',
//                     padding: '1px 3px',
//                     minWidth: '12px',
//                     height: '12px',
//                     top: '-2px',
//                     right: '-2px',
//                   }}
//                 >
//                   3
//                 </Badge>
//               </Link>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Desktop Header - Hidden on Mobile */}
//       {/* <div className="bg-white border-bottom d-none d-lg-block">
//         <Container>
//           <Row className="py-2 align-items-center">
//             <Col className="d-flex gap-4 align-items-center">

//               <div className="dropdown">
//                 <Button variant="link" className="text-dark text-decoration-none p-0 d-flex align-items-center">
//                   <i className="fi fi-gb me-1"></i>
//                   English
//                   <i className="ci-chevron-down ms-1 small"></i>
//                 </Button>
//               </div>

//               <div className="dropdown">
//                 <Button variant="link" className="text-dark text-decoration-none p-0 d-flex align-items-center">
//                   USD
//                   <i className="ci-chevron-down ms-1 small"></i>
//                 </Button>
//               </div>
//             </Col>
//             <Col className="text-center text-end">
//               <div className="d-flex gap-3 align-items-center justify-content-center justify-content-lg-end">
//                 <Link href="/help" className="text-dark text-decoration-none small">
//                   Help centre
//                 </Link>
//                 <Link href="/delivery" className="text-dark text-decoration-none small">
//                   Delivery
//                 </Link>
//                 <Link href="/warranty" className="text-dark text-decoration-none small">
//                   Warranty
//                 </Link>
//                 <Button variant="dark" size="sm" className="px-3 py-1">
//                   Cartzilla Geek
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div> */}
//       <div className="bg-dark text-white" style={{ backgroundColor: '#121212' }}>
//         <Container>
//           <Row className="py-2 align-items-center">
//             {/* Left Side */}
//             <Col
//               lg={4}
//               className="d-flex gap-4 align-items-center justify-content-lg-start justify-content-center mb-2 mb-lg-0"
//             >
//               {/* Language Dropdown */}
//               {/* <div className="dropdown">
//                 <Button variant="link" className="text-white text-decoration-none p-0 d-flex align-items-center">
//                   <i className="fi fi-gb me-1"></i>
//                   English
//                   <i className="ci-chevron-down ms-1 small"></i>
//                 </Button>
//               </div> */}

//               {/* Currency Dropdown */}
//               {/* <div className="dropdown">
//                 <Button variant="link" className="text-white text-decoration-none p-0 d-flex align-items-center">
//                   USD
//                   <i className="ci-chevron-down ms-1 small"></i>
//                 </Button>
//               </div> */}
//             </Col>

//             {/* Center Message */}
//             <Col lg={4} className="text-center mb-2 mb-lg-0">
//               <span className="small text-white fw-semibold">
//                 Download <span className="text-warning">Cartzilla Geek</span>. Available on iOS &amp; Android
//               </span>
//             </Col>

//             {/* Right Side */}
//             <Col lg={4} className="d-flex gap-3 align-items-center justify-content-lg-end justify-content-center">
//               {/* <Link href="/help" className="text-white text-decoration-none small">
//                 Help centre
//               </Link>
//               <Link href="/delivery" className="text-white text-decoration-none small">
//                 Delivery
//               </Link>
//               <Link href="/warranty" className="text-white text-decoration-none small">
//                 Warranty
//               </Link>
//               <Button variant="warning" size="sm" className="px-3 py-1 fw-semibold">
//                 Cartzilla Geek
//               </Button> */}
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Mobile Search Bar - Full Width on Mobile */}
//       <div className="bg-white border-bottom d-lg-none">
//         <Container fluid className="px-3">
//           <Row className="py-3">
//             <Col>
//               <div className="d-flex align-items-center search-container">
//                 <div className="position-relative d-flex flex-grow-1">
//                   <FormControl
//                     type="text"
//                     placeholder="What are you looking for?"
//                     className="border-0 rounded-pill ps-4 pe-5 py-3 search-input"
//                     style={{
//                       fontSize: '16px',
//                       minHeight: '48px',
//                       backgroundColor: '#F8F9FA',
//                       border: 'none',
//                       boxShadow: 'none',
//                       outline: 'none',
//                     }}
//                   />
//                   {/* Camera Icon inside search bar */}
//                   <i
//                     className="ci-camera position-absolute"
//                     style={{
//                       right: '5%',
//                       top: '50%',
//                       transform: 'translateY(-50%)',
//                       color: '#6c757d',
//                       fontSize: '16px',
//                       zIndex: 5,
//                     }}
//                   ></i>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Desktop Main Header - Hidden on Mobile */}
//       {/* <div className="bg-white d-none d-lg-block">
//         <Container>
//           <Row className="py-4 align-items-center">
//             <Col lg={3}>
//               <Link href={logoHref} className="text-decoration-none d-flex align-items-center">
//                 <div className="d-flex align-items-center">
//                   <span className="h2 mb-0 fw-bold bg-danger text-white px-2 py-1 rounded me-2">C</span>
//                   <span className="h2 mb-0 fw-bold text-dark">ARTZILLA</span>
//                 </div>
//               </Link>
//             </Col>

//             <Col lg={6}>
//               <div className="d-flex align-items-center search-container">
//                 <div className="position-relative d-flex flex-grow-1">
//                   <FormControl
//                     type="text"
//                     placeholder="What are you looking for?"
//                     className="border-0 rounded-start-pill ps-4 pe-5 py-3 search-input"
//                     style={{
//                       fontSize: '16px',
//                       minHeight: '52px',
//                       backgroundColor: '#F8F9FA',
//                       border: 'none',
//                       boxShadow: 'none',
//                       outline: 'none',
//                     }}
//                   />

//                   <i
//                     className="ci-camera position-absolute"
//                     style={{
//                       right: '60px',
//                       top: '50%',
//                       transform: 'translateY(-50%)',
//                       color: '#6c757d',
//                       fontSize: '18px',
//                       zIndex: 5,
//                     }}
//                   ></i>
//                 </div>

//                 <Button
//                   variant="danger"
//                   className="rounded-end-pill px-4 py-3 border-0 search-button"
//                   style={{
//                     backgroundColor: '#dc3545',
//                     borderColor: '#dc3545',
//                     minHeight: '52px',
//                     fontSize: '15px',
//                     fontWeight: '600',
//                     border: 'none',
//                     boxShadow: 'none',
//                     marginLeft: '-1px',
//                   }}
//                 >
//                   Search
//                 </Button>
//               </div>
//             </Col>

//             <Col lg={3}>
//               <div className="d-flex gap-4 align-items-center justify-content-end">
//                 <Link href="/notifications" className="text-decoration-none">
//                   <div className="text-center position-relative">
//                     <i className="ci-bell fs-4 text-dark" style={{ fontSize: '20px', color: '#333' }}></i>
//                     <div className="small text-dark" style={{ fontSize: '13px', marginTop: '4px', color: '#333' }}>
//                       Notifications
//                     </div>
//                     <Badge
//                       bg="danger"
//                       className="position-absolute top-0 start-100 translate-middle rounded-pill"
//                       style={{
//                         fontSize: '10px',
//                         padding: '2px 4px',
//                         minWidth: '18px',
//                         height: '18px',
//                         backgroundColor: '#dc3545',
//                       }}
//                     >
//                       1
//                     </Badge>
//                   </div>
//                 </Link>

//                 <Button variant="link" className="text-decoration-none p-0" onClick={() => handleAuthClick('login')}>
//                   <div className="text-center">
//                     <i className="ci-user fs-4 text-dark" style={{ fontSize: '20px', color: '#333' }}></i>
//                     <div className="small text-dark" style={{ fontSize: '13px', marginTop: '4px', color: '#333' }}>
//                       Log in
//                     </div>
//                   </div>
//                 </Button>

//                 <Link href="/account/orders" className="text-decoration-none">
//                   <div className="text-center">
//                     <i className="ci-package fs-4 text-dark" style={{ fontSize: '20px', color: '#333' }}></i>
//                     <div className="small text-dark" style={{ fontSize: '13px', marginTop: '4px', color: '#333' }}>
//                       My orders
//                     </div>
//                   </div>
//                 </Link>

//                 <Link href="/cart" className="text-decoration-none">
//                   <div className="text-center position-relative">
//                     <div className="position-relative">
//                       <i className="ci-shopping-cart fs-4 text-dark" style={{ fontSize: '20px', color: '#333' }}></i>

//                       <Badge
//                         bg="danger"
//                         className="position-absolute top-0 start-100 translate-middle rounded-pill"
//                         style={{
//                           fontSize: '10px',
//                           padding: '2px 4px',
//                           minWidth: '18px',
//                           height: '18px',
//                           backgroundColor: '#dc3545',
//                         }}
//                       >
//                         3
//                       </Badge>
//                     </div>
//                     <div className="small text-dark" style={{ fontSize: '13px', marginTop: '4px', color: '#333' }}>
//                       Shopping cart
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div> */}
//       <header className="bg-white border-bottom shadow-sm sticky-top">
//         <Container>
//           <Row className="align-items-center py-3">
//             {/* LEFT SIDE: Logo + Menu */}
//             <Col xs={6} lg={4} className="d-flex align-items-center">
//               {/* Logo */}
//               <Link href="/" className="d-flex align-items-center text-decoration-none me-3">
//                 <span className="h5 fw-bold text-danger mb-0">C</span>
//                 <span className="h5 fw-bold text-dark mb-0 ms-1">ARTZILLA</span>
//               </Link>

//               {/* Menu - mobile pe hide, lg se visible */}
//               <nav className="d-none d-lg-flex gap-4">
//                 <Link href="/" className="text-dark fw-medium text-decoration-none">
//                   Home
//                 </Link>
//                 <Link href="/categories" className="text-muted fw-medium text-decoration-none">
//                   Explore
//                 </Link>
//               </nav>
//             </Col>

//             {/* CENTER: Search Bar */}
//             <Col xs={12} lg={4} className="d-flex justify-content-center mt-3 mt-lg-0">
//               <Form className="w-100" style={{ maxWidth: '400px' }}>
//                 <Form.Control type="text" placeholder="Search products..." className="rounded-pill" />
//               </Form>
//             </Col>

//             {/* RIGHT SIDE: Cart, Wishlist, Login */}
//             <Col xs={6} lg={4} className="d-flex justify-content-end align-items-center gap-2 gap-lg-3 mt-3 mt-lg-0">
//               {/* Cart */}
//               <Link href="/cart" className="position-relative btn btn-light rounded-circle p-2">
//                 <i className="ci-shopping-cart fs-5 text-dark"></i>
//                 <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
//                   3
//                 </Badge>
//               </Link>

//               {/* Wishlist */}
//               <Link href="/wishlist" className="btn btn-light rounded-circle p-2">
//                 <i className="ci-heart fs-5 text-dark"></i>
//               </Link>

//               {/* Login Button */}
//               <Button variant="outline-dark" className="fw-medium px-2 px-lg-3">
//                 Sign in
//               </Button>
//             </Col>
//           </Row>
//         </Container>
//       </header>

//       {/* Category Navigation Bar - Perfect Spacing - Hidden on Mobile */}
//       {/* <div className="bg-white border-top border-bottom d-none d-lg-block">
//         <Container>
//           <Row className="py-2">
//             <Col>
//               <div
//                 className="d-flex gap-3 align-items-center overflow-auto category-nav"
//                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//               >

//                 <Button variant="outline-dark" size="sm" className="text-nowrap border me-3">
//                   <i className="ci-menu me-1"></i>
//                   All categories
//                 </Button>

//                 <Link
//                   href="/outlet"
//                   className="text-dark text-decoration-none small text-nowrap d-flex align-items-center me-4"
//                 >
//                   <i className="ci-tag text-danger me-1"></i>
//                   Outlet
//                 </Link>
//                 <Link
//                   href="/free-gift"
//                   className="text-dark text-decoration-none small text-nowrap d-flex align-items-center me-4"
//                 >
//                   <i className="ci-gift text-danger me-1"></i>
//                   Free gift with purchase
//                 </Link>

//                 {joomCategories.slice(2).map((category, index) => (
//                   <Link
//                     key={index}
//                     href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
//                     className="text-muted text-decoration-none text-nowrap small me-4"
//                     style={{ fontSize: '13px' }}
//                   >
//                     {category}
//                   </Link>
//                 ))}
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div> */}

//       {/* Mobile Offcanvas Menu */}
//       <Offcanvas show={showMobileMenu} onHide={() => setShowMobileMenu(false)} placement="start">
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Menu</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <div className="d-flex flex-column gap-3">
//             {/* Account Links */}
//             <div>
//               <h6 className="fw-bold mb-3">Account</h6>
//               <div className="d-flex flex-column gap-2">
//                 <Link href="/account" className="text-dark text-decoration-none py-2 border-bottom">
//                   <i className="ci-user me-2"></i>
//                   My Account
//                 </Link>
//                 <Link href="/account/orders" className="text-dark text-decoration-none py-2 border-bottom">
//                   <i className="ci-package me-2"></i>
//                   My Orders
//                 </Link>
//                 <Link href="/notifications" className="text-dark text-decoration-none py-2 border-bottom">
//                   <i className="ci-bell me-2"></i>
//                   Notifications
//                 </Link>
//               </div>
//             </div>

//             {/* Help Links */}
//             <div>
//               <h6 className="fw-bold mb-3">Help</h6>
//               <div className="d-flex flex-column gap-2">
//                 <Link href="/help" className="text-dark text-decoration-none py-2 border-bottom">
//                   Help Centre
//                 </Link>
//                 <Link href="/delivery" className="text-dark text-decoration-none py-2 border-bottom">
//                   Delivery
//                 </Link>
//                 <Link href="/warranty" className="text-dark text-decoration-none py-2 border-bottom">
//                   Warranty
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </Offcanvas.Body>
//       </Offcanvas>

//       {/* Auth Modal */}
//       <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} initialMode={authMode} />

//       <style jsx>{`
//         .search-container {
//           display: flex;
//           align-items: center;
//           border-radius: 50px;
//           overflow: hidden;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }

//         .search-input {
//           background-color: #f8f9fa !important;
//           border: none !important;
//           box-shadow: none !important;
//           outline: none !important;
//         }

//         .search-button {
//           border: none !important;
//           box-shadow: none !important;
//           margin-left: -1px !important;
//         }

//         .category-nav::-webkit-scrollbar {
//           display: none;
//         }

//         /* Mobile specific styles */
//         @media (max-width: 991px) {
//           .search-container {
//             box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
//           }
//         }
//       `}</style>
//     </>
//   )
// }

// export default HeaderElectronics
