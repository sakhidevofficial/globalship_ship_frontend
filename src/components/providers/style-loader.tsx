'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function StyleLoader() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Check if current route is newHome
    const isNewHome = pathname === '/newHome' || pathname?.includes('/newHome')
    
    if (isNewHome) {
      // For newHome: load only tailwind-only.scss
      // Remove theme styles if they exist
      const themeVars = document.getElementById('theme-variables-style') as HTMLLinkElement
      const themeStyle = document.getElementById('theme-style') as HTMLLinkElement
      
      if (themeVars) themeVars.disabled = true
      if (themeStyle) themeStyle.disabled = true
      
      // Create and inject tailwind-only style
      let tailwindOnlyStyle = document.getElementById('tailwind-only-style') as HTMLStyleElement
      if (!tailwindOnlyStyle) {
        tailwindOnlyStyle = document.createElement('style')
        tailwindOnlyStyle.id = 'tailwind-only-style'
        tailwindOnlyStyle.innerHTML = `
          /* Pure Tailwind - no theme conflicts */
          html, body, main, [data-route="newHome"] {
            all: revert !important;
            --bs-primary: transparent !important;
            --bs-secondary: transparent !important;
          }
        `
        document.head.appendChild(tailwindOnlyStyle)
      } else {
        tailwindOnlyStyle.disabled = false
      }
    } else {
      // For other routes: enable theme styles, disable tailwind-only
      const themeVars = document.getElementById('theme-variables-style') as HTMLLinkElement
      const themeStyle = document.getElementById('theme-style') as HTMLLinkElement
      const tailwindOnlyStyle = document.getElementById('tailwind-only-style') as HTMLStyleElement
      
      if (themeVars) themeVars.disabled = false
      if (themeStyle) themeStyle.disabled = false
      if (tailwindOnlyStyle) tailwindOnlyStyle.disabled = true
    }
    
    // Set route attribute for CSS targeting
    document.documentElement.setAttribute('data-route', isNewHome ? 'newHome' : 'default')
  }, [pathname])
  
  return null
}
