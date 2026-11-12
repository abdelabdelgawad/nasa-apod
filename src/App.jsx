import Main from './components/Main'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react';

function toLegacyDateCode(dateString) {
	const [year, month, day] = dateString.split('-')
	return year.slice(2) + month + day
}

function App() {

	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [selectedDate, setSelectedDate] = useState(getLocalDateString())

	function getLocalDateString() {
		const now = new Date()
		const year = now.getFullYear()
		const month = String(now.getMonth() + 1).padStart(2, '0')
		const day = String(now.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	function handleToggleModal() {
		setShowModal(!showModal)
	}

	function handleDateChange(date) {
		setSelectedDate(date)
	}

	useEffect(() => {
		const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
		const dateCode = toLegacyDateCode(selectedDate)
		const url = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/${dateCode}` + `?api_key=${NASA_KEY}`

		setLoading(true)
		setError(null)
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`)
				}
				return response.json()
			})
			.then((data) => {
				setData(data)
				console.log('DATA\n', data)
			})
			.catch((error) => {
				console.error(error)
				setError(error.message)
			})
			.finally(() => setLoading(false))
	}, [selectedDate])

	return (
		<>
			{loading && (<p className = "loadingMessage">Fetching data, please wait...</p>)}
			{error && (<p className = "errorMessage">Something went wrong: {error}</p>)}
			{data && (<Main data = {data} />)}
			<Sidebar data = {data} show = {showModal} handleToggleModal = {handleToggleModal} />
			{data && (<Footer data = {data} handleToggleModal = {handleToggleModal} selectedDate = {selectedDate} handleDateChange = {handleDateChange} />)}

			<Analytics />
		</>
	)
}

export default App