'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { BlogService, BlogPost } from '@/services/blog'
import CustomFooter from '@/components/layout/custom-footer'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug)
    }
  }, [slug])

  const fetchBlogPost = async (postSlug: string) => {
    try {
      setLoading(true)
      setError(null)

      const foundPost = await BlogService.getPostBySlug(postSlug)

      if (foundPost) {
        setPost(foundPost)
      } else {
        setError('Blog post not found')
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      setError('Failed to load blog post')
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <>
        <HeaderElectronics />
        <Container className="py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading blog post...</p>
          </div>
        </Container>
        {/* <FooterElectronics /> */}
        <CustomFooter />
      </>
    )
  }

  if (error || !post) {
    return (
      <>
        <HeaderElectronics />
        <Container className="py-5">
          <div className="text-center">
            <h1 className="display-4 text-muted mb-4">404</h1>
            <h2 className="mb-4">Blog Post Not Found</h2>
            <p className="text-muted mb-4">{error || 'The blog post you are looking for does not exist.'}</p>
            <Link href="/blog">
              <Button variant="primary">Back to Blog</Button>
            </Link>
          </div>
        </Container>
        {/* <FooterElectronics /> */}
        <CustomFooter />
      </>
    )
  }

  return (
    <>
      <HeaderElectronics />

      {/* Blog Post Content */}
      <Container className="py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/blog" className="text-decoration-none">
                Blog
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {post.name}
            </li>
          </ol>
        </nav>

        <Row className="justify-content-center">
          <Col lg={8}>
            {/* Post Header */}
            <div className="mb-5">
              <h1 className="display-5 fw-bold text-dark mb-3">{post.name}</h1>
              <div className="d-flex align-items-center text-muted mb-4">
                <i className="ci-calendar me-2"></i>
                <span>{formatDate(post.created_at || '')}</span>
              </div>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="mb-5">
                <div className="position-relative" style={{ height: '400px' }}>
                  <Image src={post.image} alt={post.name} fill className="rounded-4" style={{ objectFit: 'cover' }} />
                </div>
              </div>
            )}

            {/* Post Description */}
            {post.description && (
              <div className="mb-5">
                <p className="lead text-muted fs-5">{post.description}</p>
              </div>
            )}

            {/* Post Content */}
            {post.content && (
              <div className="mb-5">
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            )}

            {/* Post Footer */}
            <div className="border-top pt-4">
              <div className="d-flex justify-content-between align-items-center">
                <Link href="/blog">
                  <Button variant="outline-primary">
                    <i className="ci-arrow-left me-2"></i>
                    Back to Blog
                  </Button>
                </Link>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" size="sm">
                    <i className="ci-share me-2"></i>
                    Share
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <i className="ci-bookmark me-2"></i>
                    Bookmark
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Related Posts Section */}
      <Container className="py-5 bg-light rounded-4">
        <div className="text-center mb-5">
          <h3 className="mb-3">Related Posts</h3>
          <p className="text-muted">Discover more interesting content from our blog</p>
        </div>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <p className="text-muted mb-4">
              More blog posts will be displayed here once we have multiple posts available.
            </p>
            <Link href="/blog">
              <Button variant="primary">View All Posts</Button>
            </Link>
          </Col>
        </Row>
      </Container>

      {/* <FooterElectronics /> */}
      <CustomFooter />
    </>
  )
}
