model = {}
model.collectionName ='books'
model.books = []
model.addInfo = (info)=> {
  firebase.firestore().collection('books').doc('whWnKt6JCXYMql5FPSZi').update(info)
}

model.loadBooks = () => {
  firebase.firestore().collection(model.collectionName).get().then(res => {
    const data = ultis.getDataFromDocs(res.docs) 
    model.books = data
    console.log(model.books)
  })
  view.showBooks()
}