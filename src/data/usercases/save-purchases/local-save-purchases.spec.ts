
import { CacheStoreSpy, mockPurchases } from '@/data/test'
import { LocalSavePurchases } from '@/data/usercases'


type SutTypes = {
    sut: LocalSavePurchases,
    cacheStore: CacheStoreSpy
}
const makeSut = (timestamp= new Date()): SutTypes => {
    const cacheStore = new CacheStoreSpy()
    const sut = new LocalSavePurchases(cacheStore, timestamp)
    return {
        cacheStore,
        sut
    }
}

describe('LocalSavePurchases', () => {

    test('Should not delete or insert cache on sut.init', () => {
        const { cacheStore } = makeSut()
        expect(cacheStore.actions).toEqual([])
    })

    test('Shoud not inser new Cache if delete fails', async() => {
        const { cacheStore, sut } = makeSut()
        cacheStore.simulateDeleteEError()
        const promise = sut.save(mockPurchases())
        expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.delete])
        await expect(promise).rejects.toThrow()
    })

    test('Shoud insert new Cache if delete succeeds', async () => {
        const timestamp = new Date()
        const { cacheStore, sut } = makeSut(timestamp)
        const purchases = mockPurchases()
        const promise =  sut.save(purchases)
        expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.delete, CacheStoreSpy.Action.insert])
        expect(cacheStore.insertKey).toBe('purchases')
        expect(cacheStore.insertValues).toEqual({
            timestamp,
            value:purchases
        })
        await expect(promise).resolves.toBeFalsy()
    })

    test('Should throw if insert throws', async () => {
        const { cacheStore, sut } = makeSut()
        cacheStore.simulateInsertError()
        const promise = sut.save(mockPurchases())
        expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.delete,CacheStoreSpy.Action.insert])
       await expect(promise).rejects.toThrow()
    })

})