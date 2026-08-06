'use client'

import { useRef, useState } from "react"
import { Layer, Line, Stage } from "react-konva"

export default function Canvas(){

    const [line,setLine]=useState<any[]>([])
    const [tool,setTool]=useState('pen')
    const isDrawing=useRef(false)

    const handleMouseDown=(e:any)=>{
        isDrawing.current=true
        const point=e.target.getStage().getPointerPosition()
        setLine([...line, { tool, points: [point.x, point.y],color:"#343333",strokeWidth:0.5 }])
    }
    const handleMouseMove=(e:any)=>{
        if(!isDrawing.current){
            return
        }
        const point=e.target.getStage().getPointerPosition()
        const stage=e.target.getStage()
        let lastLine=line[line.length - 1]
        lastLine.points=lastLine.points.concat([point.x, point.y])
        line.splice(line.length - 1, 1, lastLine);
        setLine(line.concat());
        
    }

    const handleMouseUp=()=>{
        isDrawing.current=false
    }

    return(
        <div className="inline-block bg-white border border-gray-500 ">
            <Stage
            width={500}
            height={500}
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            >
                <Layer>
                    {line.map((line,i)=>(
                        <Line 
                        key={i}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={line.strokeWidth}
                        tension={0.5}
                        lineCap="round"
                        lineJoin="round"
                        globalCompositeOperation={
                            line.tool === "eraser" ? "destination-out" : "source-over"
                        }
                        />
                    ))}
                </Layer>
            </Stage>
            <select 
            value={tool}
            onChange={(e)=>{
                setTool(e.target.value)
            }}
            >
                <option value="pen">ペン</option>
                <option value="eraser">消しゴム</option>


            </select>

        </div>
    )
}