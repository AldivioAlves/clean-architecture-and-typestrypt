import { SavePurchases } from "@/domains/usecases"
import { CacheStore } from "@/data/protocols/cache"

export class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0
    insertCallsCount = 0
    insertValues:Array<SavePurchases.Params> = []
    deleteKey: string
    insertKey: string
    delete(key: string): void {
        this.deleteCallsCount++
        this.deleteKey = key
    }
    insert(key: string, value:any): void {
        this.insertCallsCount++
        this.insertKey = key
        this.insertValues =value
    }
    simulateDeleteEError():void{
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(()=>{
            throw new Error()
        })
    }
    simulateInsertError():void{
        jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(()=>{
            throw new Error()
        })
    }
}