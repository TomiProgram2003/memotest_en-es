class Game {
    constructor(mapSize, screens, buttons) {
        this.mapSize = mapSize
        this.buttons = buttons
        this.configure(screens)
    }

    configure = async (screens) => {
        this.configureScreen(screens)
        await this.configureCards()
        this.configureAlgorithm()
        this.loading.style.display = 'none'
        this.gameContainer.style.display = 'block'
        this.configureButtons()
        this.configureGameInterval()
        setTimeout(() => {
            alert(`${translator[11][localStorage.getItem('languaje')]}`)
        }, 100)
    }

    configureScreen = ({ menu, loading, esc, win, gameContainer }) => {
        this.menu = menu
        this.loading = loading
        this.esc = esc
        this.win = win
        this.gameContainer = gameContainer

        this.menu.style.display = 'none'
        this.loading.style.display = 'block'

        this.sizes = this.mapSize.split('x').map(size => Number(size))
        this.cols = this.sizes[0]
        this.rows = this.sizes[1]

        this.spacing = 10
        this.calculateMeasure()

        this.gameContainer.style.width = `${(this.cols) * (this.measure + this.spacing) - this.spacing}px`
        this.gameContainer.style.height = `${(this.rows) * (this.measure + this.spacing) - this.spacing}px`
    }

    calculateMeasure = () => {
        let totalWidth = document.body.clientWidth
        let totalHeight = document.body.clientHeight

        let measureAccordingWidth = Math.floor((totalWidth + ((this.cols * this.spacing))) / this.cols) - (this.spacing * 4)
        let measureAccordingHeight = Math.floor((totalHeight + ((this.rows * this.spacing))) / this.rows) - (this.spacing * 4)

        let minDimension = measureAccordingWidth < measureAccordingHeight ? 'width' : 'height'
        let direction = minDimension == 'width' ? this.cols : this.rows

        this.measure = minDimension == 'width' ? measureAccordingWidth : measureAccordingHeight

        let max = minDimension == 'width' ? document.body.clientWidth : document.body.clientHeight

        let temporalMeasure = this.measure

        while (temporalMeasure * direction < max - (this.spacing * direction + (this.spacing * (direction / 4)))) {
            temporalMeasure += 1
        }

        this.measure = temporalMeasure
    }

    configureCards = async () => {
        this.cardsData = new CardsData(this.cols, this.rows, this.gameContainer)
        await this.cardsData.generate(this.measure, this.spacing)
    }

    configureAlgorithm = async () => {
        this.algorithm = new Algorithm(this.cardsData.data, this.endGame)
    }

    configureButtons = () => {
        this.configureEscButtons()
        this.configureWinButtons()
    }

    configureEscButtons = () => {
        this.escState = false
        window.addEventListener('keydown', this.escPressed)
        this.buttons.escButtons.yes.addEventListener('click', this.returnToMenu)
        this.buttons.escButtons.no.addEventListener('click', this.quitEsc)
    }

    configureWinButtons = () => {
        this.buttons.winButtons.restart.addEventListener('click', this.restart)
        this.buttons.winButtons.return.addEventListener('click', this.returnToMenu)
    }

    escPressed = (event) => {
        if (!this.escState && event.key == 'Escape')  {
            this.escState = true
            this.esc.style.display = 'block'

            let container = this.esc.querySelector('.buttonsContainer')
            container.style.animationName = 'faceDown'
        }
    }

    configureGameInterval =  () => {
        this.gameInterval = setInterval(() => {
            if (this.algorithm.uncoveredPairs == this.cardsData.pairsQuantity) this.endGame()
        }, 1500)
    }

    returnToMenu = () => {
        document.body.style.animationName = 'darken'

        setTimeout(() => {
            this.clear()
            this.gameContainer.style.display = 'none'
            this.esc.style.display = 'none'
            this.win.style.display = 'none'
            this.menu.style.display = 'flex'

            document.body.style.animationName = 'none'
        }, 1500)

        this.removeEvents()
    }

    quitEsc = () => {
        let container = this.esc.querySelector('.buttonsContainer')
        container.style.animationName = 'faceUp'
        
        setTimeout(() => {
            this.escState = false
            this.esc.style.display = 'none'
        }, 1000)
    }

    clear = () => {
        this.cardsData.clear()
    }

    restart = () => {
        let container = this.win.querySelector('.buttonsContainer')
        container.style.animationName = 'faceUp'

        this.cardsData.restart()
        
        setTimeout(() => {
            this.win.style.display = 'none'
            this.configureGameInterval()
        }, 1500)
    }

    removeEvents = () => {
        window.removeEventListener('keydown', this.escPressed)

        this.buttons.escButtons.yes.removeEventListener('click', this.returnToMenu)
        this.buttons.escButtons.no.removeEventListener('click', this.quitEsc)

        this.buttons.winButtons.restart.removeEventListener('click', this.restart)
        this.buttons.winButtons.return.removeEventListener('click', this.returnToMenu)
    }

    endGame = () => {
        clearInterval(this.gameInterval)

        this.win.style.display = 'block'
        
        let container = this.win.querySelector('.buttonsContainer')
        container.style.animationName = 'faceDown'
    }
}