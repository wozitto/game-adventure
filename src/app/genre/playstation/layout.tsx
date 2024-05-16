import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プレイステーション | ゲームアドベンチャー",
  description:
    "荒れた土地にある毒の沼は、うまく避けながら進もう！道の途中で見つかるゲームを、ひとつひとつ集めていこう！",
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
