
import { CacheStoreSpy, getCacheExpirationDate} from '@/data/test'
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

    
    test('Should delete cache if load fails',() => {
        const { cacheStore, sut } = makeSut()
        cacheStore.simulateFetchError()
        sut.validate()
        expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete])
        expect(cacheStore.deleteKey).toBe('purchases')
    })

    test('Sould has no side effect if load succedds',()=>{
        const currentDate = new Date()
        const timestamp = getCacheExpirationDate(currentDate)
        timestamp.setSeconds(timestamp.getSeconds()+1)
        const {cacheStore, sut} = makeSut(currentDate)
        cacheStore.fetchResult={ timestamp   }
        sut.validate()
        expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch])
        expect(cacheStore.fetchKey).toBe('purchases')
    })

})