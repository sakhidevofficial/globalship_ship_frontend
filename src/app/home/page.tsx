import Link from 'next/link'
import Image from 'next/image'
import HeaderElectronics from '@/components/layout/header-electronics'
import WeeklyPromotionSection from './special-offers'
import SubscriptionVlogElectronics from '@/components/shop/subscription-vlog-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import CustomFooter from '@/components/layout/custom-footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink'
import BrandsSection from '../brands/BrandsSection'
import { ProductService, Product as ServiceProduct } from '@/services/products'
import { CategoriesProvider } from '@/contexts/categories-context'
import Button from 'react-bootstrap/Button'
import React from 'react'
import AcrossBordersSection from '@/components/sections/across-borders-section'
import HeroBannerJoom from '@/app/home/hero-slider'
import HeroSearchGrid from '@/app/home/HeroSearchGrid'
import TestCard from '@/app/home/TestCard'

export const revalidate = 60 // ISR: Regenerate every 60 seconds

type Store = {
  id: number
  name: string
  slug: string
}

type Product = ServiceProduct & {
  store?: Store
  image_url?: string
  original_price?: number
  price_formatted?: string
  original_price_formatted?: string
}

type HomeData = {
  featuredProducts: Product[]
  trendingProducts: Product[]
  categories: any[]
  brands: any[]
}

async function fetchHomeData() {
  try {
    // Fetch all data on the server
    const [featured, trending, categoriesData, brandsData] = await Promise.all([
      ProductService.getProducts({ page: 1, per_page: 8 }),
      ProductService.getProducts({ page: 2, per_page: 8 }),
      ProductService.getCategories(),
      ProductService.getBrands(),
    ])
    return {
      featuredProducts: (featured.data || []) as Product[],
      trendingProducts: (trending.data || []) as Product[],
      categories: categoriesData.data || [],
      brands: brandsData.data || [],
    }
  } catch (error) {
    console.warn('Failed to fetch home data:', error)
    // Return empty arrays as fallback
    return {
      featuredProducts: [] as Product[],
      trendingProducts: [] as Product[],
      categories: [],
      brands: [],
    }
  }
}

