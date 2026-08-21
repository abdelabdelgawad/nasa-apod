import Main from './components/Main'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react';

function App() {

	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

	function handleToggleModal() {
		setShowModal(!showModal)
	}

	function handleDateChange(date) {
		setSelectedDate(date)
	}

	useEffect(() => {
		const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
		const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}&date=${selectedDate}`

		setLoading(true)
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setData(data)
				console.log('DATA\n', data)
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false))
	}, [selectedDate])

	return (
		<>
			{loading && (<p className = "loadingMessage">Fetching data, please wait...</p>)}
			{data && (<Main data = {data} />)}
			<Sidebar data = {data} show = {showModal} handleToggleModal = {handleToggleModal} />
			{data && (<Footer data = {data} handleToggleModal = {handleToggleModal} selectedDate = {selectedDate} handleDateChange = {handleDateChange} />)}

			<Analytics />
		</>
	)
}

export default App
