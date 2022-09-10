class LocalSavePurchases{
    constructor(private readonly cacheStore:CacheStore){}

    async save ():Promise<void>{
        this.cacheStore.delete()
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
        const cacheStore = new CacheStoreSpy()
        const sut = new LocalSavePurchases(cacheStore)
        await sut.save()
        expect(cacheStore.deleteCallsCount).toBe(1)
    })
})