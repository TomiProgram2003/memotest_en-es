(function () {

    class App {
        constructor() {
            this.getScreens()
            this.configureLanguaje()
            this.getAndConfigureButtons()
        }

        getScreens = () => {
            this.menu = document.querySelector('.menu')
            this.loading = document.querySelector('.loading')
            this.esc = document.querySelector('.esc')
            this.win = document.querySelector('.win')
            this.gameContainer = document.querySelector('.gameContainer')
            this.screens = {
                menu: this.menu,
                loading: this.loading,
                esc: this.esc,
                win:  this.win,
                gameContainer: this.gameContainer
            }
        }

        configureLanguaje = () => {
            if (localStorage.getItem('languaje')) this.languaje = localStorage.getItem('languaje')
            else {
                this.languaje = 'en'
                localStorage.setItem('languaje', this.languaje)
            }

            this.setLanguaje()
        }

        setLanguaje = () => {
            [...document.querySelectorAll('*[txtID]')].forEach(element => {
                let index = Number(element.getAttribute('txtID'))
                let HTMLCode = element.getAttribute('HTMLCode')
                let split = element.getAttribute('split')

                if (HTMLCode) {
                    if (split !== null) {
                        let chars = translator[index][this.languaje].split('')
                        let fragment = new DocumentFragment()

                        chars.forEach(char => {
                            let charElement = document.createElement(HTMLCode)
                            charElement.textContent = char
                            fragment.appendChild(charElement)
                        })

                        element.innerHTML = ''
                        element.appendChild(fragment)

                    } else {
                        let HTMLElement = document.createElement(HTMLCode)
                        HTMLElement.textContent = translator[index][this.languaje]
                        element.innerHTML = HTMLElement
                    }

                } else {
                    element.textContent = translator[index][this.languaje]
                }
            })
        }

        changeLanguaje = (e) => {
            this.languaje = e.target.textContent.toLowerCase()
            localStorage.setItem('languaje', this.languaje)
            this.setLanguaje()
        }

        getAndConfigureButtons = () => {
            // Menu buttons
            this.menuButtons = [...document.querySelectorAll('.difficulty')]
            this.menuButtons.forEach(button => button.addEventListener('click', () => {
                if (navigator.onLine) {
                    let difficulty = button.getAttribute('difficulty')
                    this.game = new Game(difficulty, this.screens, this.buttons)

                } else {
                    alert(translator[12][this.languaje])
                }
            }))

            // Esc buttons
            this.escButtonYes = this.esc.querySelector('.yes')
            this.escButtonNo = this.esc.querySelector('.no')
            this.escButtons = {
                yes: this.escButtonYes,
                no: this.escButtonNo
            }

            // Win buttons
            this.winButtonRestart =  this.win.querySelector('.restart')
            this.winButtonReturn =  this.win.querySelector('.return')
            this.winButtons = {
                restart: this.winButtonRestart,
                return: this.winButtonReturn
            }

            // Game buttons
            this.buttons = {
                escButtons: this.escButtons,
                winButtons: this.winButtons
            }

            this.languajeButton = document.querySelector('.languajeButton')
            this.languajeButton.addEventListener('click', this.changeLanguaje)
        }
    }

    const app = new App()

}())