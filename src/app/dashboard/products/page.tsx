import { configProductDataLimit } from "@src/config";
import { Authorization } from "@src/lib/authorization";
import { getAllProducts } from "@src/lib/product-handler";
import { SProductSection } from "@src/components/compound";
import { SLoading } from "@src/components/root";
import { IProductPage } from "@src/types/app/dashboard/products";
import { IGetAllProductsReturn } from "@src/types/lib/product-handler";
import { Suspense } from "react";

export default async function ProductsPage({ searchParams }: IProductPage) {
  // await Authorization(["admin", "user"]);
  const currentPage: string = searchParams?.page || "1";
  const requestForGetAllProduct: Promise<IGetAllProductsReturn> =
    getAllProducts({
      currentPage: currentPage,
      dataLimit: configProductDataLimit,
    });
  return (
    <section>
      <Suspense fallback={<SLoading text="Loading..." />}>
        <SProductSection requestForGetAllProduct={requestForGetAllProduct} />
      </Suspense>
    </section>
  );
}
