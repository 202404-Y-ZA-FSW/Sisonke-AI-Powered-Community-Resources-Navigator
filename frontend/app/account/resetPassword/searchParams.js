'use client'
import { useSearchParams } from 'next/navigation'
export default function SearchParamsWrapper({ children }) {
  const searchParams = useSearchParams()
  return children({ searchParams })
}