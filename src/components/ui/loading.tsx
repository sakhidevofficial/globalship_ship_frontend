import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'light'
  text?: string
  className?: string
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  variant = 'primary', 
  text = 'Loading...', 
  className = '' 
}) => {
  const spinnerSize = size === 'sm' ? 'sm' : undefined
  const spinnerStyle = size === 'lg' ? { width: '3rem', height: '3rem' } : undefined

  return (
    <div className={`d-flex flex-column align-items-center justify-content-center py-4 ${className}`}>
      <Spinner 
        animation="border" 
        variant={variant} 
        size={spinnerSize}
        style={spinnerStyle}
      />
      <p className="mt-3 text-muted mb-0">{text}</p>
    </div>
  )
}

export const ProductCardSkeleton: React.FC = () => (
  <div className="product-card bg-body rounded mb-3 animate-pulse">
    <div className="position-relative">
      <div className="rounded-top overflow-hidden p-3 p-sm-4">
        <div 
          className="bg-light rounded" 
          style={{ width: '100%', height: '200px' }}
        />
      </div>
      <div className="p-3 p-sm-4">
        <div className="bg-light rounded mb-2" style={{ height: '1rem' }} />
        <div className="bg-light rounded mb-2" style={{ height: '0.75rem', width: '75%' }} />
        <div className="bg-light rounded" style={{ height: '1rem', width: '50%' }} />
      </div>
    </div>
  </div>
)

export const BrandCardSkeleton: React.FC = () => (
  <div className="card border-0 bg-body rounded-4 text-center p-4 animate-pulse">
    <div className="d-flex justify-content-center mb-3">
      <div 
        className="bg-light rounded-circle" 
        style={{ width: '80px', height: '40px' }} 
      />
    </div>
    <div className="bg-light rounded mb-1" style={{ height: '1rem' }} />
    <div className="bg-light rounded mx-auto" style={{ height: '0.75rem', width: '66%' }} />
  </div>
)

export const CategoryCardSkeleton: React.FC = () => (
  <div className="card border-0 bg-body rounded-4 text-center p-4 animate-pulse">
    <div className="d-flex justify-content-center mb-3">
      <div 
        className="bg-light rounded-circle" 
        style={{ width: '60px', height: '60px' }} 
      />
    </div>
    <div className="bg-light rounded mb-1" style={{ height: '1rem' }} />
    <div className="bg-light rounded mx-auto" style={{ height: '0.75rem', width: '50%' }} />
  </div>
)

export const TableRowSkeleton: React.FC<{ columns: number }> = ({ columns }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }, (_, i) => (
      <td key={i} className="py-3">
        <div className="bg-light rounded" style={{ height: '1rem' }} />
      </td>
    ))}
  </tr>
)

export const ErrorMessage: React.FC<{ 
  message: string
  onRetry?: () => void
  className?: string
}> = ({ message, onRetry, className = '' }) => (
  <div className={`text-center py-4 ${className}`}>
    <div className="text-danger mb-3">
      <i className="ci-alert-triangle" style={{ fontSize: '3rem' }} />
    </div>
    <h5 className="text-danger mb-2">Oops! Something went wrong</h5>
    <p className="text-muted mb-3">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry} 
        className="btn btn-outline-primary"
      >
        <i className="ci-refresh-cw me-2" />
        Try Again
      </button>
    )}
  </div>
)

export default Loading 