controller = {}
controller.addInfo = (info) => {
  if (info.name === ''){
    view.setErrorMessage('error-name','Please input name')
  } else {
    view.setErrorMessage('error-name','')
  }
  if (info.author === ''){
    view.setErrorMessage('error-author','Please input author')
  } else {
    view.setErrorMessage('error-author','')
  }
  if (info.name !== '' && info.author !== '') {
    model.addInfo(info)
  }
}