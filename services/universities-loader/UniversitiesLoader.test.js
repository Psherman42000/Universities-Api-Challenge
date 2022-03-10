const UniversitiesLoader = require('./UniversitiesLoader')
const systemUnderTest = new UniversitiesLoader()

let mockedGet

const mockAxios = () => {
  mockedGet = jest.fn(async (endpoint, data) => ({data: []}))
  systemUnderTest._axios.get = mockedGet
}

mockAxios()

test('It should test if the system make request to get universities list', async () => {
  await systemUnderTest.getUniversitiesFromApi()
  const expectedCallsNumber = require('./countrys-data/countrys.json').countrys.length
  expect(mockedGet.mock.calls.length).toBe(expectedCallsNumber)
  mockedGet.mock.calls.map( call => {
    const endpoint = call[0]
    expect(endpoint.includes('http://universities.hipolabs.com/search?country=')).toBeTruthy()
  })
})