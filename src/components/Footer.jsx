

function Footer(props) {

    const {showModal, handleToggleModal, data} = props

    return (
        <footer>
            <div className = "apodGradient"></div>
            <div className = "apodFooter">
                <h1>{data?.title}</h1>
                <h2>By: {data?.copyright || "No Copyright Information Available"}</h2>
                <h3>NASA Astronomy Picture of the Day</h3>
            </div>
            <button onClick = {handleToggleModal}>
                <i className="fa-solid fa-circle-info"></i>
            </button>
        </footer>
    )
}

export default Footer