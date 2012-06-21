function UserActivityMonitor (activityTimeDelta, actOnWheel, actOnScroll, actOnMove) {
    var self = $(this);
    self.movedMouse = false;
    self.scrolledMouse = false;
    self.mouseWheeled = false;

    var _touched = false;

    if (actOnScroll) $(window).bind('scroll', function(){
        self.scrolledMouse = true;
        self.updateActivity("scroll");
    });
    if (actOnMove) $(window).bind('mousemove', function(){
        self.movedMouse = true;
        self.updateActivity("mousemove");
    });

    if (actOnWheel) $(document).bind('mousewheel', function(event, delta, deltaX, deltaY) {
        self.mouseWheeled = true;
        self.updateActivity("mousewheel");
    });

    var updateOnTimerTrigger = false;
    var timerId;
    self.updateActivity = function(type) {

        if (!_touched) {
            _touched = true;
            self.trigger("activityStart", {"monitor":self, "type":type});
            updateOnTimerTrigger = true;
        }

        if (updateOnTimerTrigger) {
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(self.updateOnTimer, activityTimeDelta);
        }

    };

    self.updateOnTimer = function () {
        if (_touched) {
            _touched = false;
            self.trigger("activityStop", {"monitor":self});
            updateOnTimerTrigger = false;
        }
    };

    return self;
}

function ScrollHint(el) {
    var shown = false;
    var self = this;

    self.enabled = true;

    var element = $(el);
    var showenMargin = element.data('showen');
    var hiddenMargin = element.data('hidden');
    var direction = element.data('direction');

    this.show = function() {
        shown = true;
        var a = {};
        a[direction] = showenMargin + "px";
        element.animate(a, 500, "easeInOutQuart", function(){
        });
    };

    this.hide = function() {
        shown = false;
        var a = {};
        a[direction] = hiddenMargin + "px";
        element.animate(a, 500, "easeInOutQuart", function(){
        });
    };

    this.updateState = function() {
        setInterval(self.updateState, 1000);
    };

    this.setEnabled = function(value) {
        self.enabled = value;
        if (!value && shown) {
            self.hide();
        }
    };

    return this;
}

