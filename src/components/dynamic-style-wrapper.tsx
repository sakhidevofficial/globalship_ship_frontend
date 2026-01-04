// components/dynamic-style-wrapper.tsx
'use client'

import { usePathname } from 'next/navigation'

export default function DynamicStyleWrapper({ children }: React.PropsWithChildren) {
  const pathname = usePathname()
  const slug = pathname.split('/')[1] || 'home'

  const isNewHome = slug === 'newHome'

  return <div className={isNewHome ? 'tailwind-only-theme' : 'bootstrap-theme'}>{children}</div>
}
