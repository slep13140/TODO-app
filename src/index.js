import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/app/app'

import './index.css'

const reactApp = document.createElement('div')
reactApp.setAttribute('id', 'root')
document.body.append(reactApp)

const root = createRoot(document.getElementById('root'))
root.render(<App />)
