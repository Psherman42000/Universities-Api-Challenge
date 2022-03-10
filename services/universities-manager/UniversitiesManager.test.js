const UniversitiesManager = require('./UniversitiesManager')

let mockedData

const getMockedModel = () => {
  mockData = () => {
    mockedData = [
      {
        _id: 'testeId',
        name: 'testName',
        country: 'testcountry',
        'state-province': 'testState-provice',
        createdAt: 'xxx',
        udpatedAt: 'yyy',
        __v: 'zzz'
      }
    ]
  }
  mockData()
  const mockedModel = {
    create: async () => true,
    find: (param) => {
      const result = param._id !== mockedData[0]._id ?
        param.name ?
          [] :
          mockedModel :
        mockedData
      return result
    },
    skip: () => mockedModel,
    limit: () => mockedData,
    findByIdAndUpdate: async () => true,
    findByIdAndDelete: async () => true,
  }
  return mockedModel
}

const systemUnderTest = new UniversitiesManager(getMockedModel())

test('It should test if the UniversitiesManager.getUniversities method', async () => {
  const expectedData = [{
    _id: mockedData[0]._id,
    estado: mockedData[0]['state-province'],
    nome: mockedData[0].name,
    pais: mockedData[0].country,
  }]
  expect(await systemUnderTest.getUniversities({})).toStrictEqual(expectedData)
})

test('It should test if the UniversitiesManager.getUniversitieById method', async () => {
  expect(await systemUnderTest.getUniversitieById(mockedData[0]._id)).toStrictEqual(mockedData[0])
})

test('It should test if the UniversitiesManager.deleteUniversity method', async () => {
  expect(await systemUnderTest.deleteUniversity(mockedData[0]._id)).toStrictEqual({success: true})
})

test('It should test if the UniversitiesManager.createUniversity method', async () => {
  const desiredObj = {
    name: 'testName',
    country: 'testcountry',
    'state-province': 'testState-provice',
    web_pages: [],
    domains: [],
    alpha_two_code: 'BA'
  }
  expect(await systemUnderTest.createUniversity({desiredObj})).toStrictEqual({success: true})
})

test('It should test if the UniversitiesManager.updateUniversity method', async () => {
  const desiredObj = {
    name: 'testName',
    web_pages: [],
    domains: [],
  }
  const id = mockedData._id
  expect(await systemUnderTest.updateUniversity({id, ...desiredObj})).toStrictEqual({success: true})
})