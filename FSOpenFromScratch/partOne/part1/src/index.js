import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Header from './App'
import Content from './App'
import Total from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
<App />,
<Header />,
<Content />,
<Total />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
