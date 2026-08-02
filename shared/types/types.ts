export type UserProfile={
    name:string,
    username:string,
    email:string,
    account:string,
    myURL:string
}

export const DUMMY_profile:UserProfile={
    name:'なまえ',
    username:'namae',
    email:'aaa@gmail.com',
    account:'@aaaa_aaaa',
    myURL:'http://pictomessa.com/u/namae'


}

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