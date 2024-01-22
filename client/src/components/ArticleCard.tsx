"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

import Counter from "./layout/navigation/cart/Counter";
import { useFavsSlice } from "@/state/useFavsSlice";
import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";
import { toast } from "sonner";

export default function ArticleCard({ article }: { article: any }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { items, open, increment } = useShoppingCartSlice();
  const { favArticles, toggleFav } = useFavsSlice();

  const articleCount = items.filter((cartItem) => cartItem.id === article.id)[0]
    ? items.filter((cartItem) => cartItem.id === article.id)[0]
    : 0;

  return (
    <div className="relative overflow-hidden whitespace-nowrap rounded">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full opacity-40 blur-xl"
        width={200}
        height={200}
        src={article.articleImages[0].imagePath}
        alt=""
      />
      <div className="relative z-10 flex w-full flex-col">
        <div className="p-4">
          <Link
            href={`/listing/${article.articleListingRelations[0].listings.id}?article=${article.id}`}
          >
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded">
              <Image
                className="relative z-10 w-full"
                width={200}
                height={200}
                src={article.articleImages[0].imagePath}
                alt=""
              />
            </div>
          </Link>
          <div className="p-2">
            <div className="flex items-center">
              <div className="mb-4 mt-2 max-w-full overflow-auto">
                <strong>{article.name}</strong>
              </div>
              <button className="ml-auto" onClick={() => toggleFav(article)}>
                {favArticles.filter(
                  (articleState) => articleState.id === article.id,
                ).length > 0 ? (
                  <StarIconSolid className="size-6 stroke-2" />
                ) : (
                  <StarIconOutline className="size-6 stroke-2" />
                )}
              </button>
            </div>
            <div className="mb-4 font-light">
              <strong>{article.price} SEK</strong>
            </div>
          </div>
          <div className="mt-auto w-full">
            {!articleCount ? (
              <Button
                className="w-full"
                onClick={() => {
                  // setModalIsOpen(true);
                  toast(`${article.name} ligger nu i din kundvagn`, {
                    description: (
                      <div className=" mt-2 flex gap-2">
                        <Button>Öppna kundvagn</Button>{" "}
                        <Counter article={article} />
                      </div>
                    ),
                    duration: 6000,
                  });

                  increment(article);
                }}
              >
                KÖP
              </Button>
            ) : (
              <div className="flex w-full justify-center">
                <Counter article={article} />
              </div>
            )}
          </div>
        </div>
        {/* <AlertDialog
          open={modalIsOpen}
          onOpenChange={() => {
            setModalIsOpen(false);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {listing.title} ligger nu i din kundvagn!
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Fortsätt handla</AlertDialogCancel>
              <AlertDialogCancel onClick={() => open()}>
                Öppna kundvagn
              </AlertDialogCancel>
              <AlertDialogAction>Till kassan</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </div>
    </div>
  );
}