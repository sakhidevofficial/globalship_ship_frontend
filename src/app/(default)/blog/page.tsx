'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { BlogService, BlogPost } from '@/services/blog'
import CustomFooter from '@/components/layout/custom-footer'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const postsPerPage = 9

  useEffect(() => {
    fetchBlogPosts()
  }, [currentPage])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      console.log('fetchBlogPosts called with page:', currentPage)

      const fetchedPosts = await BlogService.getPosts({
        page: currentPage,
        per_page: postsPerPage,
      })

      console.log('fetchBlogPosts received posts:', fetchedPosts)
      setPosts(fetchedPosts)
      setTotalPosts(fetchedPosts.length) // This will be updated when we get pagination info
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        setLoading(true)
        const searchResults = await BlogService.getPosts({
          search: searchQuery,
          page: 1,
          per_page: postsPerPage,
        })
        setPosts(searchResults)
        setCurrentPage(1)
      } catch (error) {
        console.error('Error searching blog posts:', error)
      } finally {
        setLoading(false)
      }
    } else {
      fetchBlogPosts()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <>
      <HeaderElectronics />

      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Cartzilla Blog</h1>
              <p className="lead mb-4">
                Stay updated with the latest trends, product reviews, and shopping tips from our expert team. Discover
                amazing deals and insights to enhance your shopping experience.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Search Section */}
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div className="d-flex gap-2">
              <FormControl
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow-1"
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Blog Posts */}
      <Container className="py-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading blog posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="text-muted">No blog posts found</h3>
            <p className="text-muted">
              {searchQuery ? `No posts match your search for "${searchQuery}"` : 'Check back later for new content'}
            </p>
            {searchQuery && (
              <Button
                variant="outline-primary"
                onClick={() => {
                  setSearchQuery('')
                  fetchBlogPosts()
                }}
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">{searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Blog Posts'}</h2>
              <span className="text-muted">{posts.length} posts</span>
            </div>

            <Row className="g-4">
              {posts.map((post) => (
                <Col lg={4} md={6} key={post.id}>
                  <Card className="h-100 border-0 shadow-sm">
                    {post.image && (
                      <div className="position-relative" style={{ height: '200px' }}>
                        <Image
                          src={post.image}
                          alt={post.name}
                          fill
                          className="card-img-top"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <Card.Body className="p-4">
                      <div className="mb-2">
                        <small className="text-muted">{formatDate(post.created_at || '')}</small>
                      </div>
                      <h5 className="card-title fw-bold mb-3">
                        <Link href={`/blog/${post.slug}`} className="text-decoration-none text-dark">
                          {post.name}
                        </Link>
                      </h5>
                      {post.description && (
                        <p className="card-text text-muted mb-3">{truncateText(post.description, 120)}</p>
                      )}
                      <Link href={`/blog/${post.slug}`} className="btn btn-outline-primary btn-sm">
                        Read More
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {totalPosts > postsPerPage && (
              <div className="d-flex justify-content-center mt-5">
                <nav aria-label="Blog pagination">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <Button
                        className="page-link"
                        variant="link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                    </li>
                    <li className="page-item">
                      <span className="page-link">{currentPage}</span>
                    </li>
                    <li className="page-item">
                      <Button className="page-link" variant="link" onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </Container>

      {/* Newsletter Section */}
      <Container className="py-5 bg-light rounded-4">
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h3 className="mb-3">Stay Updated</h3>
            <p className="text-muted mb-4">
              Subscribe to our newsletter to get the latest blog posts and exclusive deals delivered to your inbox.
            </p>
            <div className="d-flex gap-2 justify-content-center">
              <FormControl
                type="email"
                placeholder="Enter your email"
                className="w-auto"
                style={{ minWidth: '300px' }}
              />
              <Button variant="primary">Subscribe</Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <FooterElectronics /> */}
      <CustomFooter />
    </>
  )
}
