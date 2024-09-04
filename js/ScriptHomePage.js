//informações personalizadas
const userId = localStorage.getItem('userId');
if (userId) {

  const fetchApi = async ()=>{
    try {
      const response = await fetch(`http://localhost:8055/user/list/${userId}`)
      const data = await response.json()
      console.log(data)

      let welcomehtml = document.querySelector('.welcome h2')
      const fullName = data.value.name
      const firstName = fullName.split(' ')
      welcomehtml.innerHTML = firstName[0]
      
      let profile = document.querySelector('.profile h1')
      profile.innerHTML = `Olá ${firstName[0]}`

      let infoHTML = document.querySelectorAll('.infoP p')
      infoHTML[1].innerHTML = data.value.name
      infoHTML[3].innerHTML = data.value.email

    } catch {
      
    }
  }
  fetchApi()
}

//Filter color
let dashboard = document.querySelector('.viewDashboard')
let filter = document.querySelectorAll('.filter')
filter.forEach(filter => {
  filter.addEventListener('click', () => {
    document.querySelectorAll('.Green')
    .forEach(classGreen =>
     classGreen.classList.remove('Green'));

    if(!filter.classList.contains('Green')) {
      filter.classList.add('Green')
    }
  })
})

// Filter
let Week = document.querySelectorAll('.nextWorkout h4')
filter[1].addEventListener('click',()=>{
  Week.forEach(week=>{
    if(week.innerText === 'Quinta-Feira'){
      
    } else {
      let hiddenToday = document.querySelector('.todayWorkout')
      hiddenToday.style.display = 'none'
      let parentone = week.closest('.info')
      parent = parentone.parentElement
      nextH1 = parent.parentElement
      parent.style.display = 'none'
    }
  })
})

// Scroll Filter

let scroll = document.querySelectorAll('.scroll i')
let scrollContainer = document.querySelector('.container-Filter')
scroll[1].addEventListener('click',()=>{
  scrollContainer.scrollLeft += 300
})
scroll[0].addEventListener('click', ()=>{
  scrollContainer.scrollLeft -= 300
})

//Menu

let buttonMenu = document.querySelector('.containerBackground i')
let menuexpanse = document.querySelector('.MenuExpanse')
const main = document.querySelector('main');
let accountUpdate = document.querySelector('.btn')
let settingsHtml = document.querySelector('.settings')

buttonMenu.addEventListener('click',()=>{
  if(menuexpanse.style.display === 'none'){
   menuexpanse.style.display = 'block'
    main.addEventListener('click', ()=>{
      menuexpanse.style.display = 'none'
      settingsHtml.style.display = 'none'
    }) 
    
  } else {
    menuexpanse.style.display = 'none'
  }
})
//editar informações
accountUpdate.addEventListener('click', ()=> {
  
  if(settingsHtml.style.display === 'none')  {
     settingsHtml.style.display = 'block'
     
      let inptUpdate = document.querySelectorAll('[name="nameStng"]')
      
      let settingsButton = document.querySelector('.settings button')
      settingsButton.addEventListener('click', ()=>{
        if(inptUpdate[0].value == '' && inptUpdate[1].value == '' && inptUpdate[2].value == '') {
          alert('Nenhum dado inserido para atualizar!')
        } else  {
          const FetchUpdate = async ()=>{
            try {
              let infopass = {
                name: inptUpdate[0].value,
                email: inptUpdate[1].value,
                password: userId.password,
                userGroupId: 2
              }

              if(infopass.name === '') {
                infopass.name =  userId.name
              } if (infopass.email === '') {
                infopass.email = userId.email
              }


              const response = await fetch(`http://localhost:8055/user/update/${userId}`,{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json', 
              }, 
              body: JSON.stringify(infopass)
              })
              if (response.ok) {
                location.reload()
              }
            } catch {
              console.error('erro',error);
              alert('Erro ao atualizar dados por favor tente novamente mais tarde!')
            }
          }
          FetchUpdate()
        }
      })

      
    } else {
      settingsHtml.style.display = 'none'
    }

})

//cards exercicios
let exerciciesExpanse = document.querySelectorAll('.exercices')
exerciciesExpanse.forEach( exercices=>{
    exercices.addEventListener('click', ()=>{
      if(!exercices.classList.contains('view')) {
        exercices.classList.add('view')
      } else {
        exercices.classList.remove('view')
      }
    })
})

//exercicio feito
let starCompleted = document.querySelectorAll('.iTask')
starCompleted.forEach(star=>{
  star.addEventListener('click',()=>{
    let parent = star.parentElement
    parent.innerHTML = `
             <h1>Seu treino foi concluido com sucesso!</h1>
            <h2>Volte amanhã para atualizações!</h2>
            <i class="fa-solid fa-medal fa-2xl" style="color: #ff751f;"></i>
    `
    parent.classList.add('taksCompleted')
  })
})
//