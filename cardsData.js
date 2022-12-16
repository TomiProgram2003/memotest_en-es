class CardsData {
    constructor(cols, rows, container) {
        this.cols = cols
        this.rows = rows
        this.pairsQuantity = (this.cols * this.rows) / 2
        this.container = container
        this.setPossiblePositions()
    }

    setPossiblePositions = () => {
        this.possiblePositions = []
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.possiblePositions.push(`${y}-${x}`)
            }
        }
    }

    generate = async (measure, spacing) => {
        this.data = {}
        for (let i = 1; i <= this.pairsQuantity; i++) {
            this.data[`cardsPair${i}`] = {}

            let image = await this.getImage(measure)

            for (let j = 1; j <= 2; j++) {
                let index = Math.floor(Math.random() * this.possiblePositions.length)
                let position = this.possiblePositions[index].split('-').map(a => Number(a))
                this.possiblePositions.splice(index, 1)
                let y = position[0]
                let x = position[1]
                let element = new Card(x, y, image, i, this.container, measure, spacing)
                this.data[`cardsPair${i}`][`card${j}`] = element
            }
        }
    }

    getImage = async (measure) => {
        let response = await axios.get(`https://picsum.photos/${measure}`)
        let url = response.request.responseURL
        return url
    }

    clear = () => {
        for (let pair in this.data) {
            for (let card in this.data[pair]) {
                this.data[pair][card].element.remove()
            }
        }
    }

    restart = () => {
        this.setPossiblePositions()

        for (let pair in this.data) {
            for (let card in this.data[pair]) {

                this.data[pair][card].element.classList.remove('turn')

                let index = Math.floor(Math.random() * this.possiblePositions.length)
                let position = this.possiblePositions[index].split('-').map(a => Number(a))
                this.possiblePositions.splice(index, 1)
                let y = position[0]
                let x = position[1]

                this.data[pair][card].y = y
                this.data[pair][card].x = x

                setTimeout(this.data[pair][card].positionate, 1500)
            }
        }
    }
}