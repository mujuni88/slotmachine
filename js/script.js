(function () {

    var app = new SlotMachine(),
        start = document.getElementById('start');
    
    start.addEventListener('click', function(){
        app.onLeverClick();
    });
    
    function Reel(items, interval, numInterval, selector) {
        this.items = items;
        this.interval = interval || 800;
        this.numInterval = numInterval || 6;
        this.selector = selector;
    }

    Reel.prototype.animate = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            var rand = Math.floor(Math.random()*5);
            var numInterval = rand + self.numInterval;
            var tId = setInterval(function () {
                self.swap();
                if (--numInterval === 0) {
                    clearInterval(tId);
                    resolve(document.querySelectorAll(self.selector)[1].getAttribute('data'));
                }
            }, rand + self.interval);
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
        this.reelOne = new Reel(this.reelOneItems, 200, 11, '#reel1 .slm-reel-item');
        this.reelTwo = new Reel(this.reelTwoItems,  250, 13, '#reel2 .slm-reel-item');
        this.reelThree = new Reel(this.reelThreeItems,  300, 12, '#reel3 .slm-reel-item');
        this.reels = [this.reelOne, this.reelTwo, this.reelThree];
    }

    SlotMachine.prototype.onLeverClick = function () {
        var self = this,
            res = document.getElementById('result');
            resLbl = document.querySelector('.slm-line-lbl');
        
        resLbl.classList.remove('blink');

        res.innerHTML = 'Spinning...';
        console.log('onLeverClick');
        var p1 = self.reelOne.animate(),
            p2 = self.reelTwo.animate(),
            p3 = self.reelThree.animate();

        console.log(p1);
        Promise.all([p1, p2, p3]).then(function(values){

            var temp = values[0];
            for (var i = 1; i < values.length; i++) {
                if (values[i] !== temp) {
                    res.innerHTML = '<span class="clr-r">Sorry, spin again</span>';
                    return;
                }
            }

            res.innerHTML = '<span class="clr-g blink">You won free ' + temp + '</span>';
            resLbl.classList.add('blink');
        });
    };

})();