const view = {}

view.setActiveScreen = (screenName) => {
  switch  (screenName) {
    case 'mainScreen':
      document.getElementById('app').innerHTML = components.mainScreen
      let addForm = document.getElementById('add-form')
      addForm.addEventListener('submit',  (e) => {
        e.preventDefault()
        const info = {
          name: addForm.name.value,
          author: addForm.author.value
        }
        controller.addInfo(info)
      })
      firebase.firestore().collection(model.collectionName).get().then(res => {
        const data = ultis.getDataFromDocs(res.docs) 
        model.books = data
        console.log(model.books[0].books)
        view.showBooks()
      })
      
  }
}

view.setErrorMessage = (elementID, message) => {
  document.getElementById(elementID).innerText = message
}

view.showBooks = () => {
  for (let i=0; i<model.books[0].books.length; i++){
    document.getElementById('book-author').innerText += model.books[0].books[i].author + "|"
    document.getElementById('book-name').innerText += model.books[0].books[i].name + "|"
  }
}