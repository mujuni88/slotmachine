(function () {

    var app = new SlotMachine();

    function Reel(items, interval, numInterval, selector) {
        this.items = items;
        this.interval = interval || 800;
        this.numInterval = numInterval || 6;
        this.selector = selector;
    }

    Reel.prototype.animate = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            var numInterval = self.numInterval;
            var tId = setInterval(function () {
                self.swap();
                if (--numInterval === 0) {
                    clearInterval(tId);
                    resolve(document.querySelectorAll(self.selector)[1].textContent);
                }
            }, self.interval);
        });
    };
    Reel.prototype.swap = function () {
        var self = this;

        var reelItems = document.querySelectorAll(self.selector);
        var temp = reelItems[0].outerHTML;
        reelItems[0].outerHTML = reelItems[2].outerHTML;
        reelItems[2].outerHTML = reelItems[1].outerHTML;
        reelItems[1].outerHTML = temp;
    };

    function SlotMachine() {
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
        
        var selector = '.reel-item';
        this.reelOne = new Reel(this.reelOneItems, 100, Math.floor(Math.random()*10) + 10, '#reel1 .reel-item');
        this.reelTwo = new Reel(this.reelTwoItems, 150, Math.floor(Math.random()*10) + 10, '#reel2 .reel-item');
        this.reelThree = new Reel(this.reelThreeItems, 200, Math.floor(Math.random()*10) + 10, '#reel3 .reel-item');
        this.reels = [this.reelOne, this.reelTwo, this.reelThree];

        var self = this;
        this.onLeverClick = function onLeverClick() {
            var res = document.getElementById('result');
 
            res.innerHTML = '';
            console.log('onLeverClick');
            var p1 = self.reelOne.animate(),
                p2 = self.reelTwo.animate(),
                p3 = self.reelThree.animate();

            console.log(p1);
            Promise.all([p1, p2, p3]).then(function(values){

                var temp = values[0];
                for (var i = 1; i < values.length; i++) {
                    if (values[i] !== temp) {
                        res.innerHTML = '<span class="clr-r">Sorry!, Try again later</span>';
                        return;
                    }
                }

                res.innerHTML = '<span class="clr-g">You won!, Free ' + temp + ' for you!!</span>';
            })
            ;


        };

        var start = document.getElementById('start');
        start.addEventListener('click', this.onLeverClick);
        console.log(this.onLeverClick);
    }

    SlotMachine.prototype.onLeverClick = function () {
        var self = this;
        var res = document.getElementById('result');
        
        res.innerHTML = '';

        console.log('onLeverClick');
        var p1 = self.reelOne.animate(),
            p2 = self.reelTwo.animate(),
            p3 = self.reelThree.animate();

        console.log(p1);
        Promise.all([p1, p2, p3]).then(function(values){

            var temp = values[i];
            for (var i = 1; i < values.length; i++) {
                if (values[i] !== temp) {
                    res.innerHTML = '<span class="clr-r">Sorry!, Try again later</span>';
                }
            }

            res.innerHTML = '<span class="clr-r">You won!, Free ' + temp + ' for you!!</span>';
        })
        ;


    };


})();