export default async function ElectronicsHomePage() {
  const data = await fetchHomeData()
  const featuredProducts = data.featuredProducts
  const trendingProducts = data.trendingProducts
  const categories = data.categories
  const brands = data.brands
  const storeSet = new Set(featuredProducts.map((product) => product?.store?.name).filter(Boolean))
  const stores = [...storeSet]
  // const filteredProducts = featuredProducts.filter(product => stores.includes(product.store.name));

  // console.log(filteredProducts)

  // console.log(
  //   'products',
  //   featuredProducts?.filter((product) => product.store.name === 'Stouffer')
  // )

  // console.log('Store Set:', storeSet)

  // console.log('Featured Products:', featuredProducts)
  // console.log('Trending Products:', trendingProducts)
  // console.log('Categories:', categories)
  // console.log('Brands:', brands)

  // Transform categories for header component
  const transformedCategories = categories.map((category) => ({
    ...category,
    href: `/shop/${category.slug}`,
    subcategories: [], // Add subcategories if needed
    parent_id: category.parent_id || 0, // Ensure parent_id is always a number
  }))

  return (
    <CategoriesProvider>
      {/* Navigation bar (Page header) */}
      <HeaderElectronics logoHref="/" expandedCategories categories={transformedCategories} />

      {/* Page content */}
      <main className="content-wrapper">
        {/* Hero Banner - Joom Style Outlet */}
        <div style={{ marginTop: '40px' }}>
          <HeroSearchGrid />
        </div>
        {/* Weekly Promotion Section - EXACT Joom Layout: 3 simple cards */}
        {/* <Container as="section" className="py-4 mt-3">
          <h4 className="mb-4">Weekly promotion</h4>
          <Row className="g-3">
            <Col lg={4}>
              <div className="bg-light rounded-3 p-4 h-100" style={{ backgroundColor: '#fff8e1' }}>
                <h5 className="mb-2">Bestsellers</h5>
                <p className="text-muted small mb-3">Summer Sale</p>

                <div className="text-center">
                  <div
                    className="rounded mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#ff5f14',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                    }}
                  >
                    Bestsellers
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="bg-light rounded-3 p-4 h-100" style={{ backgroundColor: '#fff8e1' }}>
                <h5 className="mb-2">Hot deals</h5>
                <p className="text-muted small mb-3">Summer Sale</p>

                <div className="text-center">
                  <div
                    className="rounded mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#ff5f14',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                    }}
                  >
                    Hot deals
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="bg-light rounded-3 p-4 h-100" style={{ backgroundColor: '#fff8e1' }}>
                <h5 className="mb-2">All sale items</h5>
                <p className="text-muted small mb-3">Summer Sale</p>

                <div className="text-center">
                  <div
                    className="rounded mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: '#ff5f14',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                    }}
                  >
                    All sale items
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container> */}
        <Container className="py-5">
          {/* <TestCard  /> */}
          {stores?.map((store, index) => (
            <Row className="mb-5 mx-auto" style={{ width: '80%' }} key={index}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <img
                    alt={store}
                    className="rounded-3 me-3"
                    style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 className="mb-0">{store}</h5>
                    <small className="text-muted">⭐ 4.3 (345.9K)</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button size="sm" variant="dark" className="rounded-pill">
                    Follow
                  </Button>
                  <Button size="sm" variant="light" className="rounded-circle">
                    <i className="bi bi-three-dots"></i>
                  </Button>
                </div>
              </div>

              {featuredProducts
                ?.filter((product) => product?.store?.name === store)
                .slice(0, 6) // 👈 limit to 5 products
                .map((product, i) => (
                  <Col key={i} md={2}>
                    <Link href={ProductService.getProductUrl(product)} className="text-decoration-none">
                      <TestCard e={product} />
                    </Link>
                  </Col>
                ))}
            </Row>
          ))}
        </Container>

        {/* The Populars Section - 2x3 Grid with Left Vertical Banner */}
        {/* <Container as="section" className="py-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h4 className="mb-0">The populars</h4>
            <Link href="/shop" className="text-decoration-none small">
              All products
            </Link>
          </div>

          <Row className="g-3">
            <Col lg={3}>
              <div
                className="bg-light rounded-3 p-4 h-100 position-relative"
                style={{
                  background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
                  minHeight: '400px',
                }}
              >
                <div className="text-center text-white h-100 d-flex flex-column justify-content-center">
                  <h5 className="mb-3 fw-bold">Special Offers</h5>
                  <p className="mb-4 opacity-75">Exclusive deals just for you</p>

                  
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <span className="fs-1 me-3">👟</span>
                      <span className="fs-1">💧</span>
                    </div>
                  </div>

                  <h6 className="mb-2">Low prices on trending items</h6>
                  <p className="mb-3 opacity-75">Summer Sale</p>

                  <Button variant="light" size="sm" className="mt-auto">
                    Shop Now
                  </Button>
                </div>
              </div>
            </Col>

            
            <Col lg={9}>
              <Row className="g-3 h-100">
                {trendingProducts.slice(0, 6).map((product, index) => (
                  <Col lg={4} md={6} sm={6} xs={6} key={product.id}>
                    <Link href={ProductService.getProductUrl(product)} className="text-decoration-none">
                      <div className="bg-white border rounded-3 p-3 h-100 text-center product-card position-relative">
                        
                        <div className="position-absolute top-0 end-0 m-2">
                          <i className="ci-heart text-muted" style={{ fontSize: '16px', cursor: 'pointer' }}></i>
                        </div>

                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={ProductService.getProductImage(product)}
                            width={80}
                            height={80}
                            alt={product.name}
                            className="mb-2 img-fluid"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div
                            className="bg-light rounded mb-2 d-flex align-items-center justify-content-center"
                            style={{ height: '80px' }}
                          >
                            <span className="text-muted small">No Image</span>
                          </div>
                        )}
                        <h6 className="small mb-1 text-dark text-truncate" style={{ fontSize: '12px' }}>
                          {product.name}
                        </h6>
                        <p className="text-danger fw-bold mb-1">
                          ${ProductService.getProductPrice(product).toFixed(2)}
                        </p>
                        <div className="d-flex align-items-center justify-content-center mb-2">
                          <div className="text-warning me-1" style={{ fontSize: '12px' }}>
                            ★★★★
                          </div>
                          <small className="text-muted">(85)</small>
                        </div>
                        
                        <div className="text-center">
                          <i className="ci-cart text-muted" style={{ fontSize: '16px', cursor: 'pointer' }}></i>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container> */}
        {/* Across Borders Section - With Pagination */}
        {/* <Container as="section" className="py-4">
          <h5 className="mb-4">Across borders</h5>

          <AcrossBordersSection />
        </Container> */}
        {/* Our Top Picks Section - Multiple Rows */}
        {/* <Container as="section" className="py-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0">Our top picks just for you</h5>
            <Link href="/shop" className="text-decoration-none small">
              All products
            </Link>
          </div>

          
          {[0, 6, 12, 18].map((startIndex) => (
            <Row className="g-3 mb-4" key={startIndex}>
              {featuredProducts.slice(startIndex, startIndex + 6).map((product) => (
                <Col xl={2} lg={3} md={4} sm={6} xs={6} key={product.id}>
                  <Link href={ProductService.getProductUrl(product)} className="text-decoration-none">
                    <div className="bg-white border rounded-3 p-3 text-center h-100 position-relative">
                      
                      <div className="position-absolute top-0 end-0 m-2">
                        <i className="ci-heart text-muted" style={{ fontSize: '14px', cursor: 'pointer' }}></i>
                      </div>

                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={ProductService.getProductImage(product)}
                          width={80}
                          height={80}
                          alt={product.name}
                          className="mb-2"
                        />
                      ) : (
                        <div
                          className="bg-light rounded mb-2 d-flex align-items-center justify-content-center"
                          style={{ height: '80px' }}
                        >
                          <span className="text-muted small">No Image</span>
                        </div>
                      )}
                      <h6 className="small mb-1 text-dark text-truncate">{product.name}</h6>
                      <p className="text-danger fw-bold mb-1">${ProductService.getProductPrice(product).toFixed(2)}</p>
                      <div className="d-flex align-items-center justify-content-center mb-2">
                        <div className="text-warning me-1">★★★★</div>
                        <small className="text-muted">(42)</small>
                      </div>
                      
                      <div className="text-center">
                        <i className="ci-cart text-muted" style={{ fontSize: '14px', cursor: 'pointer' }}></i>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          ))}

          
          <div className="text-center mt-4">
            <Button variant="dark" size="lg" className="px-5 py-3">
              Show more
            </Button>
          </div>
        </Container> */}
        {/* Newsletter Signup Section - Full Width with Theme Colors */}
        {/* <section className="py-4" style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)' }}>
          <Container>
            <div className="text-center">
              <h3 className="h4 mb-2 fw-bold text-white">Stay Updated with Cartzilla</h3>
              <p className="text-white mb-3" style={{ fontSize: '14px' }}>
                Subscribe to our newsletter and get the latest deals, product updates, and exclusive offers delivered to
                your inbox.
              </p>
              <form className="d-flex flex-column flex-sm-row gap-2 justify-content-center align-items-center">
                <div className="flex-grow-1" style={{ maxWidth: '350px' }}>
                  <input
                    type="email"
                    className="form-control border-0"
                    placeholder="Enter your email address"
                    style={{
                      height: '48px',
                      fontSize: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn border-0 px-4"
                  style={{
                    height: '48px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                  }}
                >
                  Subscribe Now
                </button>
              </form>
              <p className="text-white small mt-2 mb-0" style={{ fontSize: '12px' }}>
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </Container>
        </section> */}
        {/* Footer */}
        {/* <FooterElectronics /> */}
        <CustomFooter />
      </main>
    </CategoriesProvider>
  )
}

