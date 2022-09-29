import { PurchaseModel } from "@/domains/models"
export interface LoadPurchases {
    loadAll: () => Promise<Array<LoadPurchases.Result>>
}

export namespace LoadPurchases{
    export type Result =PurchaseModel
}

