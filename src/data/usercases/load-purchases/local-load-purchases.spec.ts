
import { CacheStoreSpy, mockPurchases } from '@/data/test'
import { LocalLoadPurchases } from '@/data/usercases'


type SutTypes = {
    sut: LocalLoadPurchases,
    cacheStore: CacheStoreSpy
}
const makeSut = (timestamp= new Date()): SutTypes => {
    const cacheStore = new CacheStoreSpy()
    const sut = new LocalLoadPurchases(cacheStore, timestamp)
    return {
        cacheStore,
        sut
    }
}

describe('LocalLoadPurchases', () => {

    test('Should not delete or insert cache on sut.init', () => {
        const { cacheStore } = makeSut()
        expect(cacheStore.actions).toEqual([])
    })

})