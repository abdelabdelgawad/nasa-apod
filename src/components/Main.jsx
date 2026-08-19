

function Main(props) {

    const {data} = props
    const isVideo = data.url.split('.').pop() === 'mp4'

    return (
        <div className = "apodContainer">
            {isVideo ? (
                <video src = {data.url} className = "apodImage" controls autoPlay loop muted playsInline />
            ) : (
                <img src = {data.hdurl || "space.jpg"} alt = {data.title || "space demo pic"} className = "apodImage"/>
            )}
        </div>
    )
}

export default Main