'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CategoriesContextType {
  isCategoriesOpen: boolean
  setIsCategoriesOpen: (open: boolean) => void
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined)

export const useCategories = () => {
  const context = useContext(CategoriesContext)
  if (context === undefined) {
    // Return a fallback context instead of throwing an error
    return {
      isCategoriesOpen: false,
      setIsCategoriesOpen: () => {} // No-op function
    }
  }
  return context
}

interface CategoriesProviderProps {
  children: ReactNode
}

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  return (
    <CategoriesContext.Provider value={{ isCategoriesOpen, setIsCategoriesOpen }}>
      {children}
    </CategoriesContext.Provider>
  )
} 