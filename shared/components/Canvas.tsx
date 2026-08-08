'use client'

import { useEffect, useRef, useState } from "react"
import { BsEraser } from "react-icons/bs"
import { FaPen } from "react-icons/fa6"
import { LuUndo2 } from "react-icons/lu";
import { RiResetLeftLine } from "react-icons/ri";
import { Layer, Line, Stage } from "react-konva"

type DrawingLine = {
    tool: "pen" | "eraser"
    points: number[]
    color: string
    strokeWidth: number
}

export default function Canvas(){

    const [lines,setLines]=useState<DrawingLine[]>([])
    const [tool,setTool]=useState<"pen" | "eraser">('pen')
    const isDrawing=useRef(false)
    const [strokeWidth,setStrokeWidth]=useState(3)

    const containerRef = useRef<HTMLDivElement>(null)
    const [stageWidth, setStageWidth] = useState(500)

    // クリックしながら書ける
    const handleMouseDown=(e:any)=>{
        isDrawing.current=true
        const point=e.target.getStage().getPointerPosition()
        setLines(prev=>[...prev, { tool, points: [point.x, point.y],color:"#343333",strokeWidth }])
    }

    // 動かすと描画できる
    const handleMouseMove=(e:any)=>{
        if(!isDrawing.current){
            return
        }
        const point=e.target.getStage().getPointerPosition()
        setLines(prev => {
        const lastLine = prev[prev.length - 1]

        if (!lastLine) {
            return prev
        }

        const updatedLine = {
            ...lastLine,
            points: lastLine.points.concat([point.x, point.y]),
        }

        return [
            ...prev.slice(0, -1),
            updatedLine,
        ]

        })
         
    }

    // 太さ
    const strokeOptions = [
        { width: 1, iconSize: 6 },
        { width: 2, iconSize: 9 },
        { width: 3, iconSize: 12 },
        { width: 5, iconSize: 16 },
        { width: 10, iconSize: 22 },
    ]

    // クリックを離すと描画とまる
    const handleMouseUp=()=>{
        isDrawing.current=false
    }

    // ひとつ戻る
    const handleUndo=()=>{
        setLines(prev=>prev.slice(0,prev.length - 1))
    }
    // 全消し
    const handleClear=()=>{
        setLines([])
    }

    // スマホ・ipad用の描画
    const handleTouchStart=(e:any)=>{
        e.evt.preventDefault()
        isDrawing.current=true
        const point=e.target.getStage().getPointerPosition()
        setLines(prev=>[...prev, { tool, points: [point.x, point.y],color:"#343333",strokeWidth }])

    }

    const handleTouchMove=(e:any)=>{
        e.evt.preventDefault()
        if(!isDrawing.current){
            return
        }
        const point=e.target.getStage().getPointerPosition()
        setLines(prev => {
        const lastLine = prev[prev.length - 1]
        if (!lastLine) {
            return prev
        }
        const updatedLine = {
            ...lastLine,
            points: lastLine.points.concat([point.x, point.y]),
        }
        return [
            ...prev.slice(0, -1),
            updatedLine,
        ]
        })

    }

    const handleTouchEnd=(e:any)=>{
        e.evt.preventDefault()
        isDrawing.current=false
    }

    useEffect(()=>{
        if(!containerRef.current)return

        const resizeObserver=new ResizeObserver(entries => {
        setStageWidth(entries[0].contentRect.width)
        })

        resizeObserver.observe(containerRef.current)

        return () => resizeObserver.disconnect()

    },[])

    return(
    <div>
        <div ref={containerRef} className="w-full max-w-[760px] bg-white border border-gray-500 touch-none">
            <Stage
            width={stageWidth}
            height={stageWidth}
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            >
                <Layer>
                    {lines.map((line,i)=>(
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


        </div>

        

        <div className="max-w-[420px] m-auto flex justify-center items-center gap-4 mt-2 py-2 bg-white rounded-full shadow">
            <button 
            type="button"
            onClick={()=>{setTool("pen")}}
            className={tool === "pen" ? "bg-gray-300 p-2" : "bg-white"}
            >
                <div className="text-gray-400 text-2xl">
                    <FaPen/>
                </div>
            </button>
            <button 
            type="button"
            onClick={()=>{setTool("eraser")}}
            className={tool === "eraser" ? "bg-gray-300 p-2" : "bg-white"}
            >
                <div className="text-gray-400 text-2xl">
                    <BsEraser/>
                </div>
            </button>
            
            <div className="flex items-center border border-gray-500 rounded-full">
                {strokeOptions.map((option)=>(
                    <button 
                    type="button"
                    key={option.width}
                    onClick={()=>setStrokeWidth(option.width)}
                    className={strokeWidth === option.width ? "p-2 bg-gray-300 rounded-full":"p-2"}
                    >
                        <span 
                        className="block rounded-full bg-gray-400"
                        style={{
                            width:`${option.iconSize}px`,
                            height:`${option.iconSize}px`
                        }}
                        >
                        </span>
                    </button>
                ))}

            </div>

            <button 
            type="button"
            onClick={handleUndo}
            className="p-2 bg-white active:bg-gray-300"
            >
                <div className="text-gray-400 text-2xl">
                    <LuUndo2 />
                </div>
            </button>
            <button 
            type="button"
            onClick={handleClear}
            className="p-2 bg-white active:bg-gray-300"
            >
                <div className="text-gray-400 text-2xl">
                    <RiResetLeftLine />
                </div>
            </button>
           
        </div>

            
    </div>
    )
}