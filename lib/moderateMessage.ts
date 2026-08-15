import { GoogleGenAI } from "@google/genai"

export type ModerateResult = {
  ok: boolean
  reason?: string
}

/**
 * 投稿文が不適切かどうかを Gemini で判定する
 * - サーバー側専用（Client Component から直接呼ばない）
 */
export async function moderateMessage(content: string): Promise<ModerateResult> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    // キー未設定だと開発中に気づけるようにする
    console.error("GEMINI_API_KEY が設定されていません")
    return {
      ok: false,
      reason: "投稿チェックの準備ができていません。しばらくしてから再度お試しください",
    }
  }

  const ai = new GoogleGenAI({ apiKey })

  // JSON だけ返してもらう（パースしやすくするため）
  const prompt = `
あなたは投稿モデレーターです。
次の投稿が、公開サービスに載せてよいか判定してください。

【不適切とみなす例】
- 暴言・差別・脅迫
- 性的に過激な内容
- 個人情報の晒し
- 違法行為の助長

【出力ルール】
- 必ず次の JSON だけを返す（前置き・後書き・コードブロック禁止）
- 形式: {"ok": true} または {"ok": false, "reason": "短い日本語の理由"}

投稿内容:
"""
${content}
"""
`.trim()

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash", 
    contents: prompt,
  })

  const text = response.text?.trim() ?? ""

  try {
    // 念のため ```json ... ``` が混ざっても剥がす
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim()

    const parsed = JSON.parse(cleaned) as { ok?: boolean; reason?: string }

    if (parsed.ok === true) {
      return { ok: true }
    }

    return {
      ok: false,
      reason: parsed.reason || "不適切な内容と判断されたため送信できませんでした",
    }
  } catch {
    console.error("Gemini の応答を JSON として読めませんでした:", text)
    // API 応答が変でもアプリ全体を落とさない
    return {
      ok: false,
      reason: "投稿チェックに失敗しました。時間をおいて再度お試しください",
    }
  }
}