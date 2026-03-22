import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BlogLayout from './blog/BlogLayout.jsx'
import BlogIndex from './blog/BlogIndex.jsx'
import BlogPost from './blog/BlogPost.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogIndex />} />
          <Route path=":id" element={<BlogPost />} />
        </Route>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
