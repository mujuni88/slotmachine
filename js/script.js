(function () {

    /**************** Application Start ****************/
    var reelData = [
        {
            interval:200,
            numInterval:11,
            selector:'#reel1 .slm-reel-item'
        },
        {
            interval:250,
            numInterval:11,
            selector:'#reel2 .slm-reel-item'
        },
        {
            interval:300,
            numInterval:11,
            selector:'#reel3 .slm-reel-item'
        }
    ];
    
    var reels = reelData.map(function(data){
        return new Reel(data.interval, data.numInterval, data.selector);
    });

    var app = new SlotMachine(reels),
        start = document.getElementById('start');

    start.addEventListener('click', function () {
        app.onLeverClick();
    });

    /**************** Reel Class ****************/
    function Reel(interval, numInterval, selector) {
        this.interval = interval || 800;
        this.numInterval = numInterval || 6;
        this.selector = selector;
        this.intervalId = null;
    }

    Reel.prototype.rotateReelItems = function () {
        var self = this,
            reelItems = document.querySelectorAll(self.selector),
            temp = reelItems[0].outerHTML;

        reelItems[0].outerHTML = reelItems[2].outerHTML;
        reelItems[2].outerHTML = reelItems[1].outerHTML;
        reelItems[1].outerHTML = temp;
    };


    Reel.prototype.animate = function () {
        var self = this;
        return new Promise(function (resolve) {
            var rand = Math.floor(Math.random() * 5),
                numInterval = rand + self.numInterval,
                data;

            if (self.intervalId) {
                clearInterval(self.intervalId);
            }

            self.intervalId = setInterval(function () {
                self.rotateReelItems();
                if (--numInterval === 0) {
                    clearInterval(self.intervalId);
                    data = document.querySelectorAll(self.selector)[1].getAttribute('data');
                    resolve(data);
                }
            }, rand + self.interval);
        });
    };

    /**************** SlotMachine Class ****************/
    function SlotMachine(reels) {
        this.reels = reels;
    }

    SlotMachine.prototype.onLeverClick = function () {
        var self = this,
            res = document.getElementById('result'),
            resLbl = document.querySelector('.slm-line-lbl'),
            promises = self.reels.map(function (reel) {
                return reel.animate();
            });

        resLbl.classList.remove('blink');
        res.innerHTML = 'Spinning...';

        Promise.all(promises).then(function (values) {
            self.displayResults(values);
        });
    };
    SlotMachine.prototype.displayResults = function(values){
        var res = document.getElementById('result'),
            resLbl = document.querySelector('.slm-line-lbl');
        
        var temp = values[0];
        for (var i = 1; i < values.length; i++) {
            if (values[i] !== temp) {
                res.innerHTML = '<span class="clr-r">Sorry, spin again</span>';
                return;
            }
        }

        res.innerHTML = '<span class="clr-g blink">You won free ' + temp + '</span>';
        resLbl.classList.add('blink');
    }

})();