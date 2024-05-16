import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "スコア | ゲームアドベンチャー",
  description: "あなたのスコアと集めたゲームの一覧を確認しよう。",
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
