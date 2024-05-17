import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "スマホアプリ | ゲームアドベンチャー",
  description:
    "人がいなくなってしまった都会の中で、爆発物が散らばる危険な道を慎重に進もう！そして、隠れているゲームを見つけられるように、よく探そう！",
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
