import { useEffect, useRef, useState } from 'react'

function Sidebar(props) {

    const {show, handleToggleModal, data} = props
    const [mounted, setMounted] = useState(show)
    const [visible, setVisible] = useState(false)
    const frameRef = useRef(null)

    useEffect(() => {
        if (show) {
            setMounted(true)
        } else {
            setVisible(false)
        }
    }, [show])

    useEffect(() => {
        if (mounted && show) {
            const outer = requestAnimationFrame(() => {
                const inner = requestAnimationFrame(() => setVisible(true))
                frameRef.current = inner
            })
            frameRef.current = outer
            return () => cancelAnimationFrame(frameRef.current)
        }
    }, [mounted, show])

    function handleTransitionEnd() {
        if (!show) setMounted(false)
    }

    if (!mounted) return null

    return (
        <div className={`sidebar ${visible ? 'sidebar-visible' : ''}`}>
            <div onClick = {handleToggleModal} className = "apodOverlay"></div>
            <div className = "sidebarContents" onTransitionEnd={handleTransitionEnd}>
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