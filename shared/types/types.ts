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
// いずれイラスト画像を型に入れる　messageまたはイラストどちらかのnullOKみたいな
export const DUMMY_messages:Message[]=[
    {
        id:'1',
        content:'いつも楽しませていただいています！これからも応援しています！！',
        createdAt:'2026/5/30',
        isRead:false
    },
    {
        id:'2',
        content:'○○さんの描く絵が大好きです。',
        createdAt:'2026/5/30',
        isRead:true
    },
    {
        id:'3',
        content:'匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名匿名',
        createdAt:'2026/5/30',
        isRead:true
    }
]

export type NGWord={
    id:string,
    word:string,
    createdAt:string,
}

export const DUMMY_NGWord:NGWord[]=[
    {
        id:'1',
        word:'馬鹿',
        createdAt:'2026/6/30'
    },
    {
        id:'2',
        word:'嫌い',
        createdAt:'2026/6/30'
    },
    {
        id:'3',
        word:'へたくそ',
        createdAt:'2026/6/30'
    },
    {
        id:'4',
        word:'へたくそ',
        createdAt:'2026/6/30'
    },
    {
        id:'5',
        word:'へたくそ',
        createdAt:'2026/6/30'
    },
    {
        id:'6',
        word:'へたくそ',
        createdAt:'2026/6/30'
    },
    {
        id:'7',
        word:'へたくそ',
        createdAt:'2026/6/30'
    },
    {
        id:'8',
        word:'へたくそ',
        createdAt:'2026/6/30'
    },
    {
        id:'9',
        word:'へたくそ',
        createdAt:'2026/6/30'
    },
    {
        id:'10',
        word:'へたくそ',
        createdAt:'2026/6/30'
    },
    {
        id:'11',
        word:'へたくそ',
        createdAt:'2026/6/30'
    },
]