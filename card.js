class Card {
    constructor(x, y, image, pair, container, measure, spacing) {
        this.x = x
        this.y = y
        this.image = image
        this.pair = pair
        this.container = container
        this.measure = measure
        this.spacing = spacing
        this.create()
        this.positionate()
    }

    create = (measure, spacing) => {
        this.element = document.createElement('div')
        this.element.classList.add('card')
        this.element.style.width = `${this.measure}px`
        this.element.style.height = `${this.measure}px`

        let content = document.createElement('div')
        content.classList.add('content')

        let front = document.createElement('div')
        front.classList.add('front')
        front.style.backgroundImage = `url('${this.image}')`

        let back = document.createElement('div')
        back.classList.add('back')

        let text = document.createElement('span')
        text.classList.add('text')
        text.style.fontSize = `${this.measure / 8}px`
        text.innerText = 'MEMOTEST'

        back.appendChild(text)

        content.appendChild(front)
        content.appendChild(back)

        this.element.appendChild(content)

        this.container.appendChild(this.element)
    }

    positionate = () => {
        this.element.style.top = `${this.y * (this.measure + this.spacing)}px`
        this.element.style.left = `${this.x * (this.measure + this.spacing)}px`
        this.element.style.pointerEvents = 'all'
    }

    remove = () => {
        this.container.removeChild(this.element)
    }
}