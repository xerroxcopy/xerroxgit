const store = new SteinStore(
  'https://api.steinhq.com/v1/storages/5efd782883c30d0425e2c5ba'
)
export let publications = []
store.read('publication', {limit: 100, offset: 0}).then((data) => {
  console.dir(data)
  publications = data
  const publicationTypesArr = publications.map(
    (publication) => publication.type
  )
  console.log(publicationTypesArr)
  const publicationTypes = publicationTypesArr.filter((elem, index, self) => {
    self.indexOf(elem) === index
  })
  console.log('publicationTypes', publicationTypes)
})

// module.exports = {publications: publications}
