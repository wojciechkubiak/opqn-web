import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Patron: React.FC = () => {
    let containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current, {
                duration: 2,
                y: -1000
            }, {
                duration: 2,
                y: 0
            }
        )
    }, [])

    return (
        <div className="patron">
            <div className="patron--container" ref={containerRef}>
                <h1 >Patron</h1>
            </div>
        </div>
    )
}

export default Patron;