import Main from './components/Main'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'
import { Analytics } from "@vercel/analytics/react"

function App() {

	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)

	function handleToggleModal() {
		setShowModal(!showModal)
	}

	useEffect(() => {
		const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
		const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setData(data)
				console.log('DATA\n', data)
			})
			.catch((error) => console.error(error))
	}, [])

	return (
		<>
			{data && (<Main data = {data} />)}
			<Sidebar data = {data} show = {showModal} handleToggleModal = {handleToggleModal} />
			{data && (<Footer data = {data} handleToggleModal = {handleToggleModal} />)}

			<Analytics />
		</>
	)
}

export default App
