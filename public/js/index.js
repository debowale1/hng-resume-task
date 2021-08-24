//send Email
const contactForm = document.querySelector('.contact-form');
const senderName = document.getElementById('name');
const senderEmail = document.getElementById('email');
const message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let formData = {
    name: senderName.value,
    email: senderEmail.value,
    message: message.value
  }
  // fetch('/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(formData)
  // })
  // .then(response => {
  //   console.log(response.json())
  // })
  // .catch(error => console.log(error));

  let xhr = new XMLHttpRequest()
  xhr.open('POST', '/')
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.onload = function(){
    console.log(xhr.responseText)
    if(xhr.responseText === 'success'){
      alert('Email Sent')
      senderName.value= '',
      senderEmail.value= ''
      message.value = ''
    }else{
      alert('something went wrong')
    }
  }
    xhr.send(JSON.stringify(formData))
  
})

