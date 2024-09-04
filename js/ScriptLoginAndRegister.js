//verificação
let inptLogin = document.querySelectorAll('[name="inpt-login"]')
let inptRegister = document.querySelectorAll('[name="inpt-register"]')
let formLogin = document.querySelector('#form-login')
let formRegister = document.querySelector('#form-register')
let register = document.querySelector('.textsalign a p')
let messageErrorUser = document.querySelector('.logo')

const regexEmail = /^[A-Za-z0-9+_.-]+@(.+)$/
//

//valid
const addError = (input, message) => {
  input.classList.add('borderError')

  let container = input.parentElement;
  let capition = container.querySelector('p')

  let label = container.querySelector('label')
  label.classList.add('colorError')

  if (!capition) {
    capition = document.createElement('p')
    container.appendChild(capition)
  }
  capition.innerHTML = message
}

const removeError = (input) => {
  input.classList.remove('borderError')

  let container = input.parentElement;
  let capition = container.querySelector('p')

  let label = container.querySelector('label')
  label.classList.remove('colorError')
  if (capition) {
    container.removeChild(capition)
  }
}

const email = (input) => {
  if (!regexEmail.test(input.value)) {
    addError(input, 'Email inválido, por favor adicione um email válido!')
    return false
  } else {
    removeError(input)
    return true
  }
}

const password = (input) => {
  if (input.value.trim().length < 6) {
    addError(input, 'Senha inválida, senha deve conter seis caracteres!')
    return false
  }
  else {
    removeError(input)
    return true
  }
}
const passwordRepit = (input) => {
  if (input.value !== inptRegister[2].value ||
    input.value.trim().length == '') {
    addError(input, 'As senhas devem ser iguais!')
    return false
  } else {
    removeError(input)
    return true
  }
}

const checkBox = () => {
  let checkBox = document.querySelector('#check-box')
  let container = checkBox.parentElement
  let elementWarning = container.querySelector('p')

  if (!checkBox.checked) {
    if (!elementWarning) {
      let elementWarning = document.createElement('p')
      elementWarning.innerHTML = 'Por favor aceite os termos de uso e politica de privacidade!'
      container.appendChild(elementWarning)
      return false
    }
  } else {
    if (elementWarning) {
      container.removeChild(elementWarning)
    }
    return true
  }
}

const ValidBlank = (input) => {
  if (input.value.trim().length == '') {
    addError(input, 'Por favor preencha o campo!')
    return false
  } else {
    removeError(input)
    return true
  }
}



//eventos de clique
formLogin.addEventListener('submit', (event) => {
  event.preventDefault();

  const emailValidLogin = email(inptLogin[0]);
  const passwordValidLogin = password(inptLogin[1]);

  if (emailValidLogin && passwordValidLogin) {
    const fetchLogin = async () => {
      try {
        const urlLogin = await fetch('http://localhost:8055/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: inptLogin[0].value,
            password: inptLogin[1].value,
          }),
        });
        const dataLogin = await urlLogin.json();
        console.log(dataLogin);

        if (dataLogin.statusCode == 401) {
          messageErrorUser.innerHTML = `
            <div class="logo">
            <img src="./Assets/images/Svg/Logo.svg" alt="">
            <p>Acesse sua conta</p>
            <div class="UserNotMessage">
            <p>Usuário não existe, ou credenciais incorretas</p>
            </div>
            </div>
            `
        } else {
          const token = dataLogin.value;
          const decodedToken = jwt_decode(token)

          const userId = decodedToken.user.id
          console.log('user id:', userId)

          localStorage.setItem('userId', userId)
          localStorage.setItem('token', token)
          window.location.href = '/Pages/Homepage/index.html'
        }
      } catch (error) {
        console.error('Erro durante a requisição:', error.message);
      }
    };

    fetchLogin();



  }

});


register.addEventListener('click', () => {

  messageErrorUser.innerHTML = `
       <div class="logo">
            <img src="./Assets/images/Svg/Logo.svg" alt="">
            <p>Crie sua conta!</p>
            </div>
  `

  formLogin.style.display = 'none'
  formRegister.style.display = 'block'

  let linkAccount = document.querySelector('.accountLoginBack')
  linkAccount.addEventListener('click', () => {
    formLogin.style.display = 'block'
    formRegister.style.display = 'none'

    messageErrorUser.innerHTML = `
        <div class="logo">
            <img src="./Assets/images/Svg/Logo.svg" alt="">
            <p>Crie sua conta!</p>
            </div>
      `
  })

  let backButtom = document.querySelector('.backArrow')
  backButtom.addEventListener('click', () => {
    formLogin.style.display = 'block'
    formRegister.style.display = 'none'


    messageErrorUser.innerHTML = `
      <div class="logo">
          <img src="./Assets/images/Svg/Logo.svg" alt="">
          <p>Crie sua conta!</p>
          </div>
    `
  })

  formRegister.addEventListener('submit', (event) => {
    event.preventDefault()

    const emailValid = email(inptRegister[1])
    const passwordvalid = password(inptRegister[2])
    const ValidName = ValidBlank(inptRegister[0])
    const passwordRepitValid = passwordRepit(inptRegister[3])
    const checkBoxValid = checkBox()

    if (emailValid && passwordvalid && ValidName && passwordRepitValid && checkBoxValid) {

      const fetchRegister = async () => {

        try {
          const urlRegister = await fetch('http://localhost:8055/user/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: inptRegister[1].value,
              name: inptRegister[0].value,
              password: inptRegister[2].value,
              userGroupId: 2
            })
          })
          const dataRegister = await urlRegister.json();
          console.log(dataRegister)
          console.log(urlRegister.status)
          if (dataRegister.statusCode == 201) {
            messageErrorUser.innerHTML = `
                <div class="logo">
                <img src="./Assets/images/Svg/Logo.svg" alt="">
                <p>Acesse sua conta</p>
                <div class="UserNotMessage">
                <p>Usuário registrado com sucesso! por favor retorne e faça login.</p>
                </div>
                </div>
              `

          } else if (dataRegister.statusCode == 500) {
            messageErrorUser.innerHTML = `
            <div class="logo">
            <img src="./Assets/images/Svg/Logo.svg" alt="">
            <p>Acesse sua conta</p>
            <div class="UserNotMessage">
            <p>Usuário ou Email já cadastrado, faça login ou insira outro email!</p>
            </div>
            </div>
          `
          } else {
            messageErrorUser.innerHTML = `
            <div class="logo">
            <img src="./Assets/images/Svg/Logo.svg" alt="">
            <p>Acesse sua conta</p>
            <div class="UserNotMessage">
            <p>Erro no registro do usuário, por favor retorne mais tarde!</p>
            </div>
            </div>
          `
          }

        } catch (error) {
          console.error('Erro durante a requisição:', error.message);
        }


      }
      fetchRegister()
    }

  })

})
//

