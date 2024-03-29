import Image from "next/image";

import { ReactElement, Suspense } from "react";

import MostPopular from "@/components/MostPopular";

import Header from "./Header";

// function Content({
//   reverse = false,
//   children,
//   title,
// }: {
//   reverse?: boolean;
//   children: ReactElement;
//   title: string;
// }) {
//   return (
//     <div className=" mx-auto max-w-7xl px-12 py-24">
//       <div className={`flex gap-8 ${reverse && "flex-row-reverse"}`}>
//         <div className=" flex w-1/3 flex-col gap-4 self-start rounded  ">
//           <h2 className="rounded bg-gray-800 p-8 font-nice text-4xl font-semibold uppercase">
//             {title}
//           </h2>
//         </div>
//         <div className=" w-2/3 rounded border-b-2 border-gray-600/20 p-8">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

export default async function Home() {
  return (
    <>
      <Header />
      <Suspense>
        <MostPopular />
      </Suspense>
    </>
  );
}
