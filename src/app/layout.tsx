/**
 * 【このファイルについて】
 * このファイルは、Webアプリ全体のレイアウト（構造）を定義しています。
 * すべてのページで共通して使用される設定（フォント、メタデータなど）をここで設定します。
 */

// Next.jsの型定義を読み込みます（TypeScriptで使用）
import type { Metadata } from "next";
// Google Fontsからフォントを読み込みます
import { Geist, Geist_Mono } from "next/font/google";
// グローバルなCSSスタイルを読み込みます
import "./globals.css";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  "http://localhost:3000";

const normalizedSiteUrl =
  rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")
    ? rawSiteUrl
    : `https://${rawSiteUrl}`;

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
 * OGP（Open Graph Protocol）設定により、SNSでのシェア時に適切な情報が表示されます
 */
export const metadata: Metadata = {
  metadataBase: new URL(normalizedSiteUrl),
  title: "タクトタイム計算機",
  description: "生産技術・製造業向けの、入力するだけで瞬時に計算できるタクトタイム計算アプリです。",
  openGraph: {
    title: "タクトタイム計算機 - 現場専用",
    description: "生産技術・製造業向けの、入力するだけで瞬時に計算できるタクトタイム計算アプリです。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "タクトタイム計算機",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "タクトタイム計算機 - 現場専用",
    description: "生産技術・製造業向けの、入力するだけで瞬時に計算できるタクトタイム計算アプリです。",
    images: ["/opengraph-image"],
  },
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
    // HTMLの基本構造（日本語のページとして設定）
    <html lang="ja">
      {/* body タグに、フォントの設定を適用 */}
      {/* {children} の部分に、page.tsx などのコンテンツが表示されます */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
