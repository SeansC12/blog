import React from 'react'

function ErrorBanner({ successMessage }) {
  return (
    <div className="w-full h-20 bg-green-300 rounded p-4 mb-5">
      <div className="font-bold text-green-700">It worked!</div>
      <div className="text-green-900">{successMessage}</div>
    </div>
  )
}

export default ErrorBanner