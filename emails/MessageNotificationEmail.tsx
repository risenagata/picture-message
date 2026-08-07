// メッセージ受信通知メール
import { Body, Button, Container, Heading, Html, Preview, Section, Tailwind, Text } from "@react-email/components"

type Props={
    displayName?:string
}

export default function MessageNotificationEmail({displayName="テストユーザー"}:Props){

const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";
    return(
        <Html>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2 text-center">
                    <Heading className="bg-gray-200 text-white font-bold text-3xl">PictoMessa</Heading>
                    <Preview>
                        新しいメッセージが届きました！
                    </Preview>
                    <Container className="max-w-[480px] mx-auto bg-white rounded-lg p-8">                        
                        <Text className="text-3xl">📩新しいメッセージが届きました🎊</Text>

                        <Section>
                            <Text>{displayName}さん</Text>

                            <Text>あなた宛にメッセージが届いています。</Text>

                            <Text>さっそく確認してみましょう！</Text>

                            <Button 
                            href={`${appUrl}/message`}
                            className="mx-auto block w-[320px] py-2 px-4 my-8 rounded-full bg-yellow-500 text-white"
                            >
                                受信箱を見る
                            </Button>
                        </Section>
                    </Container>

                    <Section>
                        <Text className="text-xs text-gray-400">
                            このメールは自動送信です。
                            返信いただいてもお答えできません。
                        </Text>
                    </Section>

                </Body>

            </Tailwind>

        </Html>
    )
}