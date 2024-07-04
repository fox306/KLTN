import { type } from 'os';

export type SignIn = {
    email: string;
    password: string;
};
export type SignUp = {
    email: string;
    fullName: string;
    password: string;
    gender: string;
    birthDay: string;
};

export type User = {
    _id: string;
    fullName: string;
    email: string;
    gender: string;
    birthDay: string;
    phone: string;
    avatar: string;
    spent: number;
    role: string;
    status: string;
};

export type updatePassword = {
    user: string;
    oldPass: string;
    newPass: string;
};
export type updateEmail = {
    userId: string;
    newEmail: string;
};

export type Category = {
    _id: string;
    name: string;
    img: string;
    selected?: boolean;
};

export type Product = {
    _id: string;
    name: string;
    images: string[];
    image: string;
    desc: string;
    category: Category;
    brand: string;
    price: number;
    rating?: number;
    sold?: number;
    status?: string;
    variant: Variant;
    selected?: boolean;
};

export type ProductByStatus = {
    status: string;
    pageNumber: number;
};

export type Variant = {
    listColor: detailColor[];
    listSize: string[];
};

export type detailColor = {
    color: string;
    hex: string;
    image: string;
};

export type Address = {
    _id?: string;
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
};

export type ItemCart = {
    user?: string;
    product: string;
    image: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
};

export type Cart = {
    _id?: string;
    user: string;
    total: number;
    items: ItemCart[];
};

export type Order = {
    _id: string;
    orderId: string;
    items: ItemCart[];
    user: string;
    deliveryAddress: Address;
    paymentMethod: string;
    total: number;
    status?: string;
    isPaid?: boolean;
    isDelivered?: boolean;
};

export type RemoveItemCart = {
    user: string;
    product: string;
};

export type updateOrder = {
    order: string;
    status: string;
};

export type findProduct = {
    color?: string;
    keyword?: string;
    sort: string;
    pageSize: number;
    pageNumber: number;
};

export type upAvatar = {
    img: string;
    user: string;
};

export type getSizeOfColor = {
    id: string;
    color: string;
};

export type variantColor = {
    size: string;
    quantity: number;
};

export type Brand = {
    brand: string;
    quantity: number;
};

export type itemCartRandomVari = {
    user: string;
    product: string;
    image: string;
    name: string;
    price: number;
};

export type updateCate = {
    category: string;
    name: string;
    image: string[];
};
export type updateCateImg = {
    image: string;
    category: string;
};
export type deleteOrder = {
    user: string;
    order: string;
};

export type findUser = {
    keyword: string;
    pageSize: number;
    pageNumber: number;
};

export type total = {
    total: number;
    percent: number;
};

export type day = {
    month: number;
    year: number;
};

export type brandYear = {
    brand: string;
    year: number;
};
export type cateYear = {
    category: string;
    year: number;
};

export type detailTotal = [day: string, total: number];
export type detailMonth = [date: number, total: number];
export type eachBrand = [brand: string, sold: number];
export type eachCate = [category: string, sold: number];
export type detailMonthCB = [month: string, total: number];

export type top = {
    id: string;
    name: string;
    image: string;
    spent: number;
    sold: number;
};

export type pageOrder = {
    status: string;
    pageNumber: number;
};

export type Coupon = {
    _id: string;
    code: string;
    name: string;
    value: number;
    type: string;
    minAmount: number;
    maxDiscount: number;
    validityDuration: number;
    status: string;
    selected?: boolean;
};

export type CreateCoupon = {
    code: string;
    name: string;
    value: number;
    minAmount: number;
    maxDiscount: number;
    validityDuration: number;
};

export type CreateVariant = {
    color: string;
    image: File | null;
    details: CreateSizes[];
};
export type CreateSizes = {
    size: string;
    quantity: number;
};
export type UpdateVariant = {
    color: string;
    image: string;
    details: CreateSizes[];
};

export type CreateVariants = {
    name_product: string;
    color: string;
    total_quantity: number;
    unit_price: number;
    total_price: number;
    receipt_variant: CreateSizes[];
};

export type Supplier = {
    _id?: string;
    supplier_name: string;
    contacter_name: string;
    email: string;
    phone: string;
    address: string;
    billing_infomation: Billing;
    total_receipt?: number;
};

export type Billing = {
    method: string;
    bank: string;
    bank_account: string;
    _id?: string;
};

export type Receipt = {
    receiptId: string;
    supplier: string;
    confirmer: string;
    confirmation_date: string;
    total_receipt: number;
};

export type Inventory = {
    product: string;
    name: string;
    totalInventory: number;
    sold: number;
};

export type FullDetailReceipt = {
    receiptId: string;
    supplier: string;
    confirmer: string;
    confirmation_date: string;
    total_receipt: number;
    details: DetailReceipt[];
};
export type DetailReceipt = {
    _id: string;
    receipt: string;
    name_product: string;
    color: string;
    receipt_variant: detailSize[];
    unit_price: number;
    total_quantity: number;
    total_price: number;
};

export type detailSize = {
    _id: string;
    size: string;
    quantity: number;
};
