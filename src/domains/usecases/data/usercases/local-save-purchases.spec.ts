class LocalSavePurchases{
    constructor(private readonly cacheStore:CacheStore){}

    async save ():Promise<void>{
        this.cacheStore.delete()
    }

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

interface CacheStore{
    delete:()=> void
}

class CacheStoreSpy implements CacheStore{
    deleteCallsCount = 0
    delete(): void{
        this.deleteCallsCount++
    }
}


describe('LocalSavePurchases',()=>{
    test('Should delete old cache on sut.save',async()=>{
        const {cacheStore} = makeSut()
        const sut = new LocalSavePurchases(cacheStore)
        await sut.save()
        expect(cacheStore.deleteCallsCount).toBe(1)
    })
    test('Should delete old cache on sut.save',async()=>{
        const {cacheStore, sut} = makeSut()
        await sut.save()
        expect(cacheStore.deleteCallsCount).toBe(1)
    })
})