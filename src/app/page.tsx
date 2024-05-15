import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/ui/components/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-center p-6 md:p-12 lg:p-24 space-y-6 lg:space-y-12">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          集めたいゲームのジャンルを選んで、冒険に出かけよう！
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Nintendo Switch</CardTitle>
              <CardDescription>
                草原の炎の中を走り抜けて、ゲームを集めよう！
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/genre/switch"
              >
                冒険する
              </Link>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>プレイステーション</CardTitle>
              <CardDescription>
                荒廃した地の毒沼を避け、ゲームを集めよう！
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/genre/playstation"
              >
                冒険する
              </Link>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>スマホアプリ</CardTitle>
              <CardDescription>
                都市の中のとげを避けて、ゲームを集めよう！
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/genre/app"
              >
                冒険する
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
