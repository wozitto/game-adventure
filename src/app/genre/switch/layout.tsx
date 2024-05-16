import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nintendo Switch | ゲームアドベンチャー",
  description:
    "燃える炎の中を、勇気を出して草原を走り抜けよう！そして、ステキなゲームを見つけ出そう！",
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
