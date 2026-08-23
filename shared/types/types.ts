

export type Message={
    id:string,
    content:string | null,
    imageURL?:string | null,
    createdAt:string,
    isRead:boolean
    
}

export type NGWordForm = {
    word: string
}

export type NGWord = {
    id: string,
    word: string,
}

export const MAX_NGWords=100

export const MAX_Chars=1000