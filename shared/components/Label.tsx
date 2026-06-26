
type LabelProps={
    children:React.ReactNode
}

export default function Label({children}:LabelProps){
    return(
        <label className="block py-2 font-medium text-gray-700">
            {children}
        </label>
    )
}

//インプットと一緒によく使われる、メールアドレス：[    ]　のメールアドレス：の部分