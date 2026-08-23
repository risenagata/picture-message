'use client'

import type Konva from "konva";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
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

type CanvasProps={
    onDrawingChange: (hasDrawing: boolean) => void
}

export type CanvasRef={
    getBlob:()=>Promise<Blob | null>
    hasDrawing:()=>boolean
}

const Canvas= forwardRef<CanvasRef,CanvasProps>(function Canvas({onDrawingChange},ref){

    const [lines,setLines]=useState<DrawingLine[]>([])
    const [tool,setTool]=useState<"pen" | "eraser">('pen')
    const isDrawing=useRef(false)
    const [strokeWidth,setStrokeWidth]=useState(3)

    const containerRef = useRef<HTMLDivElement>(null)
    const [stageWidth, setStageWidth] = useState(500)

    const stageRef = useRef<Konva.Stage>(null)

    // クリックしながら書ける
    const handleMouseDown=(e:Konva.KonvaEventObject<MouseEvent>)=>{
        isDrawing.current=true
        const stage=e.target.getStage()
        const point=stage?.getPointerPosition()
        if(!point)return
        setLines(prev=>[...prev, { tool, points: [point.x, point.y],color:"#343333",strokeWidth }])
        onDrawingChange(true)
    }

    // 動かすと描画できる
    const handleMouseMove=(e:Konva.KonvaEventObject<MouseEvent>)=>{
        if(!isDrawing.current){
            return
        }
        const stage=e.target.getStage()
        const point=stage?.getPointerPosition()
        setLines(prev => {
        const lastLine = prev[prev.length - 1]

        if (!lastLine) {
            return prev
        }

        if(!point){
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
        { width: 0.5, iconSize: 6 },
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
        onDrawingChange(false)
    }

    // スマホ・ipad用の描画
    const handleTouchStart=(e:Konva.KonvaEventObject<TouchEvent>)=>{
        e.evt.preventDefault()
        isDrawing.current=true
        const stage=e.target.getStage()
        const point=stage?.getPointerPosition()
        if(!point)return
        setLines(prev=>[...prev, { tool, points: [point.x, point.y],color:"#343333",strokeWidth }])
        onDrawingChange(true)
    }

    const handleTouchMove=(e:Konva.KonvaEventObject<TouchEvent>)=>{
        e.evt.preventDefault()
        if(!isDrawing.current){
            return
        }
        const stage=e.target.getStage()
        const point=stage?.getPointerPosition()
        setLines(prev => {
        const lastLine = prev[prev.length - 1]
        if (!lastLine) {
            return prev
        }
        if(!point){
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

    const handleTouchEnd=(e:Konva.KonvaEventObject<TouchEvent>)=>{
        e.evt.preventDefault()
        isDrawing.current=false
    }

    useImperativeHandle(ref,()=>({
        async getBlob(){
            const stage=stageRef.current
            if(!stage){return null}

            const dataURL =stage.toDataURL() //画像を表す文字列に変換

            const response =await fetch(dataURL) //dataURLをデータとして取得
            const blob=await response.blob() //取得データをblob（ブラウザで扱えるファイルの中身）に変換
            return blob

        },
        hasDrawing:()=>{
            return lines.length > 0
        } //描画されているかどうか

    }))

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
        <div ref={containerRef} className="relative w-full max-w-[760px] bg-white border border-gray-500 touch-none">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-gray-200/70">
                    PictoMessa
                </span>
            </div>
            <Stage
            ref={stageRef}
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
})

export default Canvas