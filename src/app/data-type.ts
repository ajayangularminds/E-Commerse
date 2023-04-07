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
}