/* eslint-env jest */
const apiIceAndFire = require('./anapioficeandfire');

const booksMock = {
    "url": "https://www.anapioficeandfire.com/api/books/3",
    "name": "A Storm of Swords",
    "isbn": "978-0553106633",
    "authors": [
        "George R. R. Martin"
    ]
}
const housesMock = [
    {
        "url": "https://www.anapioficeandfire.com/api/houses/1",
        "name": "House Algood",
        "region": "The Westerlands",
        "words": ""
    },
    {
        "url": "https://www.anapioficeandfire.com/api/houses/2",
        "name": "House Allyrion of Godsgrace",
        "region": "Dorne",
        "words": "No Foe May Pass"
    }
]
const houseAllyrionMock = {
    "url": "https://www.anapioficeandfire.com/api/houses/2",
    "name": "House Allyrion of Godsgrace",
    "region": "Dorne",
    "words": "No Foe May Pass",
    "currentLord": "https://www.anapioficeandfire.com/api/characters/298"
}

jest.mock('./anapioficeandfire', () => {
    const originalModule = jest.requireActual('./anapioficeandfire');
    return {
        __esModule: true,
        ...originalModule,
        getBooks: function () {
            return new Promise((resolve) => {
                resolve({ entity: booksMock });
            });
        },
        getListOfRestEndPoint: function () {
            return new Promise((resolve) => {
                resolve({ entity: housesMock });
            });
        },
        getHouse: function () {
            return new Promise((resolve) => {
                resolve({ entity: houseAllyrionMock });
            });
        },
    };
});

describe('API Tests', () => {
    describe('#getBooks() using Promises', () => {
        it('should load book data for A Storm of Swords', async () => {
            const data = await apiIceAndFire.getBooks();
            expect(data.entity).toBeDefined();
            expect(data.entity.name).toEqual('A Storm of Swords');
            expect(data.entity.isbn).toEqual('978-0553106633');
            expect(data.entity.authors).toContain('George R. R. Martin');
        });
    });

    describe('#getListOfRestEndPoint() using Promises', () => {
        it('should load houses data', async () => {
            const data = await apiIceAndFire.getListOfRestEndPoint();
            
            expect(data.entity).toBeDefined();
            expect(data.entity[1].name).toEqual('House Allyrion of Godsgrace');
            expect(data.entity[1].region).toEqual('Dorne');
            expect(data.entity[1].words).toEqual('No Foe May Pass');
        });
    });

    describe('#getHouse() using Promises', () => {
        it('should load house data for House Allyrion of Godsgrace', async () => {
            const data = await apiIceAndFire.getHouse();            
            expect(data.entity).toBeDefined();
            expect(data.entity.name).toEqual('House Allyrion of Godsgrace');
            expect(data.entity.region).toEqual('Dorne');
            expect(data.entity.words).toEqual('No Foe May Pass');
        });
    });
});