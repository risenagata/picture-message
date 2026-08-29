import Link from "next/link"
import { IoMdHome } from "react-icons/io"
import { BsBox2Heart } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import Button from "./Button";

type HeaderProps={
    isLoggedIn:boolean
}

export default function Header({isLoggedIn}:HeaderProps){
    return(
    
        <header className="bg-yellow-500 py-4 px-6">
            <div className="flex items-center justify-between">
            <h1 className="font-bold text-white">PictoMessa</h1>
            {isLoggedIn ? (
                
                <div className="flex gap-8">
                <Link href="/mypage/">                
                    <div className="flex flex-col items-center text-xs text-white p-1 hover:text-white/50">
                        <IoMdHome size={24}/>
                        <span>マイページ</span>
                    </div>
                </Link>
                <Link href="/message">                
                    <div className="flex flex-col items-center text-xs text-white p-1 hover:text-white/50">
                        <BsBox2Heart size={24}/>
                        <span>受信箱</span>
                    </div>
                </Link>
                <Link href="/setting/">                
                    <div className="flex flex-col items-center text-xs text-white p-1 hover:text-white/50">
                        <AiFillSetting size={24}/>
                        <span>設定</span>
                    </div>
                </Link>
                </div>
                
            ):(
                <>
                <div className="flex justify-center items-center gap-2">
                    <Link href="/auth/signup/">
                        <Button color="secondary">新規登録</Button>
                    </Link>
                    <Link href="/auth/signin/">
                        <Button color="secondary">ログイン</Button>
                    </Link>
                    
                </div>
                </>
            )
            }
           
            </div>
        </header>
    
    )
}


