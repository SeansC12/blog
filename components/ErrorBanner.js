import React from 'react'

function ErrorBanner({ errorMessage }) {
  return (
    <div className="w-full h-20 bg-red-300 rounded p-4 mb-5">
      <div className="font-bold text-red-700">Warning!</div>
      <div className="text-red-900">{errorMessage}</div>
    </div>
  )
}

export default ErrorBanner