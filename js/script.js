(function () {

    var app = new SlotMachine(),
        start = document.getElementById('start');
    
    start.addEventListener('click', function(){
        app.onLeverClick();
    });
    
    function Reel(interval, numInterval, selector) {
        this.interval = interval || 800;
        this.numInterval = numInterval || 6;
        this.selector = selector;
        this.intervalId = null;
    }

    Reel.prototype.animate = function () {
        var self = this;
        return new Promise(function (resolve) {
            var rand = Math.floor(Math.random()*5);
            var numInterval = rand + self.numInterval;
            
            if(self.intervalId){
                clearInterval(self.intervalId);
            }
            
            self.intervalId = setInterval(function () {
                self.swap();
                if (--numInterval === 0) {
                    clearInterval(self.intervalId);
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
        this.reelOne = new Reel(200, 11, '#reel1 .slm-reel-item');
        this.reelTwo = new Reel(250, 13, '#reel2 .slm-reel-item');
        this.reelThree = new Reel(300, 12, '#reel3 .slm-reel-item');
    }

    SlotMachine.prototype.onLeverClick = function () {
        var self = this,
            res = document.getElementById('result');
            resLbl = document.querySelector('.slm-line-lbl');
        
        resLbl.classList.remove('blink');

        res.innerHTML = 'Spinning...';
        var p1 = self.reelOne.animate(),
            p2 = self.reelTwo.animate(),
            p3 = self.reelThree.animate();

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