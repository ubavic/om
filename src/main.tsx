import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.getElementById('root')
if (root != null) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
}
