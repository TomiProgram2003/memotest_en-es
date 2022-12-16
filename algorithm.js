class Algorithm {
    constructor(cardsData) {
        this.cardsData = cardsData
        this.selectedCards = []
        this.inProcess = false
        this.uncoveredPairs = 0
        this.configureEvents()
        console.log()
    }

    configureEvents = (endGame) => {
        for (let pair in this.cardsData) {

            for (let card in this.cardsData[pair]) {

                let object = this.cardsData[pair][card]

                object.element.addEventListener('click', () => {

                    if (this.selectedCards.length < 2 && !this.selectedCards.includes(object)) {
                        object.element.classList.add('turn')
                        this.selectedCards.push(object)
                    }

                    if (this.selectedCards.length == 2 && !this.inProcess) {
                        this.inProcess = true
                        let pair1 = this.selectedCards[0].pair
                        let pair2 = this.selectedCards[1].pair

                        if (pair1 == pair2) {
                            this.selectedCards[0].element.style.pointerEvents = 'none'
                            this.selectedCards[1].element.style.pointerEvents = 'none'
                            this.selectedCards.splice(0, 2)
                            this.uncoveredPairs += 1

                        } else {
                            setTimeout(() => {
                                this.selectedCards[0].element.classList.remove('turn')
                                this.selectedCards[1].element.classList.remove('turn')
                                this.selectedCards.splice(0, 2)
                            }, 1500)
                        }

                        setTimeout(() => {
                            this.inProcess = false
                        }, 1500)
                    }
                })
            }
        }
    }
}