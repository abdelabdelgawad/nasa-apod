

function Sidebar(props) {

    const {handleToggleModal, data} = props
    return (
        <div className = "sidebar">
            <div onClick = {handleToggleModal} className = "apodOverlay"></div>
            <div className = "sidebarContents">
                <h2>{data?.title}</h2>
                <div>
                    <h3>By: {data?.copyright}</h3>
                    <p><strong>Explanation: </strong> {data?.explanation}</p>
                </div>
                <button onClick = {handleToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}

export default Sidebar