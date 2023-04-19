export type TOrderStatus = "created" | "pending" | "done";

export type TOrder = {
    ingredients: string[];
    _id: string;
    name: string;
    status: TOrderStatus;
    number: number;
    createdAt: string;
    updatedAt: string;
}


