export type Product = {
    ProductId :number; 
    categoryId : number;
    ProductType : string;
    ProductTypeId:number;
    name:string ;    
    productInto :string ; 
    Description :string ;
    ProductPrice :number;
    DiscountPrice:number;
    Stock  :number;    
    ProductStatus :string
    isDeleted :boolean   
    Images : Images[];
    category:Category ;   
}
export interface Category {
    CategoryId: number;       
    title: string;         
    description: string;
    imageName: string;
    imageUrl: string;
    isDeleted: boolean;
  }

export type Images ={
    productId :number;
    fileId:number;
    fileName :string;
    filePath :string; 
    fileType :string;
    fileSize :string;
    uploadDate :Date;
    isDeleted:boolean;  
}  


export type OrderResponse = {
    id: number;
    orderNumber: string;
    invoiceId: string;
    stripeCheckoutSessionId: string;
    stripeCustomerId: string;
    clerkUserId: string;
    customerName: string;
    email: string;
    stripePaymentIntentId: string;
    createdAt: string; // or Date if you parse it
    updatedAt: string; // or Date if you parse it
    currency: string;
    amountDiscount: number;
    totalPrice: number;
    status: string;
    products: ProductInOrder[];
    invoice: Invoice;
  }[];
  
  export type ProductInOrder = {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
    orderId: number;
    product: Product;
  };
  
  export type ProductImage = {
    productId: number;
    fileId: number;
    fileName?: string;
    filePath?: string;
    fileType?: string;
    fileSize: number;
    uploadDate: string; // or Date
    isDeleted: boolean;
  };
  
  export type Invoice = {
    id: number;
    invoiceId?: string;
    number?: string;
    hostedInvoiceUrl?: string;
  };
  