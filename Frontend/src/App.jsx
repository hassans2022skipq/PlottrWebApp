import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Result from './components/Result'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/home" exact element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          } />
          <Route path="/search/:query" exact element={<Result />} />
          <Route path="/profile/:id" exact element={<Profile />} />
          <Route path="/story/:id" exact element={<Feed />} />
          <Route path="/story/:id/comments" exact element={<Feed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
