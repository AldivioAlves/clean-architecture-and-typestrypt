import { SavePurchases } from "@/domains/usecases"
import { CacheStore } from "@/data/protocols/cache"

export class CacheStoreSpy implements CacheStore {
    actions:Array<CacheStoreSpy.Action>= []
    insertValues:Array<SavePurchases.Params> = []
    deleteKey: string
    insertKey: string
    delete(key: string): void {
        this.actions.push(CacheStoreSpy.Action.delete)
        this.deleteKey = key
    }
    insert(key: string, value:any): void {
        this.actions.push(CacheStoreSpy.Action.insert)
        this.insertKey = key
        this.insertValues =value
    }

    replace(key: string, value:any): void {
        this.delete(key)
        this.insert(key,value)
    }
    simulateDeleteEError():void{
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(()=>{
        this.actions.push(CacheStoreSpy.Action.delete)
            throw new Error()
        })
    }
    simulateInsertError():void{
        jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(()=>{
        this.actions.push(CacheStoreSpy.Action.insert)
            throw new Error()
        })
    }
}

export namespace CacheStoreSpy{
    export enum Action{
        delete, 
        insert
    }

}