import { useRef } from 'react'

function Footer(props) {

    const {showModal, handleToggleModal, data, selectedDate, handleDateChange} = props
    const dateInputRef = useRef(null)

    function handleCalendarClick() {
        if (dateInputRef.current.showPicker) {
            dateInputRef.current.showPicker()
        } else {
            dateInputRef.current.click()
        }
    }

    return (
        <footer>
            <div className = "apodGradient"></div>
            <div className = "apodFooter">
                <h1>{data?.title}</h1>
                <h2>By: {data?.copyright || "No Copyright Information Available"}</h2>
                <h3>NASA Astronomy Picture of the Day</h3>
            </div>
            <div className="interactionZone">
                <button onClick = {handleCalendarClick}>
                    <i className="fa-solid fa-calendar-days"></i>
                </button>
                <input
                    ref = {dateInputRef}
                    type = "date"
                    className = "dateInput"
                    value = {selectedDate}
                    min = "1995-06-16"
                    max = {new Date().toISOString().split('T')[0]}
                    onChange = {(event) => handleDateChange(event.target.value)}
                />
                <button onClick = {handleToggleModal}>
                    <i className="fa-solid fa-circle-info"></i>
                </button>
            </div>
        </footer>
    )
}

export default Footer