

function Main(props) {

    const {data} = props
    const source = data.hdurl || "space.jpg"
    const isVideo = source.split('.').pop() === 'mp4'

    return (
        <div className = "apodContainer">
            {isVideo ? (
                <video src = {source} className = "apodImage" controls autoPlay loop muted playsInline />
            ) : (
                <img src = {source} alt = {data.title || "space demo pic"} className = "apodImage"/>
            )}
        </div>
    )
}

export default Main