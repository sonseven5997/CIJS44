components = {}
components.mainScreen = `
<form id="add-form">
<div class="input-wrapper">
  <input type="text" name="name" placeholder="Name ...">
  <div class="error" id="error-name"></div>
</div>
<div class="input-wrapper">
  <input type="text" name="author" placeholder="Author ...">
  <div class="error" id="error-author"></div>
</div>
<button type="submit" id='btn'>Add</button>
</form>
<div id='books' >
  <div id="book-name">Name:</div>
  <div id="book-author">Author:</div>
</div>
`