/**
 * 【このファイルについて】
 * このファイルは、Webアプリ全体のレイアウト（構造）を定義しています。
 * すべてのページで共通して使用される設定（フォント、メタデータなど）をここで設定します。
 */

// Next.jsの型定義を読み込みます（TypeScriptで使用）
import type { Metadata, Viewport } from "next";
// Google Fontsからフォントを読み込みます
import { Geist, Geist_Mono } from "next/font/google";
// グローバルなCSSスタイルを読み込みます
import "./globals.css";
// Service Worker登録コンポーネント
import RegisterSW from "./register-sw";

/**
 * 【フォントの設定】
 * Geist というフォントを設定しています
 * このフォントは、通常のテキスト（サンセリフ）に使用されます
 */
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS変数名を定義
  subsets: ["latin"], // 使用する文字セット（ラテン文字）
});

/**
 * 【モノスペースフォントの設定】
 * Geist_Mono というフォントを設定しています
 * このフォントは、コード表示などに使用される等幅フォントです
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // CSS変数名を定義
  subsets: ["latin"], // 使用する文字セット（ラテン文字）
});

/**
 * 【メタデータの設定】
 * Webページのタイトルや説明文を設定します
 * ブラウザのタブに表示されるタイトルや、検索エンジンに表示される説明文になります
 */
export const metadata: Metadata = {
  title: "Takt Time Calculator",
  description: "製造現場向けタクトタイム計算機 - 稼働時間、休憩時間、目標生産数からタクトタイムを自動計算",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Takt Calc",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
};

/**
 * 【RootLayout コンポーネント】
 * すべてのページを包む、ルート（最上位）のレイアウトコンポーネントです
 * 
 * @param children - このレイアウトの中に表示される子コンポーネント（例：page.tsx の内容）
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // children は、他のコンポーネント（子要素）を受け取るためのプロパティ
}>) {
  return (
    // HTMLの基本構造
    <html lang="ja">
      {/* body タグに、フォントの設定を適用 */}
      {/* {children} の部分に、page.tsx などのコンテンツが表示されます */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
