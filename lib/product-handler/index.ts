import { ICommonReturnData } from "@src/types/common";
import {
  IGetAllProductsReturn,
  IGetIndividualProductByIdReturn,
  IProduct,
} from "@src/types/lib/product-handler";
import { promises as fs } from "fs";

interface paginationReturnInterface {
  dataLimit: number;
  skipData: number;
  totalPage: number;
}

interface IGetAllProducts {
  currentPage: string;
  dataLimit: number;
}

const paginationHandler: (
  inputDataLimit: number,
  dataCollection: any,
  inputPageNo: string
) => paginationReturnInterface = (
  inputDataLimit,
  dataCollection,
  inputPageNo
) => {
  const limitData: number = inputDataLimit || 5; //if data limit has given from body then that will be apply otherwise global default data limit will b apply
  const totalData: number = dataCollection.length; //get all data count
  const pageNo: number = +inputPageNo ? +inputPageNo : 1; //if page number has given from body then that will be apply otherwise global default page number will b apply
  // const skipData: number = pageNo * limitData; //this amount of data will be skip
  const skipData: number = pageNo * limitData - limitData; //this amount of data will be skip
  const totalPage: number = Math.ceil(totalData / limitData); //total this amount of page we need
  return {
    dataLimit: limitData,
    skipData,
    totalPage,
  };
};

export function queryAllProductFromJson(): Promise<IProduct[]> {
  return new Promise(async (resolve) => {
    const parseProduct: IProduct[] = JSON.parse(
      await fs.readFile(process.cwd() + "/public/db/products.db.json", "utf8")
    );
    resolve(parseProduct);
  });
}

function getPaginationProductByApplyingSkipLimitData(
  products: IProduct[],
  dataLimit: number,
  skipData: number
): IProduct[] {
  const startIndex = skipData;
  const endIndex = skipData + dataLimit;
  return products.slice(startIndex, endIndex);
}

export async function getAllProducts({
  currentPage,
  dataLimit: limit,
}: IGetAllProducts): Promise<IGetAllProductsReturn> {
  try {
    const getAllProduct: IProduct[] = await queryAllProductFromJson();
    const { dataLimit, skipData, totalPage } = paginationHandler(
      limit,
      getAllProduct,
      currentPage
    );

    const cutData: IProduct[] = getPaginationProductByApplyingSkipLimitData(
      getAllProduct,
      dataLimit,
      skipData
    );
    if (cutData.length) {
      return {
        message: `${getAllProduct.length} products has found!!`,
        status: 202,
        payload: {
          products: cutData,
          totalPage: totalPage.toFixed(),
          currentPage: +currentPage,
        },
      };
    } else {
      return {
        message: `No Product found!!!`,
        status: 404,
        payload: {
          products: cutData,
          totalPage: totalPage.toFixed(),
          currentPage: 0,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: `Some things went wrong into product fetch`,
      status: 404,
      payload: {
        products: [],
        totalPage: "0",
        currentPage: 0,
      },
    };
  }
}

export async function getIndividualProductById(
  productId: string
): Promise<IGetIndividualProductByIdReturn> {
  try {
    const getAllProduct = await queryAllProductFromJson();
    if (getAllProduct.length) {
      const searchProductFromList = getAllProduct.find(
        (product) => product.productId == productId
      );
      if (searchProductFromList) {
        return {
          message: `${searchProductFromList.name} has found!!!`,
          status: 202,
          payload: {
            product: searchProductFromList,
          },
        };
      } else {
        return {
          message: `No Product found`,
          status: 404,
          payload: {
            product: null,
          },
        };
      }
    } else {
      return {
        message: `No Product found`,
        status: 404,
        payload: {
          product: null,
        },
      };
    }
  } catch (err) {
    return {
      message: `Somethings went wrong`,
      status: 501,
      payload: {
        product: null,
      },
    };
  }
}
