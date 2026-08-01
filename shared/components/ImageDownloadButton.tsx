    'use client'

    import { IoCloudDownloadOutline } from "react-icons/io5";
    import Button from "./Button";
    import { toPng } from "html-to-image";


    type Props={
        targetRef:React.RefObject<HTMLDivElement | null>
    }

    // ダウンロードしたいDOMにrefを持たせる
    export default function ImageDownLoadButton({targetRef}:Props){

        const download=async()=>{
            // html-to-image
            if(!targetRef.current)return
            const dataUrl=await toPng(targetRef.current)
            console.log("dataUrl:",dataUrl)

            const link=document.createElement("a")
            link.download="message.png"
            link.href=dataUrl

            link.click()
        }


        return(
            <Button color="others" onClick={download}>
                <IoCloudDownloadOutline />
                画像としてダウンロードする
            </Button>
        )
    }