function World(config) {
    var rootElement = config.rootElement;
    var fakeScroll = config.fakeScroll;
    var nav = config.nav;
    var goindex = config.goindex;
    var initalizedHandler = config.initalizedHandler;

    var FAKE_SCROLL_SIZE = 5000;
    var PERSPECTIVE_FACTOR = 0.5;
    var MOUSEWHEEL_SENSITIVITY_Y = -50;

    var self = this;
    self._objects = [];
    self._rightestBlockPos = 0;
    self._rightestBlockDepth = 0;
    self._lastScrollLeft = 0;
    self._windowWidth = 0;
    self._window = $(window);

    var navigationItems = {};

    self.leftScrollHint = new ScrollHint($("#leftHint"));
    self.rightScrollHint = new ScrollHint($("#rightHint"));
    self.userActivity = null;

    self.userAtShowCase = false;
    self.userAtHello = false;
    self.userLearned = 0;
    self.learning = false;

    var cleanNav = false;
    function setupNavigation(navitems) {
        $(navitems).each(function(i, o){
            var item = $(o).attr('rel');
            $(o).click(function(){
                self.learning = false;
                if(item == 'showcase-start') {
                    self.userAtShowCase = true;
                    self.userAtHello = false;
                }
                if (item == "hello") {
                    self.userAtShowCase = false;
                    self.userAtHello = true;
                }
                cleanNav = false;
                $(navitems).removeClass('selected');
                $(o).addClass('selected');
                var depth = navigationItems[item]["depth"];
                var posx = navigationItems[item]["posx"];
                var wW = self._windowWidth;
                var rBP = self._rightestBlockPos;
                var newMargin = $(o).hasClass('addmargin')?94:-2;
                var scrollPos = calculateScrollPos(posx,newMargin,wW,depth,rBP);
                $('html,body').stop();
                $('html,body').animate({scrollLeft: scrollPos}, 2000, "easeInOutQuart", function(){ cleanNav = true; self.learning = true; });
            });
        });
        $(goindex).click(function(){
            self.userAtHello = false;
            self.userAtShowCase = false;

            cleanNav = true;
            $('html,body').stop();
            $('html,body').animate({scrollLeft:0}, 2000, "easeInOutQuart");
        });
    }

    function calculateScrollPos(posx, newMargin, wW, depth, rBP){
        return (posx - newMargin * 1000 / wW) / (depth * PERSPECTIVE_FACTOR) / rBP * (FAKE_SCROLL_SIZE - wW);
    }

    function calculateMargin (posx, scroll, wW, rBP, depth) {
        return (posx - (scroll / (FAKE_SCROLL_SIZE - wW) * rBP) * (depth * PERSPECTIVE_FACTOR)) / 1000 * wW;
    }

    function updateScrollHandler(event) {
        if (self.learning) self.userLearned++;
        if (cleanNav) {
            $(nav).removeClass('selected');
            cleanNav = false;
        }
        var scroll = self._window.scrollLeft();
        if (scroll < 0) {
            scroll = 0;
        }
        var newMargin;
        var obj;

        for (var i = 0, l = self._objects.length; i < l; i++) {
            obj = self._objects[i];
            var depth = obj[1];
            var posx = obj[2];
            var wW = self._windowWidth;
            var rBP = self._rightestBlockPos;
            newMargin = calculateMargin(posx,scroll,wW,rBP,depth);
            obj[0].css({'marginLeft':newMargin + 'px'});
            if (obj[0].attr('id') == 'hello') {
                if (Math.abs(newMargin / 1100 * wW) < 250) {
                    self.userAtShowCase = false;
                    self.userAtHello = true;
                } else {
                    self.userAtShowCase = true;
                    self.userAtHello = false;
                }
            }
        }

        self._lastScrollLeft = scroll;
    }

    function doInitialLayout() {
        var lastPosX = 0;
        self._rightestBlockPos = 0;
        self._objects = [];
        $('.fullscreen').each(function(i, obj){
            if ($(obj).data('width'))
                $(obj).width(self._windowWidth * parseInt($(obj).data('width'))/1000);
            else
                $(obj).width(self._windowWidth);
        });
        $(rootElement).find('article').each(function (i, o) {
            var articlePosX = $(o).data('posx') || 0 + lastPosX;
            var posx = 0;
            if (articlePosX > self._rightestBlockPos) {
                self._rightestBlockPos = articlePosX;
            }
            $(o).find('*').each( function(i, obj) {
                var depth = $(obj).data('depth');
                var posy = $(obj).data('posy');
                posx = $(obj).data('posx') + articlePosX;

                if (depth != undefined && posy != undefined && posx != undefined ) {
                    $(obj).css({
                        'marginLeft':posx / 1000 * self._windowWidth + 'px',
                        'marginTop': posy / 640 * self._windowHeight + 'px',
                        'z-index': Math.ceil(depth*10),
                        'position': 'absolute'
                    });

                    if ($(obj).attr('id') && $(obj).hasClass('nav')) {
                        navigationItems[$(obj).attr('id')] = {"object":$(obj), "depth": depth, "posx": posx};
                    }

                    self._objects.push([$(obj), depth, posx]);
                }
            });
            lastPosX = articlePosX;
        });
        self._rightestBlockPos = 2906;
    }

    function setupForWindowHandler() {
        self.learning = false;
        self._windowWidth = self._window.width();
        self._windowHeight = self._window.height();
        var fontSize = Math.floor(self._windowHeight/700 * 14.5);
        if (fontSize < 13) {
            fontSize = 13;
        }
//        if (fontSize > 18) {
//            fontSize =  18;
//        }
        $(document.body).css({"fontSize": fontSize + "px"});
        doInitialLayout();
        updateScrollHandler();
        self.learning = true;
    }

    function setupMouseWheelHandling() {
        $(document).bind('mousewheel', function(event, delta, deltaX, deltaY) {
            self.userLearned++;
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                var toScroll = parseFloat($(document).scrollLeft()) + MOUSEWHEEL_SENSITIVITY_Y * deltaY;
                $(document).scrollLeft(toScroll);
            }

            if (deltaY) event.preventDefault();

        });
    }

    self.scrollTimer = undefined;

    this.init = function () {
        $('<div style="width: ' + FAKE_SCROLL_SIZE + 'px;">&nbsp;</div>').appendTo(fakeScroll);
        if ($.browser.safari) {
            if (navigator.userAgent.indexOf("OS X 10_7")>=0 && navigator.userAgent.indexOf("iPad") < 0) {
                MOUSEWHEEL_SENSITIVITY_Y = -MOUSEWHEEL_SENSITIVITY_Y;
            }
        }
        setupForWindowHandler();
        setupNavigation(nav);
        setupMouseWheelHandling();
        self._window
            .bind('resize', setupForWindowHandler)
            .bind('scroll', updateScrollHandler);
        if (initalizedHandler) {
            initalizedHandler();
        }

        self.userActivity = new UserActivityMonitor(1000,true,true,false);
        self.userActivity.bind("activityStart", function(event,monitor,type){
            if (self.scrollTimer) {clearTimeout(self.scrollTimer);}
            self.leftScrollHint.hide();
//            self.rightScrollHint.hide();
        });
        self.userActivity.bind("activityStop", function(event,monitor,type){
            if (self.userLearned > 250) return;
            self.scrollTimer = setTimeout(function(){
//                if (self.userAtHello) self.rightScrollHint.show();
                if (self.userAtShowCase) self.leftScrollHint.show();
            }, 1000);
        });
    };

    this.init();
}

