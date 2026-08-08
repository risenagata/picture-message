'use client'

import { useEffect, useRef, useState } from "react"
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
    const [strokeWidth,setStrokeWidth]=useState(5)

    const containerRef = useRef<HTMLDivElement>(null)
    const [stageWidth, setStageWidth] = useState(500)

    // クリックしながら書ける
    const handleMouseDown=(e:any)=>{
        isDrawing.current=true
        const point=e.target.getStage().getPointerPosition()
        setLines([...lines, { tool, points: [point.x, point.y],color:"#343333",strokeWidth }])
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
        <div ref={containerRef} className="w-full max-w-[760px] bg-white border border-gray-500 ">
            <Stage
            width={stageWidth}
            height={stageWidth}
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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

        
        <div className="flex justify-center items-center">
            <select 
            className="bg-white"
            value={tool}
            onChange={(e)=>{
                setTool(e.target.value as "pen" | "eraser")
            }}
            >
                <option value="pen">ペン</option>
                <option value="eraser">消しゴム</option>
            </select>
            <select 
            className="bg-white"
            value={strokeWidth}
            onChange={(e)=>setStrokeWidth(Number(e.target.value))}
            >
                <option value={2}>極細</option>
                <option value={5}>標準</option>
                <option value={10}>太い</option>
                <option value={20}>極太</option>
                

            </select>
        </div>

            
    </div>
    )
}