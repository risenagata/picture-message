'use client'

import { useState } from "react"
import { Layer, Line, Stage } from "react-konva"

export default function Canvas(){

    const [line,setLine]=useState<any[]>([])

    const handleMouseDown=(e:any)=>{
        const point=e.target.getStage().getPointerPosition()
        setLine([point.x,point.y])
    }

    return(
        <div>
            <Stage
            width={500}
            height={500}
            onMouseDown={handleMouseDown} 
            onTouchStart={handleMouseDown}
            >
                <Layer>
                    <Line points={line} stroke="white" />
                </Layer>
            </Stage>

        </div>
    )
}