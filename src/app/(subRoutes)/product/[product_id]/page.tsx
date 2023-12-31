import Image from "next/image";

import MostPopular from "@/components/MostPopular";
import Reviews from "@/components/Reviews";
import Container from "@/components/general/Container";
import Seperator from "@/components/general/Seperator";
import Title1 from "@/components/general/Title1";
import Counter from "@/components/layout/navigation/cart/Counter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import AddToCartBtn from "./AddToCartBtn";
import LeftSectoin from "./LeftSectoin";

export default async function Product({
  params,
}: {
  params: { product_id: string };
}) {
  const response: any = await fetch(
    `${process.env.HOST}/api/product/${params.product_id}`,
  );
  const product = (await response.json()).content[0];

  return (
    <>
      <Container className="pt-14">
        {/* <div className="flex items-stretch gap-8 bg-fuchsia-500 py-20 md:flex-row">
          <div className=" flex aspect-square grow items-center justify-center bg-pink-400">
            image
          </div>
          <div className=" w-[22rem] bg-pink-400">titleee</div>
        </div> */}

        <div className="flex flex-col items-stretch gap-8 lg:flex-row">
          <LeftSectoin product={product} />
          <div className="w-full shrink-0 lg:w-[22rem]">
            <div className=" mb-10">
              <Title1>{product.title}</Title1>
              <p>{product.description}</p>
            </div>
            <div className=" mb-10 w-full">
              <AddToCartBtn item={product} />
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="uppercase">
                  fabric
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="uppercase">
                  garment care
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="uppercase">
                  shipping
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Container>
      <Seperator />
      <Reviews />
      <Seperator />
      <MostPopular />
    </>
  );
}
