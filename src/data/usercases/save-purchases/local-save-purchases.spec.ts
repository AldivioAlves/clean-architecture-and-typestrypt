
import { CacheStoreSpy, mockPurchases } from '@/data/test'
import { LocalSavePurchases } from '@/data/usercases'


type SutTypes = {
    sut: LocalSavePurchases,
    cacheStore: CacheStoreSpy
}
const makeSut = (): SutTypes => {
    const cacheStore = new CacheStoreSpy()
    const sut = new LocalSavePurchases(cacheStore)
    return {
        cacheStore,
        sut
    }
}


describe('LocalSavePurchases', () => {
    test('Should delete old cache on sut.save', async () => {
        const { cacheStore, sut } = makeSut()
        await sut.save(mockPurchases())
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.deleteKey).toBe('purchases')
    })


    test('Shoud not inser new Cache if delete fails', () => {
        const { cacheStore, sut } = makeSut()
        cacheStore.simulateDeleteEError()
        const promise = sut.save(mockPurchases())
        expect(cacheStore.insertCallsCount).toBe(0)
        expect(promise).rejects.toThrow()
    })

    test('Shoud insert new Cache if delete succeeds', async () => {
        const { cacheStore, sut } = makeSut()
        const purchases = mockPurchases()
        await sut.save(purchases)
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.insertCallsCount).toBe(1)
        expect(cacheStore.insertKey).toBe('purchases')
        expect(cacheStore.insertValues).toEqual(purchases)
    })
    test('Should throw if insert throws', async () => {
        const { cacheStore, sut } = makeSut()
        cacheStore.simulateInsertError()
        const promise = sut.save(mockPurchases())
        expect(promise).rejects.toThrow()
    })

})