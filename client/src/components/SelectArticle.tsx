"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import { Button } from "./ui/button";
import { useQueryState } from "nuqs";
import { size } from "valibot";

interface SelectArticle {
  listing: any;
  selectedArticleId: number;
  setSelectedArticle: Function;
}

export default function SelectArticle({
  listing,
  selectedArticleId,
  setSelectedArticle,
}: SelectArticle) {
  const router = useRouter();

  // const [viewingColor, setViewingColor] = useQueryState("vc");

  // const colors: any = [];
  // listing.articles.forEach((article: any) => {
  //   const currentColor = article.articleProperties[0].color;
  //   if (colors.filter((color: any) => color.color === currentColor).length > 0)
  //     return;
  //   colors.push({
  //     color: currentColor,
  //     articles: listing.articles.filter(
  //       (article: any) => article.articleProperties[0].color === currentColor,
  //     ),
  //   });
  // });
  const colors: any = [];
  listing.articleListingRelations.forEach((articleListingRelation: any) => {
    const currentColor =
      articleListingRelation.articles.articleProperties[0].color;
    if (colors.filter((color: any) => color.color === currentColor).length > 0)
      return;
    colors.push({
      color: currentColor,
      articles: listing.articleListingRelations
        .filter(
          (articleListingRelation: any) =>
            articleListingRelation.articles.articleProperties[0].color ===
            currentColor,
        )
        .map(
          (articlesListingRelation: any) => articlesListingRelation.articles,
        ),
    });
  });

  let articlesAvailableForSelectedColor: any = colors[0].articles;
  colors.forEach((colorObj: any) => {
    if (
      colorObj.articles.filter(
        (article: any) => +article.id === +selectedArticleId,
      ).length > 0
    )
      articlesAvailableForSelectedColor = colorObj.articles;
  });

  // const sizeOrder = ["XS", "S", "M", "L", "XL"];
  // articlesAvailableForSelectedColor.sort((a: any, b: any) => {
  //   let sizeA = a.articleProperties[0]?.size;
  //   let sizeB = b.articleProperties[0]?.size;
  //   let indexA = sizeOrder.indexOf(sizeA);
  //   let indexB = sizeOrder.indexOf(sizeB);
  //   return indexA - indexB;
  // });

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {colors.length > 1 &&
          colors.map((colorObj: any) => {
            if (
              colorObj.articles.filter(
                (article: any) => article.id === +selectedArticleId!,
              ).length > 0
            )
              return (
                <Button
                  onClick={() => setSelectedArticle(+colorObj.articles[0].id)}
                  variant="outline"
                  className="rounded-full bg-slate-700"
                >
                  {colorObj.color}
                </Button>
              );
            else
              return (
                <Button
                  onClick={() => setSelectedArticle(+colorObj.articles[0].id)}
                  variant="outline"
                  className="rounded-full"
                >
                  {colorObj.color}
                </Button>
              );
          })}
      </div>
      <div className="mb-4 flex gap-2">
        {articlesAvailableForSelectedColor.length > 1 &&
          articlesAvailableForSelectedColor.map((article: any) => {
            if (article.id === +selectedArticleId!)
              return (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-slate-700"
                >
                  {article.articleProperties[0].size}
                </Button>
              );
            else
              return (
                <Button
                  onClick={() => setSelectedArticle(+article.id)}
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  {article.articleProperties[0].size}
                </Button>
              );
          })}
      </div>
      <div className="mb-8">
        <span className="">In Stock: </span>
        <span>
          {
            listing.articleListingRelations.filter(
              (articleListingRelation: any) =>
                +articleListingRelation.articles.id === +selectedArticleId,
            )[0].articles.quantityInStock
          }
        </span>
      </div>

      {/* <div className="mb-6 flex gap-2">
        <Button size="icon" variant="outline">
          XS
        </Button>
        <Button size="icon" variant="outline">
          S
        </Button>
        <Button size="icon" variant="outline">
          M
        </Button>
        <Button size="icon" variant="outline">
          L
        </Button>
        <Button size="icon" variant="outline">
          XL
        </Button>
      </div> */}
    </div>
  );
}
