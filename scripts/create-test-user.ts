//テストアカウント作成ファイル
import "dotenv/config"
import { createClient } from "@supabase/supabase-js"
import { prisma } from "../lib/prisma"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  
  // const { data, error } = await supabase.auth.admin.createUser({
  //   email: "test@sample.com",
  //   password: "test1234",
  //   email_confirm: true,
  // })

  // if (error) {
  //   console.error("テストユーザー作成エラー:", error)
  //   return
  // }

  // console.log("テストユーザーを作成しました")
  // console.log("user.id:", data.user.id)
  // console.log("email:", data.user.email)

 const { data, error } = await supabase.auth.admin.listUsers()

  if (error) {
    console.error("Authユーザー取得エラー:", error)
    return
  }

  const authUser = data.users.find(
    (user) => user.email === "test@sample.com"
  )

  if (!authUser) {
    console.error("test@sample.com のAuthユーザーが見つかりません")
    return
  }

  console.log("Authユーザーを取得しました")
  console.log("user.id:", authUser.id)
  console.log("email:", authUser.email)

  // Prisma Userを作成
  await prisma.user.create({
    data: {
      id: authUser.id,
      email: "test@sample.com",
      username: "test_1234",
      displayName: "てすと",
    },
  })

  console.log("Prisma Userも作成しました")
}

main()