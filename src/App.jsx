import Main from './components/Main'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react';

function App() {

	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [showModal, setShowModal] = useState(false)

	function handleToggleModal() {
		setShowModal(!showModal)
	}

	useEffect(() => {
		const date = new Date().toISOString().split('T')[0]
		const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
		console.log(date)
		const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}&date=${date}`
		// video test
		// const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}&date=${'2026-3-22'}`
		// image test
		// const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}&date=${'2026-8-12'}`

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setData(data)
				console.log('DATA\n', data)
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false))
	}, [])

	return (
		<>
			{loading && (<p className = "loadingMessage">Fetching data, please wait...</p>)}
			{data && (<Main data = {data} />)}
			<Sidebar data = {data} show = {showModal} handleToggleModal = {handleToggleModal} />
			{data && (<Footer data = {data} handleToggleModal = {handleToggleModal} />)}

			<Analytics />
		</>
	)
}

export default App
