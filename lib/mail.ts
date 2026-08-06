import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendNewMessageMail(email:string,displayName:string){

    await resend.emails.send({
        from:'onboarding@resend.dev',
        to:email,
        subject:'＜ピクトメッセ＞新しいメッセージが届きました！',
        text:`${displayName}さん 
        新しいメッセージが届きました。 
        アクセスして確認しましょう！`
    })

}