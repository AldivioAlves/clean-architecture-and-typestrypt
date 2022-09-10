import {CacheStore} from '@/data/protocols/cache'
import {LocalSavePurchases} from '@/data/usercases'

type SutTypes={
    sut:LocalSavePurchases,
    cacheStore: CacheStoreSpy
}
const makeSut = ():SutTypes=> {
    const cacheStore = new CacheStoreSpy()
    const sut = new LocalSavePurchases(cacheStore)
    return {
        cacheStore,
        sut
    }
}

class CacheStoreSpy implements CacheStore{
    deleteCallsCount = 0
    insertCallsCount = 0
    key:string
    delete(key:string): void{
        this.deleteCallsCount++
        this.key = key
    }
}


describe('LocalSavePurchases',()=>{
    test('Should delete old cache on sut.save',async()=>{
        const {cacheStore, sut} = makeSut()
        await sut.save()
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.key).toBe('purchases')
    })

    test('Shoud not inser new Cache if delete fails',()=>{
        const {cacheStore, sut} = makeSut()
        jest.spyOn(cacheStore,'delete').mockImplementationOnce(()=>{
            throw new Error()
        })
       const promise =  sut.save()
        expect(cacheStore.insertCallsCount).toBe(0)
        expect(promise).rejects.toThrow()
    })
})