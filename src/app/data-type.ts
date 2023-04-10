export interface SignUp{
    name: string;
    email:string;
    password:string;
}

export interface Login{
    email: string;
    password:string;
}

export interface Product{
    productName:string;
    productPrice:number;
    productColor:string;
    productCategory:string;
    productDescription:string;
    productImageUrl:string;
    id:number;
    quantity:undefined | number;
    productId: undefined | number;
}

export interface cart{
    productName:string;
    productPrice:number;
    productColor:string;
    productCategory:string;
    productDescription:string;
    productImageUrl:string;
    id:number | undefined;
    quantity:undefined | number;
    userId:number;
    productId:number;
}

export interface PriceSummary{
    price:number;
    discount:number;
    tax:number;
    delivery:number;
    total:number;

}

export interface Order{
    email:string;
    address:string;
    contactNo:string;
    totalPrice:number;
    userId:number;
    id:number | undefined;
}