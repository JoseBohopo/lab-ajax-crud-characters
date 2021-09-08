const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');

function changeError() {
  console.log('error');
  const color = document.querySelector('#send-data')
  color.style.backgroundColor = 'red'
  return false
}

function changeSucces() {

  const color = document.querySelector('#send-data')
  color.style.backgroundColor = 'green'
}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    event.preventDefault()
    charactersAPI
      .getFullList()
      .then(response => {

        let text = ' '
        response.data.forEach(elm => {

          text += ` <div class="character-info">
                <div class="name">${elm.name}(${elm.id})</div>
                <div class="occupation">${elm.occupation}</div>
                <div class="cartoon">${elm.cartoon}</div>
                <div class="weapon">${elm.weapon}</div>
              </div>`
          document.querySelector('.character-info').innerHTML = text
        })

      })

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()
    const valueId = document.querySelector('.operation input').value

    charactersAPI
      .getOneRegister(valueId)
      .then(response => {
        let text = ''

        console.log(response.data)


        text += ` <div class="character-info">
                 <div class="name">${response.data.name}(${response.data.id})</div>
                 <div class="occupation">${response.data.occupation}</div>
                 <div class="cartoon">${response.data.cartoon}</div>
                 <div class="weapon">${response.data.weapon}</div>
                 </div>`

        document.querySelector('.characters-container').innerHTML = text
      })


  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    event.preventDefault()

    const valueId = document.querySelector('.operation.delete input').value


    charactersAPI
      .deleteOneRegister(valueId)
      .then((minion) => {
        console.log(minion)
        if (minion.data) {
          const color = document.querySelector('#delete-one')
          color.style.backgroundColor = 'green'
          return
        } else {
          const color = document.querySelector('#delete-one')
          color.style.backgroundColor = 'red'
        }

      })
      .catch((err) => {
        console.log('its not workig', err)
      })


  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {



  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const inputs = document.querySelectorAll('#new-character-form input')

    const character = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    Object.values(character).every(function(elm){
      console.log(elm.length)
      if(elm.length == 0){
        return changeError()
      } else {
       create()
      }
    })

function create(){
      console.log('string creo');
      charactersAPI
        .createOneRegister(character)
        .then((minions) => {
          changeSucces()
        })
      }


  });
});