// import Link from 'next/link'
// import Image from 'next/image'
// import HeaderElectronics from '@/components/layout/header-electronics'
// import WeeklyPromotionSection from './special-offers'
// import SubscriptionVlogElectronics from '@/components/shop/subscription-vlog-electronics'
// import FooterElectronics from '@/components/layout/footer-electronics'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Card from 'react-bootstrap/Card'
// import Nav from 'react-bootstrap/Nav'
// import NavLink from 'react-bootstrap/NavLink'
// import BrandsSection from '../brands/BrandsSection'
// import { ProductService } from '@/services/products'
// import { CategoriesProvider } from '@/contexts/categories-context'
// import Button from 'react-bootstrap/Button'
// import React from 'react'
// import AcrossBordersSection from '@/components/sections/across-borders-section'
// import HeroBannerJoom from '@/app/home/hero-slider'
// import HeroSearchGrid from '@/app/home/HeroSearchGrid'
// import TestCard from '@/app/home/TestCard'

// export const revalidate = 60 // ISR: Regenerate every 60 seconds

// async function fetchHomeData() {
//   try {
//     // Fetch all data on the server
//     const [featured, trending, categoriesData, brandsData] = await Promise.all([
//       ProductService.getProducts({ page: 1, per_page: 8 }),
//       ProductService.getProducts({ page: 2, per_page: 8 }),
//       ProductService.getCategories(),
//       ProductService.getBrands(),
//     ])
//     return {
//       featuredProducts: featured.data || [],
//       trendingProducts: trending.data || [],
//       categories: categoriesData.data || [],
//       brands: brandsData.data || [],
//     }
//   } catch (error) {
//     console.warn('Failed to fetch home data:', error)
//     // Return empty arrays as fallback
//     return {
//       featuredProducts: [],
//       trendingProducts: [],
//       categories: [],
//       brands: [],
//     }
//   }
// }

