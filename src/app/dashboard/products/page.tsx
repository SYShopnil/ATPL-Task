import { Authorization } from "@root/lib/authorization";
import { getAllProducts } from "@root/lib/product-handler";
import { SProductSection } from "@src/components/compound";
import { IGetAllProductsReturn } from "@src/types/lib/product-handler";
import { Suspense } from "react";

interface IProductPage {
  searchParams?: { [key: string]: string | undefined };
}

export default async function ProductsPage({ searchParams }: IProductPage) {
  await Authorization(["admin", "user"]);
  const currentPage: string = searchParams?.page || "1";
  const requestForGetAllProduct: Promise<IGetAllProductsReturn> =
    getAllProducts({
      currentPage: currentPage,
      dataLimit: 5,
    });
  return (
    <section>
      <Suspense fallback={<div>Loading....</div>}>
        <SProductSection requestForGetAllProduct={requestForGetAllProduct} />
      </Suspense>
    </section>
  );
}
