const app = new SlotMachine();

class Reel {
    constructor(items, interval, numInterval, selector) {
        this.items = items;
        this.interval = interval || 800;
        this.numInterval = numInterval || 6;
        this.selector = selector;
    }

    animate() {
        const self = this;
        debugger;
        return new Promise((resolve, reject) => {
            ((num => {
                const tId = setInterval(() => {
                    self.swap();
                    if (--num === 0) {
                        clearInterval(tId);
                        resolve(document.querySelectorAll(self.selector)[1].text);
                    }
                }, self.interval);
            }))(self.numInterval);
        });
    }

    swap() {
        const self = this;

        const reelItems = document.querySelectorAll(self.selector);
        const temp = reelItems[0].innerHTML;
        reelItems[0].innerHTML = reelItems[2].innerHTML;
        reelItems[2].innerHTML = reelItems[1].innerHTML;
        reelItems[1].innerHTML = temp;
    }
}

class SlotMachine {
    constructor() {
        // reel 1
        this.coffeeMaker = {
                name: 'Coffee Maker',
                type: 'coffee',
                img: ''
            };
            this.teapot = {
                name: 'Teapot',
                type: 'tea',
                img: ''
            };
            this.espressoMachine = {
                name: 'Espresso Machine',
                type: 'espresso',
                img: ''
            };
        // reel 2 
        this.coffeeFilter = {
                name: 'Coffee Filter',
                type: 'coffee',
                img: ''
            };
            this.teaStrainer = {
                name: 'Tea Strainer',
                type: 'tea',
                img: ''
            };
            this.espressoTamper = {
                name: 'Espresso Tamper',
                type: 'espresso',
                img: ''
            };
        // reel 3
        this.coffeeGrounds = {
                name: 'Coffee Grounds',
                type: 'coffee',
                img: ''
            };
            this.looseTea = {
                name: 'Loose Tea',
                type: 'tea',
                img: ''
            };
            this.espressoBeans = {
                name: 'Espresso Beans',
                type: 'espresso',
                img: ''
            };

        this.reelOneItems = [this.coffeeMaker, this.teapot, this.espressoMachine];
        this.reelTwoItems = [this.coffeeFilter, this.teaStrainer, this.espressoTamper];
        this.reelThreeItems = [this.coffeeGrounds, this.looseTea, this.espressoBeans];
        
        const selector = '.reel-item';
        this.reelOne = new Reel(this.reelOneItems, 800, 6, selector);
        this.reelTwo = new Reel(this.reelTwoItems, 800, 6, selector);
        this.reelThree = new Reel(this.reelThreeItems, 800, 6, selector);
        this.reels = [this.reelOne, this.reelTwo, this.reelThree];

        const start = document.getElementById('start');
        start.addEventListener('click', this.onLeverClick);
        console.log(this.onLeverClick);
    }

    onLeverClick() {
        debugger;
        const self = this;

        console.log('onLeverClick');
        const p1 = self.reelOne.animate(), p2 = self.reelTwo.animate(), p3 = self.reelThree.animate();

        console.log(p1);
        Promise.all([p1, p2, p3]).then(values => {
            const res = document.getElementById('result');

            const temp = values[i];
            for (let i = 1; i < values.length; i++) {
                if (values[i] !== temp) {
                    res.innerHTML = '<span class="clr-r">Sorry!, Try again later</span>';
                }
            }

            res.innerHTML = `<span class="clr-r">You won!, Free ${temp} for you!!</span>`;
        });


    }
}