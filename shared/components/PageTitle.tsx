type PageTitleProps={
    children:React.ReactNode
}

export default function PageTitle({children}:PageTitleProps){
    return(
     <>
        <h1 className="text-xl sm:text-2xl text-gray-700 px-4 py-2">
            {children}
        </h1>
     </>   
    )
}