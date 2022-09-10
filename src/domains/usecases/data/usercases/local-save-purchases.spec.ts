class LocalSavePurchases{
    constructor(private readonly cacheStore:CacheStore){}

    async save ():Promise<void>{
        this.cacheStore.delete('purchases')
    }

}
interface CacheStore{
    delete:(key:string)=> void
}
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
    key:string
    delete(key:string): void{
        this.deleteCallsCount++
        this.key = key
    }
}


describe('LocalSavePurchases',()=>{
    test('Should delete old cache on sut.save',async()=>{
        const {cacheStore} = makeSut()
        const sut = new LocalSavePurchases(cacheStore)
        await sut.save()
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.key).toBe('purchases')
    })
})