// export default async function ElectronicsHomePage() {
//   const data = await fetchHomeData()
//   const featuredProducts = data.featuredProducts
//   const trendingProducts = data.trendingProducts
//   const categories = data.categories
//   const brands = data.brands

//   console.log('Featured Products:', featuredProducts)
//   console.log('Trending Products:', trendingProducts)
//   console.log('Categories:', categories)
//   console.log('Brands:', brands)

//   // Transform categories for header component
//   const transformedCategories = categories.map((category) => ({
//     ...category,
//     href: `/shop/${category.slug}`,
//     subcategories: [], // Add subcategories if needed
//     parent_id: category.parent_id || 0, // Ensure parent_id is always a number
//   }))

//   return (
//     <CategoriesProvider>
//       {/* Navigation bar (Page header) */}
//       <HeaderElectronics logoHref="/" expandedCategories categories={transformedCategories} />

//       {/* Page content */}
//       <main className="content-wrapper">
//         {/* Hero Banner - Joom Style Outlet */}
//         <div style={{ marginTop: '40px' }}>
//           <HeroSearchGrid />
//         </div>
//         {/* Weekly Promotion Section - EXACT Joom Layout: 3 simple cards */}
//         {/* <Container as="section" className="py-4 mt-3">
//           <h4 className="mb-4">Weekly promotion</h4>
//           <Row className="g-3">
//             <Col lg={4}>
//               <div className="bg-light rounded-3 p-4 h-100" style={{ backgroundColor: '#fff8e1' }}>
//                 <h5 className="mb-2">Bestsellers</h5>
//                 <p className="text-muted small mb-3">Summer Sale</p>

//                 <div className="text-center">
//                   <div
//                     className="rounded mb-3 mx-auto d-flex align-items-center justify-content-center"
//                     style={{
//                       width: '100%',
//                       height: '200px',
//                       backgroundColor: '#ff5f14',
//                       color: 'white',
//                       fontSize: '18px',
//                       fontWeight: '600',
//                     }}
//                   >
//                     Bestsellers
//                   </div>
//                 </div>
//               </div>
//             </Col>

//             <Col lg={4}>
//               <div className="bg-light rounded-3 p-4 h-100" style={{ backgroundColor: '#fff8e1' }}>
//                 <h5 className="mb-2">Hot deals</h5>
//                 <p className="text-muted small mb-3">Summer Sale</p>

//                 <div className="text-center">
//                   <div
//                     className="rounded mb-3 mx-auto d-flex align-items-center justify-content-center"
//                     style={{
//                       width: '100%',
//                       height: '200px',
//                       backgroundColor: '#ff5f14',
//                       color: 'white',
//                       fontSize: '18px',
//                       fontWeight: '600',
//                     }}
//                   >
//                     Hot deals
//                   </div>
//                 </div>
//               </div>
//             </Col>

//             <Col lg={4}>
//               <div className="bg-light rounded-3 p-4 h-100" style={{ backgroundColor: '#fff8e1' }}>
//                 <h5 className="mb-2">All sale items</h5>
//                 <p className="text-muted small mb-3">Summer Sale</p>