jQuery.preloadImages = function () {
    if (typeof arguments[arguments.length - 1] == 'function') {
        var callback = arguments[arguments.length - 1];
    } else {
        var callback = false;
    }
    if (typeof arguments[0] == 'object') {
        var images = arguments[0];
        var n = images.length;
    } else {
        var images = arguments;
        var n = images.length - 1;
    }
    var not_loaded = n;
    for (var i = 0; i < n; i++) {
        jQuery(new Image()).attr('src', images[i]).load(function() {
            if (--not_loaded < 1 && typeof callback == 'function') {
                callback();
            }
        });
    }
};

function Resizer (images, grades, pullMode) {
    var imagesPull = images;
    var l = imagesPull.length;
    var needUpdate = false;

    $(window).resize(function(){
        needUpdate = true;
    });

    this.update = function(immediately){
        if (!needUpdate && !immediately) return;

        var H = $(imagesPull[0]).height();
        var h = 0;
        var i = -1;

        while (H>h+1 && i<l-1) {
            h = grades[++i];
        }

        $(images).each(function(i,obj){
            var source = $(obj).attr("src").replace(/(\d{3,4})/, h);
            $(obj).attr('src',source);
        });
        needUpdate = immediately;
    };
    setInterval(this.update, 500);
}

function InitializingAnimation() {
    $('#preloader').fadeOut("slow", function(){
        $('#world').fadeIn(2000, 'easeInOutQuad');
        $('nav').fadeIn(3000, 'easeInOutQuad');
    });
}

function Init () {
    $('#world').add('nav').hide();
    $.preloadImages(
        "content/portfolio/512/turbo-cocktail.png", "content/portfolio/1024/turbo-cocktail.png",
        "content/portfolio/512/chemistry-class.png", "content/portfolio/1024/chemistry-class.png",
        "content/portfolio/512/flip-world.png", "content/portfolio/1024/flip-world.png",
        "content/portfolio/512/orfo.png", "content/portfolio/1024/orfo.png",
        "content/portfolio/512/rocket-doc.png", "content/portfolio/1024/rocket-doc.png", function(){
            var config = {
                rootElement: $('#world'),
                fakeScroll: $('#fakescroll'),
                nav: $('nav a'),
                goindex: $('#goindex'),
                initalizedHandler: InitializingAnimation,
                leftHint: $("#leftHint"),
                rightHint: $("#rightHint")
            };
            new World(config);
            setTimeout(function () { new Resizer($('article img'), [512, 1024], true).update(true); }, 500);
        });
}
