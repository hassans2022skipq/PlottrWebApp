import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import Feed from './components/Feed'
import Profile from './components/Profile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/home" exact element={<Feed />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
