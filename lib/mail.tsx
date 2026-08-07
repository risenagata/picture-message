import { Resend } from 'resend'
import MessageNotificationEmail from '@/emails/MessageNotificationEmail'


const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendNewMessageMail(email:string,displayName:string){

        await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "＜ピクトメッセ＞新しいメッセージが届きました！",
        react: (
            <MessageNotificationEmail
                displayName={displayName} 
            />
        )
    })

}