//                 <div className="text-center">
//                   <div
//                     className="rounded mb-3 mx-auto d-flex align-items-center justify-content-center"
//                     style={{
//                       width: '100%',
//                       height: '200px',
//                       backgroundColor: '#ff5f14',
//                       color: 'white',
//                       fontSize: '18px',
//                       fontWeight: '600',
//                     }}
//                   >
//                     All sale items
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container> */}
//         <Container className="py-5">
//           <TestCard />
//         </Container>

//         {/* The Populars Section - 2x3 Grid with Left Vertical Banner */}
//         <Container as="section" className="py-4">
//           <div className="d-flex align-items-center justify-content-between mb-4">
//             <h4 className="mb-0">The populars</h4>
//             <Link href="/shop" className="text-decoration-none small">
//               All products
//             </Link>
//           </div>

//           <Row className="g-3">
//             {/* Left Vertical Banner - Spans 2 rows, original size */}
//             <Col lg={3}>
//               <div
//                 className="bg-light rounded-3 p-4 h-100 position-relative"
//                 style={{
//                   background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
//                   minHeight: '400px',
//                 }}
//               >
//                 <div className="text-center text-white h-100 d-flex flex-column justify-content-center">
//                   <h5 className="mb-3 fw-bold">Special Offers</h5>
//                   <p className="mb-4 opacity-75">Exclusive deals just for you</p>

//                   {/* Sneaker and water bottle illustration */}
//                   <div className="mb-4">
//                     <div className="d-flex align-items-center justify-content-center mb-3">
//                       <span className="fs-1 me-3">👟</span>
//                       <span className="fs-1">💧</span>
//                     </div>
//                   </div>

//                   <h6 className="mb-2">Low prices on trending items</h6>
//                   <p className="mb-3 opacity-75">Summer Sale</p>

//                   <Button variant="light" size="sm" className="mt-auto">
//                     Shop Now
//                   </Button>
//                 </div>
//               </div>
//             </Col>

//             {/* Right Products Grid - 2 rows (6 products) */}
//             <Col lg={9}>
//               <Row className="g-3 h-100">
//                 {trendingProducts.slice(0, 6).map((product, index) => (
//                   <Col lg={4} md={6} sm={6} xs={6} key={product.id}>
//                     <Link href={ProductService.getProductUrl(product)} className="text-decoration-none">
//                       <div className="bg-white border rounded-3 p-3 h-100 text-center product-card position-relative">
//                         {/* Heart icon - top right */}
//                         <div className="position-absolute top-0 end-0 m-2">
//                           <i className="ci-heart text-muted" style={{ fontSize: '16px', cursor: 'pointer' }}></i>
//                         </div>

//                         {product.images && product.images.length > 0 ? (
//                           <Image
//                             src={ProductService.getProductImage(product)}
//                             width={80}
//                             height={80}
//                             alt={product.name}
//                             className="mb-2 img-fluid"
//                             style={{ objectFit: 'cover' }}
//                           />
//                         ) : (
//                           <div
//                             className="bg-light rounded mb-2 d-flex align-items-center justify-content-center"
//                             style={{ height: '80px' }}
//                           >
//                             <span className="text-muted small">No Image</span>
//                           </div>
//                         )}
//                         <h6 className="small mb-1 text-dark text-truncate" style={{ fontSize: '12px' }}>
//                           {product.name}
//                         </h6>
//                         <p className="text-danger fw-bold mb-1">
//                           ${ProductService.getProductPrice(product).toFixed(2)}
//                         </p>
//                         <div className="d-flex align-items-center justify-content-center mb-2">
//                           <div className="text-warning me-1" style={{ fontSize: '12px' }}>
//                             ★★★★
//                           </div>
//                           <small className="text-muted">(85)</small>
//                         </div>
//                         {/* Shopping cart icon - bottom */}
//                         <div className="text-center">
//                           <i className="ci-cart text-muted" style={{ fontSize: '16px', cursor: 'pointer' }}></i>
//                         </div>
//                       </div>
//                     </Link>
//                   </Col>
//                 ))}
//               </Row>
//             </Col>
//           </Row>
//         </Container>
//         {/* Across Borders Section - With Pagination */}
//         <Container as="section" className="py-4">
//           <h5 className="mb-4">Across borders</h5>

