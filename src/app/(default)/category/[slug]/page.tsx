import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { ProductService } from '@/services/products'
import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  // Decode the slug back to readable format
  const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  try {
    // Fetch products from the backend API
    const productsResponse = await ProductService.getProducts()
    
    // Filter products by category based on the Product interface structure
    const categoryProducts = productsResponse.data.filter(product => 
      product.categories?.some(cat => 
        cat.name?.toLowerCase().includes(categoryName.toLowerCase())
      ) ||
      product.name?.toLowerCase().includes(categoryName.toLowerCase())
    )
    
    // If no products found, show a message
    if (categoryProducts.length === 0) {
      return (
        <>
          <HeaderElectronics />
          <div className="bg-light min-vh-100">
            <Container className="py-5">
              <Row className="text-center">
                <Col xs={12}>
                  <div className="bg-white rounded-4 p-5 shadow-sm">
                    <h1 className="h2 mb-3">No Products Found</h1>
                    <p className="text-muted mb-4">
                      We couldn't find any products in the "{categoryName}" category.
                    </p>
                    <Link href="/" className="btn btn-primary">
                      Back to Home
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <FooterElectronics />
        </>
      )
    }

    return (
      <>
        <HeaderElectronics />
        <div className="bg-light min-vh-100">
          {/* Hero Section */}
          <div className="bg-primary text-white py-5">
            <Container>
              <Row className="text-center">
                <Col xs={12}>
                  <h1 className="display-4 fw-bold mb-3">{categoryName}</h1>
                  <p className="lead mb-4">
                    Discover amazing products in {categoryName}
                  </p>
                  <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
                    {categoryProducts.length} Products
                  </Badge>
                </Col>
              </Row>
            </Container>
          </div>

          <Container className="py-5">
            {/* Category Description */}
            <Row className="mb-5">
              <Col xs={12}>
                <div className="bg-white rounded-4 p-4 shadow-sm">
                  <h2 className="h4 mb-3">About {categoryName}</h2>
                  <p className="text-muted mb-0">
                    Explore our curated collection of {categoryName.toLowerCase()} products. 
                    We offer the best quality items with competitive prices and excellent customer service.
                  </p>
                </div>
              </Col>
            </Row>

            {/* Products Grid */}
            <Row className="mb-5">
              <Col xs={12}>
                <h2 className="h3 mb-4">Products in {categoryName}</h2>
              </Col>
              {categoryProducts.map((product, index) => (
                <Col lg={3} md={4} sm={6} key={product.id || index} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm product-card">
                    <div className="position-relative">
                      <Link href={ProductService.getProductUrl(product)}>
                        <div className="product-image-container">
                          <Image
                            src={ProductService.getProductImage(product)}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="card-img-top product-image"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </Link>
                      {product.is_on_sale && product.sale_price && (
                        <Badge 
                          bg="danger" 
                          className="position-absolute top-0 end-0 m-2"
                        >
                          Sale
                        </Badge>
                      )}
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <div className="mb-2">
                        <Link 
                          href={ProductService.getProductUrl(product)}
                          className="text-decoration-none"
                        >
                          <h6 className="card-title text-dark mb-1 product-title">
                            {product.name}
                          </h6>
                        </Link>
                                                 {product.brand && (
                           <small className="text-muted d-block">
                             Brand: {product.brand.name}
                           </small>
                         )}
                      </div>
                      
                      <div className="mt-auto">
                                                 <div className="d-flex align-items-center mb-2">
                           {product.average_rating && (
                             <div className="d-flex align-items-center me-2">
                               <div className="text-warning me-1">
                                 {[...Array(5)].map((_, i) => (
                                   <i 
                                     key={i} 
                                     className={`ci-star${i < Math.floor(product.average_rating || 0) ? '-filled' : ''}`}
                                   />
                                 ))}
                               </div>
                               <small className="text-muted">({product.average_rating})</small>
                             </div>
                           )}
                         </div>
                        
                                                 <div className="d-flex align-items-center justify-content-between mb-3">
                           <div>
                             {product.is_on_sale && product.sale_price && (
                               <small className="text-muted text-decoration-line-through me-2">
                                 ${product.price}
                               </small>
                             )}
                             <span className="h5 text-primary mb-0">
                               ${product.is_on_sale && product.sale_price ? product.sale_price : product.price}
                             </span>
                           </div>
                         </div>
                        
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="w-100"
                          onClick={() => {
                            // Add to cart functionality can be implemented here
                            console.log('Add to cart:', product)
                          }}
                        >
                          <i className="ci-cart me-2"></i>
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Category Navigation */}
            <Row>
              <Col xs={12}>
                <div className="bg-white rounded-4 p-4 shadow-sm">
                  <h3 className="h5 mb-3">Explore Other Categories</h3>
                  <div className="d-flex flex-wrap gap-2">
                    <Link href="/category/electronics" className="btn btn-outline-primary btn-sm">
                      Electronics
                    </Link>
                    <Link href="/category/headphones" className="btn btn-outline-primary btn-sm">
                      Headphones
                    </Link>
                    <Link href="/category/desktop" className="btn btn-outline-primary btn-sm">
                      Desktop
                    </Link>
                    <Link href="/category/with-bluetooth" className="btn btn-outline-primary btn-sm">
                      With Bluetooth
                    </Link>
                    <Link href="/category/microscope" className="btn btn-outline-primary btn-sm">
                      Microscope
                    </Link>
                    <Link href="/category/best-sellers" className="btn btn-outline-primary btn-sm">
                      Best Sellers
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <FooterElectronics />
      </>
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    notFound()
  }
}
