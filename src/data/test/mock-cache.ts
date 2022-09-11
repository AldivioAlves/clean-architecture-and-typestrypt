import { SavePurchases } from "@/domains/usecases"
import { CacheStore } from "@/data/protocols/cache"

export class CacheStoreSpy implements CacheStore {
    messages:Array<CacheStoreSpy.Message>= []
    insertValues:Array<SavePurchases.Params> = []
    deleteKey: string
    insertKey: string
    delete(key: string): void {
        this.messages.push(CacheStoreSpy.Message.delete)
        this.deleteKey = key
    }
    insert(key: string, value:any): void {
        this.messages.push(CacheStoreSpy.Message.insert)
        this.insertKey = key
        this.insertValues =value
    }
    simulateDeleteEError():void{
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(()=>{
        this.messages.push(CacheStoreSpy.Message.delete)
            throw new Error()
        })
    }
    simulateInsertError():void{
        jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(()=>{
        this.messages.push(CacheStoreSpy.Message.insert)
            throw new Error()
        })
    }
}

export namespace CacheStoreSpy{
    export enum Message{
        delete, 
        insert
    }

}