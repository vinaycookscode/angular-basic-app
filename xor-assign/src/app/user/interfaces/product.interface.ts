export interface IProductInformation {
    name: string;
    image: string;
    actualPrice: number;
    sellPrice: number;
    color: string;
    dimension: IProductDimensions;
    weight: number;
    isActive?: boolean;
    _id?: string;
}

export interface IProductDimensions {
    height: number;
    width: number;
}

export interface IAddUserProduct {
  id: string;
  productId: [string];
}
