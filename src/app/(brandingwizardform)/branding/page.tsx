'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

function Branding() {
  return (
    <ProtectedRoute>
        <div>hi</div>
    </ProtectedRoute>
  )
}

export default Branding