//           {/* Countries Data - Add your 6 country images here */}
//           <AcrossBordersSection />
//         </Container>
//         {/* Our Top Picks Section - Multiple Rows */}
//         <Container as="section" className="py-4">
//           <div className="d-flex align-items-center justify-content-between mb-4">
//             <h5 className="mb-0">Our top picks just for you</h5>
//             <Link href="/shop" className="text-decoration-none small">
//               All products
//             </Link>
//           </div>

//           {/* Multiple rows of products */}
//           {[0, 6, 12, 18].map((startIndex) => (
//             <Row className="g-3 mb-4" key={startIndex}>
//               {featuredProducts.slice(startIndex, startIndex + 6).map((product) => (
//                 <Col xl={2} lg={3} md={4} sm={6} xs={6} key={product.id}>
//                   <Link href={ProductService.getProductUrl(product)} className="text-decoration-none">
//                     <div className="bg-white border rounded-3 p-3 text-center h-100 position-relative">
//                       {/* Heart icon - top right */}
//                       <div className="position-absolute top-0 end-0 m-2">
//                         <i className="ci-heart text-muted" style={{ fontSize: '14px', cursor: 'pointer' }}></i>
//                       </div>

//                       {product.images && product.images.length > 0 ? (
//                         <Image
//                           src={ProductService.getProductImage(product)}
//                           width={80}
//                           height={80}
//                           alt={product.name}
//                           className="mb-2"
//                         />
//                       ) : (
//                         <div
//                           className="bg-light rounded mb-2 d-flex align-items-center justify-content-center"
//                           style={{ height: '80px' }}
//                         >
//                           <span className="text-muted small">No Image</span>
//                         </div>
//                       )}
//                       <h6 className="small mb-1 text-dark text-truncate">{product.name}</h6>
//                       <p className="text-danger fw-bold mb-1">${ProductService.getProductPrice(product).toFixed(2)}</p>
//                       <div className="d-flex align-items-center justify-content-center mb-2">
//                         <div className="text-warning me-1">★★★★</div>
//                         <small className="text-muted">(42)</small>
//                       </div>
//                       {/* Shopping cart icon - bottom */}
//                       <div className="text-center">
//                         <i className="ci-cart text-muted" style={{ fontSize: '14px', cursor: 'pointer' }}></i>
//                       </div>
//                     </div>
//                   </Link>
//                 </Col>
//               ))}
//             </Row>
//           ))}

//           {/* Show more button - exactly like Joom.com */}
//           <div className="text-center mt-4">
//             <Button variant="dark" size="lg" className="px-5 py-3">
//               Show more
//             </Button>
//           </div>
//         </Container>
//         {/* Newsletter Signup Section - Full Width with Theme Colors */}
//         <section className="py-4" style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)' }}>
//           <Container>
//             <div className="text-center">
//               <h3 className="h4 mb-2 fw-bold text-white">Stay Updated with Cartzilla</h3>
//               <p className="text-white mb-3" style={{ fontSize: '14px' }}>
//                 Subscribe to our newsletter and get the latest deals, product updates, and exclusive offers delivered to
//                 your inbox.
//               </p>
//               <form className="d-flex flex-column flex-sm-row gap-2 justify-content-center align-items-center">
//                 <div className="flex-grow-1" style={{ maxWidth: '350px' }}>
//                   <input
//                     type="email"
//                     className="form-control border-0"
//                     placeholder="Enter your email address"
//                     style={{
//                       height: '48px',
//                       fontSize: '14px',
//                       backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                     }}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn border-0 px-4"
//                   style={{
//                     height: '48px',
//                     backgroundColor: '#dc3545',
//                     color: 'white',
//                     fontWeight: '600',
//                     fontSize: '14px',
//                   }}
//                 >
//                   Subscribe Now
//                 </button>
//               </form>
//               <p className="text-white small mt-2 mb-0" style={{ fontSize: '12px' }}>
//                 By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
//               </p>
//             </div>
//           </Container>
//         </section>
//         {/* Footer */}
//         <FooterElectronics />
//       </main>
//     </CategoriesProvider>
//   )
// }
