const ultis = {}

ultis.getDataFromDoc = (doc) => {
    const data = doc.data()
    data.id = doc.id
    return data
}

ultis.getDataFromDocs = (docs) => {
    return docs.map(ultis.getDataFromDoc)
}