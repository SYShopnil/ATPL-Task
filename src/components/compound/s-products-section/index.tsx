import { Button, SProductCard } from "@src/components/root";
import { CPaginationTrack } from "@src/components/root/c-pagnination-track";
import { CSearchBar } from "@src/components/root/search-bar";
import { IGetAllProductsReturn } from "@src/types/lib/product-handler";
import { BtnColorSchema } from "@src/types/root";

interface ISProductSection {
  requestForGetAllProduct: Promise<IGetAllProductsReturn>;
}

export async function SProductSection({
  requestForGetAllProduct,
}: ISProductSection) {
  const {
    payload: { products, currentPage, totalPage },
  } = await requestForGetAllProduct;
  return (
    <div>
      <div className={`flex justify-evenly items-start space-x-2 pl-[2rem]`}>
        <div className="flex-[1_1_50%]">
          <CSearchBar />
        </div>
        <div className="flex-[1_1_16%]">
          <Button
            btnText={"Add++"}
            isArrow={true}
            colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
          />
        </div>
        <div className="flex-[1_1_16%]">
          <Button
            btnText={"Update"}
            isArrow={true}
            colorSchema={BtnColorSchema.SolidBgVioletTextWhite}
          />
        </div>
        <div className="flex-[1_1_17%]">
          <Button
            btnText={"Delete--"}
            isArrow={true}
            colorSchema={BtnColorSchema.SolidBgGrayTextViolet}
          />
        </div>
      </div>
      <div
        className={`grid grid-cols-12 gap-2  mt-[5rem] pl-[2rem] place-content-center`}
      >
        {products.map((product) => {
          return (
            <div
              className="col-span-12  md:col-span-6  lg:col-span-4"
              key={product.productId}
            >
              <SProductCard
                desc={product.desc}
                id={product.productId}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            </div>
          );
        })}
      </div>
      <div className="p-[2rem]">
        <CPaginationTrack currentPage={+currentPage} totalPage={+totalPage} />
      </div>
    </div>
  );
}
//  {
//    products.length ? (
//      <>
//        {products.map((product) => {
//          return (
//            <div key={product.productId}>
//              <p>{product.name}</p>
//              <p>hello</p>
//            </div>
//          );
//        })}
//      </>
//    ) : (
//      <div>No Product found!!</div>
//    );
//  }
