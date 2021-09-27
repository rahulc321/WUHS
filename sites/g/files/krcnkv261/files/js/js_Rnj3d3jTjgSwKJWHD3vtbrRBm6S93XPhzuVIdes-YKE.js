/*!
 * jQuery Once v2.2.3 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e){"use strict";if(typeof exports==="object"&&typeof exports.nodeName!=="string"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(t){"use strict";var r=function(e){e=e||"once";if(typeof e!=="string"){throw new TypeError("The jQuery Once id parameter must be a string")}return e};t.fn.once=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)!==true}).data(n,true)};t.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+r(e))};t.fn.findOnce=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)===true})}});

!function(n){"function"==typeof define&&define.amd?define(["jquery"],function(e){return n(e)}):"object"==typeof module&&"object"==typeof module.exports?exports=n(require("jquery")):n(jQuery)}(function(n){function e(n){var e=7.5625,t=2.75;return n<1/t?e*n*n:n<2/t?e*(n-=1.5/t)*n+.75:n<2.5/t?e*(n-=2.25/t)*n+.9375:e*(n-=2.625/t)*n+.984375}void 0!==n.easing&&(n.easing.jswing=n.easing.swing);var t=Math.pow,u=Math.sqrt,r=Math.sin,i=Math.cos,a=Math.PI,c=1.70158,o=1.525*c,s=2*a/3,f=2*a/4.5;n.extend(n.easing,{def:"easeOutQuad",swing:function(e){return n.easing[n.easing.def](e)},easeInQuad:function(n){return n*n},easeOutQuad:function(n){return 1-(1-n)*(1-n)},easeInOutQuad:function(n){return n<.5?2*n*n:1-t(-2*n+2,2)/2},easeInCubic:function(n){return n*n*n},easeOutCubic:function(n){return 1-t(1-n,3)},easeInOutCubic:function(n){return n<.5?4*n*n*n:1-t(-2*n+2,3)/2},easeInQuart:function(n){return n*n*n*n},easeOutQuart:function(n){return 1-t(1-n,4)},easeInOutQuart:function(n){return n<.5?8*n*n*n*n:1-t(-2*n+2,4)/2},easeInQuint:function(n){return n*n*n*n*n},easeOutQuint:function(n){return 1-t(1-n,5)},easeInOutQuint:function(n){return n<.5?16*n*n*n*n*n:1-t(-2*n+2,5)/2},easeInSine:function(n){return 1-i(n*a/2)},easeOutSine:function(n){return r(n*a/2)},easeInOutSine:function(n){return-(i(a*n)-1)/2},easeInExpo:function(n){return 0===n?0:t(2,10*n-10)},easeOutExpo:function(n){return 1===n?1:1-t(2,-10*n)},easeInOutExpo:function(n){return 0===n?0:1===n?1:n<.5?t(2,20*n-10)/2:(2-t(2,-20*n+10))/2},easeInCirc:function(n){return 1-u(1-t(n,2))},easeOutCirc:function(n){return u(1-t(n-1,2))},easeInOutCirc:function(n){return n<.5?(1-u(1-t(2*n,2)))/2:(u(1-t(-2*n+2,2))+1)/2},easeInElastic:function(n){return 0===n?0:1===n?1:-t(2,10*n-10)*r((10*n-10.75)*s)},easeOutElastic:function(n){return 0===n?0:1===n?1:t(2,-10*n)*r((10*n-.75)*s)+1},easeInOutElastic:function(n){return 0===n?0:1===n?1:n<.5?-(t(2,20*n-10)*r((20*n-11.125)*f))/2:t(2,-20*n+10)*r((20*n-11.125)*f)/2+1},easeInBack:function(n){return(c+1)*n*n*n-c*n*n},easeOutBack:function(n){return 1+(c+1)*t(n-1,3)+c*t(n-1,2)},easeInOutBack:function(n){return n<.5?t(2*n,2)*(7.189819*n-o)/2:(t(2*n-2,2)*((o+1)*(2*n-2)+o)+2)/2},easeInBounce:function(n){return 1-e(1-n)},easeOutBounce:e,easeInOutBounce:function(n){return n<.5?(1-e(1-2*n))/2:(1+e(2*n-1))/2}})});
;
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeBasePolyfills) {
    Drupal.atgeBasePolyfills = {};
  }

  Drupal.behaviors.atgeBasePolyfills = {

    /**
     * ATGE Polyfills
     *
     * Add any polyfill js here, so it can be applied universally.
     * This will fix bugs involving browser incompatibilities.
     *
     * @param context
     * @param settings
     */
    // Attach Polyfill js here.
    attach: function (context, settings) {
      // Polyfill the startsWith method on the String prototype to resolve IE11 error
      if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', {
          value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
          }
        });
      }

      // Polyfill the endsWith method on the String prototype to resolve IE11 error
      if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(search, this_len) {
          if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
          }
          return this.substring(this_len - search.length, this_len) === search;
        };
      }

      // Polyfill the includes method on the String prototype to resolve IE11 error
      if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
          'use strict';

          if (search instanceof RegExp) {
            throw TypeError('first argument must not be a RegExp');
          }
          if (start === undefined) { start = 0; }
          return this.indexOf(search, start) !== -1;
        };
      }

      // Polyfill the forEach method on the NodeList prototype to resolve IE11 error
      if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
      }
    },
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';

  var initialized = false;

  function init() {
    if (!initialized) {
      initialized = true;
      const current_path = window.location.pathname;
      const files = drupalSettings.atge_external_js.files;
      const excludes = drupalSettings.atge_external_js.excluded;
      const disableAdmin = drupalSettings.atge_external_js.disable_admin;
      const disableFront = drupalSettings.atge_external_js.disable_front;

      if (null !== files && files[0] !== "") {
        for (var f in files) {
          const exclude_set = excludes[f].split('\n');
          if (exclude_set.length === 1 && exclude_set[0] === "") {
            $('head').append('<script src="https://' + files[f] + '"></script>');
          } else {
            var is_excluded = false;

            if (disableAdmin[f] === 1 && drupalSettings.path.currentPathIsAdmin ||
              disableFront[f] === 1 && !drupalSettings.path.currentPathIsAdmin) {
              is_excluded = true;
            }

            if (is_excluded === false) {
              for (var e in exclude_set) {
                if (exclude_set[e].trim().length !== 0) {
                  exclude_set[e] = exclude_set[e].trim();
                  var exclude_path = new RegExp('^' + exclude_set[e] + '$');
                  if (exclude_path.test(current_path) || (current_path === '/' && exclude_set[e] === '<front>') ||
                    (current_path.startsWith(exclude_set[e].replace('*', '')) &&
                      exclude_set[e].endsWith('/*'))) {
                    is_excluded = true;
                  }
                }
              }
              if (!is_excluded) {
                $('head').append('<script src="//' + files[f] + '"></script>');
              }
            }
          }
        }
      }
    }
  }

  Drupal.behaviors.atge_external_js = {
    attach: function () {
      init();
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';

  let initialized = false;

  function init() {
    if (!initialized) {
      initialized = true;
      const currentPath = window.location.pathname;
      const includesConfig = drupalSettings.atge_tint.include_paths;
      let includeSet = '';
      let isIncluded = false;

      if (includesConfig) {
        includeSet = includesConfig.split('\n');
      }

      for (let e in includeSet) {
        if (includeSet[e].trim().length !== 0) {
          includeSet[e] = includeSet[e].trim();
          let includePath = new RegExp('^' + includeSet[e] + '$');
          if (includePath.test(currentPath) || (currentPath === '/' && includeSet[e] === '<front>') ||
            (currentPath.startsWith(includeSet[e].replace('*', '')) &&
              includeSet[e].endsWith('/*'))) {
            isIncluded = true;
          }
        }
      }
      if (isIncluded) {
        $('head').append('<script defer src="https://cdn.hypemarks.com/pages/a5b5e5.js"></script>');
        }
    }
  }

  Drupal.behaviors.atge_tint = {
    attach: function () {
      init();
    }
  };
})(jQuery, Drupal, drupalSettings);
;
/**
 * @file Common data layer helper.
 */

(function ($) {
  Drupal.behaviors.dataLayer = {

    /**
     * The language prefix list (no blank).
     *
     * @return {array}
     */
    langPrefixes: function langPrefixes() {
      var languages = Drupal.settings.dataLayer.languages,
          langList = [];

      for (var lang in languages) {
        if (languages[lang].prefix !== '') {
          langList.push(languages[lang].prefix);
        }
      }
      return langList;

      // With Underscore.js dependency.
      //var list = _.pluck(Drupal.settings.datalayer.languages, 'prefix');
      //return _.filter(list, function(lang) { return lang });
    },

    /**
     * Drupal behavior.
     */
    attach: function() { return }

  };
})(jQuery);
;
(function ($, Drupal, window, document) {
  Drupal.behaviors.atgeIECheck = {
    attach: function(context, settings) {
      var isIE = /*@cc_on!@*/false || !!document.documentMode;

      if (isIE) {
        $(context).find('body').addClass('is-ie');
      }
    }
  }
})(jQuery, Drupal, this, this.document);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeBaseGlobalFunctions) {
      Drupal.atgeBaseGlobalFunctions = {};
  }

  Drupal.behaviors.atgeBaseGlobalFunctions = {

    /**
     * Reusable Functions Example.
     * @param var1
     * @param var2
     */
    functionName: function(var1,var2) {
      // Custom code here.
      // How to use this function:
      // Drupal.behaviors.atgeBaseGlobalFunctions.functionName(var1,var2);
    },
    /**
     * Accordion Menus Helper Function.
     * @param accordionInner
     * @param accordionLinkTarget
     * @param accordionLinkParent
     * @param accordionLinkClass
     * @param accordionIconClass
     * @param accordionFirst (true or false).
     * @param accordionBreakpoint (should be integer such as 1024, 768, etc).
     */
    accordionMenus: function(accordionInner, accordionLinkTarget, accordionLinkParent, accordionLinkClass, accordionIconClass, accordionFirst, accordionBreakpoint) {
      // Check if the breakpoint param is defined or null.
      if (typeof accordionBreakpoint === 'undefined' || !accordionBreakpoint) {
        accordionBreakpoint = 1024;
      }

      var width = $(window).width();
      const themeAbbv = drupalSettings.atge_base.global.theme_abbv;

      function accordionMenuInit() {
        // Scrolling in IOS is causing resize to be triggered.  Detect if actual
        // mobile device and if not, reset the accordion on resize / load.
        if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) && width < accordionBreakpoint) {
          // do nothing on actual mobile devices.
        }
        else {
          width = $(window).width();
          // Close submenus.
          $(accordionInner).hide();
          // Reset Classes
          $(accordionIconClass + ':not(.no-children)').removeClass('icon-' + themeAbbv + '-minus').addClass('icon-' + themeAbbv + '-plus');
          $(accordionLinkTarget).removeClass('active');
          // If the first item needs to be open on load, set accordionFirst var to
          //  true when calling Drupal.behaviors.atgeBaseGlobalFunctions.accordionMenus()
          if (accordionFirst === true) {
            $(accordionLinkParent).first().find(accordionIconClass).addClass('active');
            $(accordionLinkParent).first().find(accordionIconClass).removeClass('icon-' + themeAbbv + '-plus').addClass('icon-' + themeAbbv + '-minus');
            $(accordionLinkParent).first().find(accordionInner).show();
          }
        }
        if (width > (accordionBreakpoint - 1)) {
          $(accordionInner).show();
        }
      }

      // Iterate through each Mobile Menu Navigation Accordion item with children.
      $(accordionLinkTarget).once().each(function() {
        // Click event for menu items with children.
        $(this).on('click touch', function() {
          if (width < accordionBreakpoint) {
            // Prevent parent level links from going to their href so that they can act like accordions.
            //e.preventDefault();
            // Reset all the parent accordions not clicked.
            $(this).closest(accordionLinkParent).siblings().find(accordionIconClass).removeClass('active');
            $(this).closest(accordionLinkParent).siblings().find(accordionIconClass).next(accordionInner).slideUp();
            $(this).closest(accordionLinkParent).siblings().find(accordionIconClass+'.icon-' + themeAbbv + '-minus').removeClass('icon-' + themeAbbv + '-minus').addClass('icon-' + themeAbbv + '-plus');
            // Open the current accordion item.
            $(this).next(accordionInner).toggleClass('menu__accordion--subnav-1--active').slideToggle();
            // Update it's icon class.
            $(this).toggleClass('active');
            $(this).toggleClass('icon-' + themeAbbv + '-plus icon-' + themeAbbv + '-minus');
          }
        });
      });

      // Check if accordionFirst is set to True.
      if (accordionFirst === true) {
        // Detect if actual mobile device.
        if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) && width < 1024) {
          // if yes, then when accordionFirst == true, we need the following to run
          // on load, but only once, outside of the resize function.
          $(accordionLinkParent).first().find(accordionIconClass).addClass('active');
          $(accordionLinkParent).first().find(accordionIconClass).removeClass('icon-' + themeAbbv + '-plus').addClass('icon-' + themeAbbv + '-minus');
          $(accordionLinkParent).first().find(accordionInner).show();
        }
      }

      // Call mobile menu init function.
      $(window).on('load', accordionMenuInit);
      // Rerun on window resize.
      $(window).resize(accordionMenuInit);
    },
    /**
     * Helper function to get height of tallest item, and force all other items,
     * to inherit that height.
     * @param getHeightTarget
     */
    equalHeightColumns: function(getHeightTarget) {

      function equalHeightColumns() {
        var targetProperty = 'min-height';
        var maxHeight = 0;

        $(getHeightTarget).css(targetProperty,'');

        $(getHeightTarget).each(function () {
          if ($(this).outerHeight() > maxHeight) {
            maxHeight = $(this).outerHeight();
          }
        });

        $(getHeightTarget).css(targetProperty, maxHeight);
      }
      // Select correct image on load.
      equalHeightColumns();
      // Update image on resize.
      $(window).resize(equalHeightColumns);

    },
    /**
     * Helper Function to Replace Object Fit Images with Image Background
     * images in versions of IE that don't allow object-fit usage.
     * @param imgTarget
     */
    ieObjectFitFix: function(imgTarget) {
      // IE Object Fit Fix.
      function ieObjectFitFix() {
        var userAgent, ieReg, ie;
        const width = $(window).width();

        userAgent = window.navigator.userAgent;
        ieReg = /msie|Trident.*rv[ :]*11\./gi;
        ie = ieReg.test(userAgent);

        // If IE is detected and we're at tablet and above screen widths.
        if(ie && width > 767) {
          // Then convert image to inline background image.
          $(imgTarget).each(function () {
            var imgUrl = $(this).prop('src'),
                imgHeight = $(this).height();
            if (imgUrl) {
              $(this).wrap('<div class="custom-object-fit" style="background-image:url(' + imgUrl + ');height:' + imgHeight + 'px;"></div>')
            }
          });
        }
      }

      // Select correct image on load.
      $(window).on('load', ieObjectFitFix);
      // Update image on resize.
      $(window).resize(ieObjectFitFix);
    },

    /**
     * Truncator helper function.
     *
     * @param container
     * @param target
     * @param height
     * @param offset
     * @param extra
     */
    truncator: function(container, target, height, offset, extra) {
      if (typeof offset === "undefined" || offset === null) {
        offset = null;
      }
      if (typeof extra === "undefined" || extra === null) {
        extra = 0;
      }
      // How to use this function:
      // Drupal.behaviors.atgeBaseGlobalFunctions.truncator(container, target, height, offset, extra);
      function truncator() {
        // Iterate through each container item.
        $(container).each(function () {
          // Set selector by finding target within $this
          const selector = $(this).find(target);
          // Set max container height; should be a number.
          const containerHeight = height;
          // Get height of other element if present; offset should be a selector.  if null, ignore.
          var titleHeight = offset !== null ? $(this).find(offset).height() : 0;
          // Set final height number to use as truncation base; var extra should be a number.
          var maxHeight = containerHeight - titleHeight - extra;

          // Pass final height number to shave plugin.
          selector.shave(maxHeight);

        });
      }

      // Run Truncator on load.
      $(window).on('load', truncator);
      // Update on Resize.
      $(window).resize(truncator);
    },

    /**
     * A helper function that provides error handling and animation assistance
     * to webforms.
     */
    webformErrorHandler: function() {

      const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const telRegEx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

      function validation(input) {
        var error = input.attr('required') ? (input.val() === '') : false;
        if (input.attr('type') === 'email') {
          error = error || !emailRegEx.test(input.val());
        }
        if (input.attr('type') === 'tel') {
          error = error || !telRegEx.test(input.val());
        }
        return error;
      }

      function errorHandling() {
        $('.animated--form-item input, .animated--form-item textarea').each(function (i, input) {
          const parent = $(input).parent();
          // On Focus of form field.
          $(input).focus(function () {
            parent.addClass('form-item__focus');
            // On blur of form field.
          }).blur(function () {
            parent.removeClass('form-item__focus')
                .toggleClass('form-item__content', $(input).val() !== '')
                .toggleClass('form-item__error', validation($(input)));
          });
          // On submit attempt, if a field has value, it needs the content class.
          if ($(input).val() !== '') {
            parent.addClass('form-item__content');
          }
        });
        $('.animated--form-item select').each(function (i, select) {
          const parent = $(select).parent();
          $(select).focus(function () {
            parent.addClass('form-item__focus');
          }).blur(function () {
            parent.removeClass('form-item__focus')
                .toggleClass('form-item__content', $(select).val() !== '')
                .toggleClass('form-item__error', validation($(select)));
          });
          // On submit attempt, if a field has value, it needs the content class.
          if ($(select).val() !== '') {
            parent.addClass('form-item__content');
          }
        });

      }

      errorHandling();
    },

    /**
     * A helper function for updating form region on submit.
     * @param form
     * @param component
     * @param confirmation
     */
    webformConfirmationHandler: function(form, component, confirmation) {

      // On form submit (via ajax), update component layout.
      $(document).once().ajaxComplete(function () {
        if ($(form + ' > div').hasClass(confirmation)) {
          // toggle grid classes.
          $(component).find('.grid__container--items').removeClass('optimized-width').addClass('constrained-width');
          // toggle layout classes
          $(component).find('.component__form').removeClass('component__form--twocol').addClass('component__form--onecol');
          // remove form component copy.
          $(component).find('.component__form--content').remove();
        }
      });

    },

  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeBaseGlobalInteractions) {
      Drupal.atgeBaseGlobalInteractions = {};
  }

  Drupal.behaviors.atgeBaseGlobalInteractions = {

    /**
     * Global Interactions
     *
     * Add any js here that needs to load everywhere, but cannot be contained to
     * any set component or page element.
     *
     * @param context
     * @param settings
     */
    // Attach Global Styles here.
    attach: function (context, settings) {

      // Allow editing of table dialog properties.
      if ($.ui && $.ui.dialog && $.ui.dialog.prototype._allowInteraction) {
        orig_allowInteraction = $.ui.dialog.prototype._allowInteraction;
        $.ui.dialog.prototype._allowInteraction = function (event) {
          if ($(event.target).closest('.cke_dialog').length) {
            return true;
          }
          return orig_allowInteraction.apply(this, arguments);
        };
      }

      // Iterate through each image
      $('img').once().each(function () {

        // Now check to see if images have the object-fit:cover property.
        if (($(this).parents(':eq(2)').hasClass('has-objectfit') &&
            $(this).parents(':eq(2)').attr('class').indexOf('--media') !== -1) ||
            ($(this).parents(':eq(3)').hasClass('has-objectfit') &&
            $(this).parents(':eq(3)').attr('class').indexOf('--media') !== -1) ||
            $(this).parent().hasClass('has-objectfit')) {
          // If yes, then call ieObjectFitFix function.
          Drupal.behaviors.atgeBaseGlobalFunctions.ieObjectFitFix(this);
        }

      });

      var coll = document.getElementsByClassName('collapsible-learn-more');
      var i;
      for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
          var content = this.previousElementSibling;
          if ($(content).is(':visible')) {
            $(content).hide(125);
            $(this).find('a').text('Learn More');
          } else {
            $(content).show(125);
            $(this).find('a').text('Show Less');
          }
        });
      }
    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, window, document, undefined) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumBaseThemeInteractions) {
      Drupal.rumBaseThemeInteractions = {};
  }

  Drupal.behaviors.rumBaseThemeInteractions = {

    /**
     * Theme Interactions
     *
     * Add any js here that needs to load everywhere, but cannot be contained to
     * any set component or page element.
     *
     * @param context
     * @param settings
     */
    // Attach Theme Styles here.
    attach: function (context, settings) {

      // Allow editing of table dialog properties.
      if ($.ui && $.ui.dialog && $.ui.dialog.prototype._allowInteraction) {
        orig_allowInteraction = $.ui.dialog.prototype._allowInteraction;
        $.ui.dialog.prototype._allowInteraction = function (event) {
          if ($(event.target).closest('.cke_dialog').length) {
            return true;
          }
          return orig_allowInteraction.apply(this, arguments);
        };
      }

      //add analytics attributes on icon Pinterest
      function gtmAttributes() {
        $('a[data-pin-log="button_pinit"]').attr('data-click-category', 'social');
        $('a[data-pin-log="button_pinit"]').attr('data-click-action', 'share');
        $('a[data-pin-log="button_pinit"]').attr('data-gtm', 'social');
        $('a[data-pin-log="button_pinit"]').attr('data-click-label', 'pinterest');
      }
      $(window).on('load', gtmAttributes);

      $(window).on('load', function() {
        if ($('.image--right-float').length) {
          $('.image--right-float').each(function() {
            let attrStyle = $(this).find('.c-atge-image span').attr('style');
            fixingWidthHeightTemplate(attrStyle, $(this));
          });
        }
        if ($('.image--left-float').length) {
          $('.image--left-float').each(function() {
            let attrStyle = $(this).find('.c-atge-image span').attr('style');
            fixingWidthHeightTemplate(attrStyle, $(this));
          });
        }
      });
      function fixingWidthHeightTemplate(attrStyle, imageFloat) {
        if (attrStyle.split(';').length > 1) {
          let spanImage = imageFloat.find('.c-atge-image span');
          spanImage.attr('style', '');
          $.each(attrStyle.split(';'), function(index, value) {
            let styles = value.split(': ');
            if (styles[0] == 'height') {
              let heighImg = spanImage.height();
              if (styles[1].indexOf('%') != -1) {
                styles[1] = styles[1].replace('%', '');
                spanImage.css('height', (heighImg*(styles[1])/100));
              }
              if (styles[1].indexOf('px') != -1) {
                styles[1] = styles[1].replace('px', '');
                spanImage.css('height', styles[1]);
              }
            } else {
              if (styles[0] == 'width') {
                let widthImg = spanImage.width();
                if (styles[1].indexOf('%') != -1) {
                  styles[1] = styles[1].replace('%', '');
                  spanImage.css('width', (widthImg*(styles[1])/100));
                }
                if (styles[1].indexOf('px') != -1) {
                  styles[1] = styles[1].replace('px', '');
                  spanImage.css('width', styles[1]);
                }
              } 
            }
          });
        }
      }
    }
  };

})(jQuery, Drupal, this, this.document);
;
(function ($, Drupal, drupalSettings) {

  /**
   * Define base namespace.
   */
  if (!Drupal.atgeLivechat) {
    Drupal.atgeLivechat = {};
  }

  Drupal.behaviors.atgeLivechat = {
    attach: function (context, settings) {
      if (!drupalSettings.atge_live_chat.isGdprEnabled) {
        Drupal.behaviors.atgeLivechat.processChat();
      }
    },

    processChat: function () {
      if (drupalSettings.atge_live_chat.chat_enable) {
        const liveChatId = $('input[name="liveChatId"]')[0].value;
        const chatButton = $('#liveagent_button_online_' + liveChatId);

        if (chatButton[0] && !Drupal.behaviors.atgeLivechatGdpr.getCookie('has_logged_in')) {
          Drupal.behaviors.atgeLivechat.salesforceFunctions(liveChatId);
          Drupal.behaviors.atgeLivechat.startChat(chatButton, liveChatId);
        }
      }
    },

    salesforceFunctions: function (liveChatId) {
      if (!window._laq) {
        window._laq = [];
      }

      window._laq.push(function () {
        liveagent.showWhenOnline(liveChatId,
            document.getElementById('liveagent_button_online_' + liveChatId));
        liveagent.showWhenOffline(liveChatId,
            document.getElementById('liveagent_button_offline_' + liveChatId));
      });
    },

    startChat: function (chatButton, liveChatId) {
      const liveEnv = drupalSettings.atge_live_chat.sf_env_live;
      const liveDeployId = drupalSettings.atge_live_chat.deploy_id_live;
      const liveOrgId = drupalSettings.atge_live_chat.org_id_live;
      const proactiveEnv = drupalSettings.atge_live_chat.sf_env_proactive;
      const proactiveDeployId = drupalSettings.atge_live_chat.deploy_id_proactive;
      const proactiveOrgId = drupalSettings.atge_live_chat.org_id_proactive;

      if (drupalSettings.atge_live_chat.isGdprEnabled) {
        if (Drupal.behaviors.atgeLivechatGdpr.livechatAllowed()) {
          // Call proactive chat function if proactive chat block
          if ($('#block-proactive-chat')[0]) {
            Drupal.behaviors.atgeLivechat.initProactiveChat(proactiveEnv, proactiveDeployId, proactiveOrgId);
          }
          else {
            Drupal.behaviors.atgeLivechat.initLiveChat(liveEnv, liveDeployId, liveOrgId);
          }
        }
      } else {
        if ($('#block-proactive-chat')[0]) {
          Drupal.behaviors.atgeLivechat.initProactiveChat(proactiveEnv, proactiveDeployId, proactiveOrgId);
        }
        else {
          Drupal.behaviors.atgeLivechat.initLiveChat(liveEnv, liveDeployId, liveOrgId);
        }
      }

      chatButton.on('click', function () {
        Drupal.behaviors.atgeLivechat.initLiveChat(liveEnv, liveDeployId, liveOrgId);
        liveagent.startChat(liveChatId);
      });

      Drupal.behaviors.atgeLivechat.setupMutations(chatButton);
    },

    setupMutations: function (chatButton) {
      // Observer hides parent <li> tag, to remove extra margin-right when chat
      // button is hidden. Alt text is added to proactive chat images.
      const stickyEnable = drupalSettings.atge_live_chat.sticky_enable;
      let assignProactiveAlt = false;
      let callButton = $('ul[region="utility_bottom"] li a[data-gtm="phone"], ' +
          'ul[region="footer"] li[data-gtm="phone"] a');
      let hideMobileProactive = false;
      let hideTabletProactive = false;

      if ($('input[name="proactiveHideMobile"]')[0]) {
        hideMobileProactive = $('input[name="proactiveHideMobile"]')[0].value === '1' ? true : false;
      }

      if ($('input[name="proactiveHideTablet"]')[0]) {
        hideTabletProactive = $('input[name="proactiveHideTablet"]')[0].value === '1' ? true : false;
      }
      let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
          if (chatButton.css('display') === 'none') {
            chatButton.parent().addClass('visually-hidden');
            chatButton.attr('tabindex', '-1');

            if (stickyEnable && callButton) {
              callButton.parent().removeClass('visually-hidden');
            }
          }
          else {
            chatButton.parent().removeClass('visually-hidden');
            if (stickyEnable && callButton) {
              callButton.parent().addClass('visually-hidden');
            }

            // This is a fix for the Chat button breaking the styles in the header on Safari
            // Do not execute if chat is on sticky footer, it alters the layout
            if (!stickyEnable) {
              let parentMenu = chatButton.closest('ul').find('li');
              parentMenu.css('flex', '0 0 auto');

              chatButton.attr('tabindex', '0');
            }
          }
        });
        if (!assignProactiveAlt) {
          $('div[id^="liveagent_invite_button_"]').children('img').each(function (index) {
            if (index === 0) {
              $(this).attr('alt', 'X Button');
            }
            else {
              $(this).attr('alt', 'Proactive Chat');
            }

            if (hideMobileProactive) {
              $(this).addClass('hide-on-mobile');
            }

            if (hideTabletProactive) {
              $(this).addClass('hide-on-tablet');
            }
            assignProactiveAlt = true;
          });
        }
      });

      observer.observe(chatButton[0], {
        attributes: true,
        attributeFilter: ['style']
      });
    },

    // Live chat script
    initLiveChat: function (liveEnv, liveDeployId, liveOrgId) {
      liveagent.init(liveEnv, liveDeployId, liveOrgId);
    },

    // Proactive chat script
    initProactiveChat: function (proactiveEnv, proactiveDeployId, proactiveOrgId) {
      liveagent.init(proactiveEnv, proactiveDeployId, proactiveOrgId);
    },
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeLivechatGdpr) {
    Drupal.atgeLivechatGdpr = {};
  }

  Drupal.behaviors.atgeLivechatGdpr = {
    attach: function (context, settings) {

      if (drupalSettings.atge_live_chat.isGdprEnabled &&
          !Drupal.behaviors.atgeLivechatGdpr.gdprBannerClosed()) {

        // Check allowed GDPR values once the close button is clicked on the banner
        $(document).on('click', 'div[class^="optanon-alert-box-button-middle accept-cookie-container"] button,' +
            '#onetrust-accept-btn-handler, #accept-recommended-btn-handler, ' +
            '.save-preference-btn-handler', function () {
          // Gives time for the actualOptanonConsent to load on the browser
          setTimeout(function() {
            Drupal.behaviors.atgeLivechat.startChat();
          }, 1500);
        });
      }
    },

    getCookie: function(cName) {
      let cValue = document.cookie;
      let cStart = cValue.indexOf(' ' + cName + '=');
      if (cStart === -1) {
        cStart = cValue.indexOf(cName + '=');
      }
      if (cStart === -1) {
        cValue = null;
      } else {
        cStart = cValue.indexOf('=', cStart) + 1;
        let cEnd = cValue.indexOf(';', cStart);
        if (cEnd === -1) {
          cEnd = cValue.length;
        }
        cValue = decodeURI(cValue.substring(cStart, cEnd));
      }
      return cValue;
    },

    // Return true if OnetrustActiveGroups variable contains ",C0003," or continent is not 'EU'
    livechatAllowed: function() {
      const onetrustNewWorkflow = drupalSettings.atge_live_chat.enable_new_workflow;

      if (typeof window.continent !== 'undefined') {
        if (onetrustNewWorkflow) {
          return window.continent !== 'EU' || OnetrustActiveGroups.includes(',C0003,');
        } else {
          return window.continent !== 'EU' || OnetrustActiveGroups.includes(',3,');
        }
      }
    },

    // Return true if OptanonAlertBoxClosed cookie is present
    gdprBannerClosed: function() {
      const bannerClosed = Drupal.behaviors.atgeLivechatGdpr.getCookie('OptanonAlertBoxClosed');
      return bannerClosed;
    },
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';

  $(document).ready(function () {

    // Analytics for live chat
    // Proactive chat is set to appear in the browser in 30 seconds after
    // page load
    setTimeout(function () {
      $('div[id^="liveagent_invite_button_"]').children().first().click(function () {
        Drupal.behaviors.atgeAnalytics.xButtonChat("proactive chat");
      });

      $('div[id^="liveagent_invite_button_"]').children().eq(1).click(function () {
        Drupal.behaviors.atgeAnalytics.openChat("proactive chat");
      });
    }, 30010);

    $('.menu .menu-item span[id^="liveagent_button_online_"]').click(function () {
      Drupal.behaviors.atgeAnalytics.openChat("non-proactive chat");
    });
  });
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumCookies) {
    Drupal.rumCookies = {};
  }

  // Converts the vc query param into a cookie
  Drupal.behaviors.rumCookies = {
    attach: function (context, settings) {
      const vcQuery = 'vc';
      const gclidQuery = 'gclid';
      const url = window.location.href;
      let queryResultArray = '';
      let vcValue = '';
      let gclidValue = '';

      // Creates campaign cookie
      if (url.indexOf('?' + vcQuery + '=') !== -1 || url.indexOf('&' + vcQuery + '=') !== -1) {
        queryResultArray = Drupal.behaviors.rumCookies.getQueryParams();
        vcValue = queryResultArray.vc;
        if (vcValue) {
          Drupal.behaviors.rumCookies.createCookie('campaign', vcValue);
        }
      }

      // Creates gclid cookie
      if (url.indexOf('?' + gclidQuery + '=') !== -1 || url.indexOf('&' + gclidQuery + '=') !== -1) {
        queryResultArray = Drupal.behaviors.rumCookies.getQueryParams();
        gclidValue = queryResultArray.gclid;
        if (gclidValue) {
          Drupal.behaviors.rumCookies.createCookie('gclid', gclidValue);
        }
      }

      // Creates landing page cookie
      if (document.referrer && !document.referrer.includes(window.location.origin)) {
        if (document.location.search) {
          Drupal.behaviors.rumCookies.createCookie('landingPage', url);
        }
      }
    },

    getQueryParams: function () {
      let queries = [];
      let urlParam;
      let urlParams = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (let i = 0; i < urlParams.length; i++) {
        urlParam = urlParams[i].split('=');
        queries[urlParam[0]] = urlParam[1];
      }
      return queries;
    },

    createCookie: function (cookieName, value) {
      document.cookie = cookieName + '=' + value +';path=/; domain=.' +
        location.hostname.replace('/^www\./i', '');

    },
  };
})(jQuery, Drupal, this, this.document);
;
(function ($, Drupal, window, document, undefined) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeAnalytics) {
    Drupal.atgeAnalytics = {};
  }

  // Variable to control if the menu item is already clicked on mobile version.
  var menuItemNameClicked = null;

  Drupal.behaviors.atgeAnalytics = {

    navClick: function (menuType, menuItemName) {
      if (menuItemNameClicked !== menuItemName) {
        dataLayer.push({
          'event': 'e_navigationClick',
          'menuType': menuType,
          'menuItemName': menuItemName || 'error',
        });
      }
      menuItemNameClicked = menuItemName;
    },

    formSubmit: function (formName, formSourceCode) {
      dataLayer.push({
        'event': 'e_formSubmit',
        'formName': formName,
        'formSourceCode': formSourceCode
      });
    },

    formFieldInput: function (formName, fieldName, fieldValue, formSourceCode) {
      dataLayer.push({
        'event': 'e_formFieldInput',
        'formName': formName,
        'fieldName': fieldName,
        'fieldValue': fieldValue,
        'formSourceCode': formSourceCode
      });
    },

    formFieldValue: function (formName, fieldName, fieldValue, stepNum) {
      dataLayer.push({
        'event': 'e_formFieldValue',
        'fieldName': fieldName,
        'formName': formName,
        'formStepNumber': stepNum,
        'fieldValue': fieldValue
      });
    },

    formDropDown: function (formName, fieldName, selectedValue, formSourceCode) {
      dataLayer.push({
        'event': 'e_formDropdown',
        'fieldName': fieldName,
        'formName': formName,
        'selectedValue': selectedValue,
        'formSourceCode': formSourceCode
      });
    },

    eventRegistration: function (eventType, eventName) {
      dataLayer.push({
        'event': 'e_eventRegistration',
        'eventType': eventType,
        'eventName': eventName
      });
    },

    mCatScore: function (score) {
      dataLayer.push({
        'event': 'e_mcatScore',
        'mcatScore': score
      });
    },

    formPageSubmit: function (formName, formPage, stepPage) {
      dataLayer.push({
        'event': 'e_formPageSubmit',
        'formName': formName,
        'formPage': formPage,
        'formStepNumber': stepPage
      });
    },

    openChat: function (chatType) {
      dataLayer.push({
        'event': 'e_chatOpen',
        'chatType': chatType
      });
    },

    closeChat: function (chatType) {
      dataLayer.push({
        'event': 'e_chatClose',
        'chatType': chatType
      });
    },

    xButtonChat: function (chatType) {
      dataLayer.push({
        'event': 'e_chatXButton',
        'chatType': chatType
      });
    },

    searchClick: function (term, numResults, searchList) {
      dataLayer.push({
        'event': 'e_searchResults',
        'searchTerm': term,
        'results': numResults,
        'searchList': searchList
      });
    },

    searchFilter: function (query, filterSelected, searchList) {
      dataLayer.push({
        'event': 'e_searchFilter',
        'searchQueryParameter': query,
        'filterSelected': filterSelected,
        'searchList': searchList
      });
    },

    expandList: function (title, itemText) {
      dataLayer.push({
        'event': 'e_expandList',
        'listName': title,
        'listItem': itemText
      });
    },
  };
})(jQuery, Drupal, this, this.document);
;
/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * CardTable by: Justin McNally (2015)
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 * Requires jQuery version 1.7 or above
 *
 */
;(function($) {
  $.fn.cardtable = function(options) {
    var $tables = this,
        defaults = {headIndex:0},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var $table = $(this);
      if ($table.hasClass('stacktable')) {
        return;
      }
      var table_css = $(this).prop('class');
      var $stacktable = $('<div></div>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $caption, $topRow, headMarkup, bodyMarkup, tr_class;

      $table.addClass('stacktable large-only');

      $caption = $table.find(">caption").clone();
      $topRow = $table.find('>thead>tr,>tbody>tr,>tfoot>tr,>tr').eq(0);

      // avoid duplication when paginating
      $table.siblings().filter('.small-only').remove();

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('>tbody>tr').each(function() {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        // for the first row, "headIndex" cell is the head of the table
        // for the other rows, put the "headIndex" cell as the head for that row
        // then iterate through the key/values
        $(this).find('>td,>th').each(function(cellIndex) {
          if ($(this).html() !== ''){
            bodyMarkup += '<tr class="' + tr_class +'">';
            if ($topRow.find('>td,>th').eq(cellIndex).html()){
              bodyMarkup += '<td class="st-key">'+$topRow.find('>td,>th').eq(cellIndex).html()+'</td>';
            } else {
              bodyMarkup += '<td class="st-key"></td>';
            }
            bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
            bodyMarkup += '</tr>';
          }
        });

        markup += '<table class=" '+ table_css +' stacktable small-only"><tbody>' + headMarkup + bodyMarkup + '</tbody></table>';
      });

      $table.find('>tfoot>tr>td').each(function(rowIndex,value) {
        if ($.trim($(value).text()) !== '') {
          markup += '<table class="'+ table_css + ' stacktable small-only"><tbody><tr><td>' + $(value).html() + '</td></tr></tbody></table>';
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

  $.fn.stacktable = function(options) {
    var $tables = this,
        defaults = {headIndex:0,displayHeader:true},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var table_css = $(this).prop('class');
      var $stacktable = $('<table class="'+ table_css +' stacktable small-only"><tbody></tbody></table>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $table, $caption, $topRow, headMarkup, bodyMarkup, tr_class, displayHeader;

      $table = $(this);
      $table.addClass('stacktable large-only');
      $caption = $table.find(">caption").clone();
      $topRow = $table.find('>thead>tr,>tbody>tr,>tfoot>tr').eq(0);

      displayHeader = $table.data('display-header') === undefined ? settings.displayHeader : $table.data('display-header');

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('>tbody>tr, >thead>tr').each(function(rowIndex) {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');

        // for the first row, "headIndex" cell is the head of the table
        if (rowIndex === 0) {
          // the main heading goes into the markup variable
          if (displayHeader) {
            markup += '<tr class=" '+tr_class +' "><th class="st-head-row st-head-row-main" colspan="2">'+$(this).find('>th,>td').eq(headIndex).html()+'</th></tr>';
          }
        } else {
          // for the other rows, put the "headIndex" cell as the head for that row
          // then iterate through the key/values
          $(this).find('>td,>th').each(function(cellIndex) {
            if (cellIndex === headIndex) {
              headMarkup = '<tr class="'+ tr_class+'"><th class="st-head-row" colspan="2">'+$(this).html()+'</th></tr>';
            } else {
              if ($(this).html() !== ''){
                bodyMarkup += '<tr class="' + tr_class +'">';
                if ($topRow.find('>td,>th').eq(cellIndex).html()){
                  bodyMarkup += '<td class="st-key">'+$topRow.find('>td,>th').eq(cellIndex).html()+'</td>';
                } else {
                  bodyMarkup += '<td class="st-key"></td>';
                }
                bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
                bodyMarkup += '</tr>';
              }
            }
          });

          markup += headMarkup + bodyMarkup;
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

 $.fn.stackcolumns = function(options) {
    var $tables = this,
        defaults = {},
        settings = $.extend({}, defaults, options);

    return $tables.each(function() {
      var $table = $(this);
      var $caption = $table.find(">caption").clone();
      var num_cols = $table.find('>thead>tr,>tbody>tr,>tfoot>tr').eq(0).find('>td,>th').length; //first table <tr> must not contain colspans, or add sum(colspan-1) here.
      if(num_cols<3) //stackcolumns has no effect on tables with less than 3 columns
        return;

      var $stackcolumns = $('<table class="stacktable small-only"></table>');
      if (typeof settings.myClass !== 'undefined') $stackcolumns.addClass(settings.myClass);
      $table.addClass('stacktable large-only');
      var tb = $('<tbody></tbody>');
      var col_i = 1; //col index starts at 0 -> start copy at second column.

      while (col_i < num_cols) {
        $table.find('>thead>tr,>tbody>tr,>tfoot>tr').each(function(index) {
          var tem = $('<tr></tr>'); // todo opt. copy styles of $this; todo check if parent is thead or tfoot to handle accordingly
          if(index === 0) tem.addClass("st-head-row st-head-row-main");
          var first = $(this).find('>td,>th').eq(0).clone().addClass("st-key");
          var target = col_i;
          // if colspan apply, recompute target for second cell.
          if ($(this).find("*[colspan]").length) {
            var i =0;
            $(this).find('>td,>th').each(function() {
                var cs = $(this).attr("colspan");
                if (cs) {
                  cs = parseInt(cs, 10);
                  target -= cs-1;
                  if ((i+cs) > (col_i)) //out of current bounds
                    target += i + cs - col_i -1;
                  i += cs;
                } else {
                  i++;
                }

                if (i > col_i)
                  return false; //target is set; break.
            });
          }
          var second = $(this).find('>td,>th').eq(target).clone().addClass("st-val").removeAttr("colspan");
          tem.append(first, second);
          tb.append(tem);
        });
        ++col_i;
      }

      $stackcolumns.append($(tb));
      $stackcolumns.prepend($caption);
      $table.before($stackcolumns);
    });
  };

}(jQuery));
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeRichTextComponentResponsiveTables) {
    Drupal.atgeRichTextComponentResponsiveTables = {};
  }

  Drupal.behaviors.atgeRichTextComponentResponsiveTables = {
    attach: function(context, settings) {

      // Set Vars.
      const tableSelector = '.c-richtext table.component__resp-table';

      // Look for table markup in our rich text editor fields.
      if ($('.c-richtext table')) {
        // if there'a table that doesn't already have the component__resp-table
        // class then add it.
        $('.c-richtext table:not(.component__resp-table)').addClass('component__resp-table');
        // Reset Table Attributes.
        $(tableSelector).removeAttr('border').removeAttr('cellpadding').removeAttr('cellspacing').removeAttr('style');
        $(tableSelector).find('th').removeAttr('style');
        $(tableSelector).find('td').removeAttr('style');
      }


      // Init. Stack table Stack Columns JS
      $(tableSelector).once().stackcolumns({
        // This passes our class to the mobile version.
        myClass: 'component__resp-table'
      });

      // Once the mobile table has rendered, check to see if our Row & Column
      // Header cell (first cell in table) is empty or if it's just a &nbsp;
      if(!$.trim($('.c-richtext .st-head-row-main > .st-key').html()).length || $('.c-richtext .st-head-row-main > .st-key').html() === '&nbsp;') {
        // if it is, remove the empty cell.
        $(tableSelector).find('.st-head-row-main > .st-key').remove();
        // and add a colspan attribute to the remaining cell.
        $(tableSelector).find('.st-head-row-main > .st-val').attr('colspan','2');
      }

    }
  };

})(jQuery, Drupal, drupalSettings);
;
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function(method) {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function() {
    Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function() {
    Waypoint.invokeAll('enable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    if (horizontalEmpty && verticalEmpty) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        Waypoint.requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        Waypoint.requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window
    /*eslint-enable eqeqeq */
    var contextOffset = isWindow ? undefined : this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    Waypoint.requestAnimationFrame(function() {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers()
      }
    })

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }

  Waypoint.requestAnimationFrame = function(callback) {
    var requestFn = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      requestAnimationFrameShim
    requestFn.call(window, callback)
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
    this.$element = $(element)
  }

  $.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    JQueryAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  $.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function(i, method) {
    JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeCtaAnimations) {
    Drupal.atgeCtaAnimations = {};
  }

  Drupal.behaviors.atgeCtaAnimations = {
    attach: function(context, settings) {

      // Get animation option from drupal.
      const type = drupalSettings.atge_components_cta.animations;
      // Set a count so we can increment on each banner item.
      // We'll start at 2 since the header uses delay #1.
      let count = 2;

      // Iterate through each cta component.
      $('.c-cta-banner .is-animated').each(function () {
        // Set our animation targets.
        let animateTargets = '.c-cta-banner__content--header, .p-cta-banner__content--item';
        // Set base animation class for each element that needs to animate.
        $(this).find(animateTargets).addClass('animation');

        // Call waypoints library.
        $(this).waypoint(function () {
          // On waypoint scroll, fire the following animations via addClass.
          $(this.element).find('.c-cta-banner__content--header').addClass(type + ' animation--delay-1');
          // iterate through each item and update delay count.
          $(this.element).find('.p-cta-banner__content--item').each(function () {
            $(this).addClass(type + ' animation--delay-'+count);
            count++;
          });
        }, {
          // Set waypoints offset when component is 60% from top of window.
          offset: '60%'
        });
      });

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeAccordionComponentAccordions) {
    Drupal.atgeAccordionComponentAccordions = {};
  }

  Drupal.behaviors.atgeAccordionComponentAccordions = {
    attach: function(context, settings) {

      // TODO: Write FAQ Style Accordions function.
      const themeAbbv = drupalSettings.atge_base.global.theme_abbv;

      // function that provides content accordion behaviors.
      function faqAccordions() {
        $('.p-accordion__item', context).each(function () {

          // On init, collapse all accordion content sections, and reset icons.
          $(this).removeClass('c-accordion--expanded').addClass('c-accordion--collapsed');
          $(this).find('.p-accordion__item--body').hide();
          $(this).find('.icon').removeClass().addClass('icon icon-'+themeAbbv+'-plus');

          // On click of accordion heading, expand accordion content.
          $(this).find('.p-accordion__item--heading').on('click', function () {
            // Swap out expanded / collapsed classes on click.
            $(this).parent().toggleClass('c-accordion--collapsed c-accordion--expanded');
            // Toggle accordion body expanded / collapsed behaviors on click.
            $(this).parent().find('.p-accordion__item--body').slideToggle('fast');
            // Toggle expanded / collapsed icons on click.
            $(this).find('.icon').toggleClass('icon-'+themeAbbv+'-minus icon-'+themeAbbv+'-plus');
          });
        });
      }

      // Call accordion function.
      faqAccordions();

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';

  $(document).ready(function () {

    // Analytics for the accordion component
    $('.p-accordion__item--heading').on('click', function () {
      let accordionTitle = '';
      if ($(this).parent().hasClass('c-accordion--expanded')) {
        if (undefined !== this.parentElement.parentElement.parentElement
          .getElementsByClassName('p-atge-accordion--heading')[0]) {
          accordionTitle = this.parentElement.parentElement.parentElement
            .getElementsByClassName('p-atge-accordion--heading')[0].innerText;
        }

        Drupal.behaviors.atgeAnalytics.expandList(accordionTitle, this.innerText);
      }
    });
  });
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeCarouselTheme) {
    Drupal.atgeCarouselTheme = {};
  }

  Drupal.behaviors.atgeCarouselTheme = {
    attach: function(context, settings) {

      // Iterate through each usage of carousel component.
      $('.c-carousel').each(function (i, carousel) {

        const videoInline = $(carousel).find('.e-video');

        // Load IE Object Fit Fix.
        Drupal.behaviors.atgeBaseGlobalFunctions.ieObjectFitFix('.e-media-cover-img');

        // Hide Cover image on click for external videos.
        $(videoInline).find('.e-video--external').each(function (j, video) {
          $(video).find('.e-media-cover-img').on('click', function () {

            // Get the YouTube video info from inside the clicked player container
            // Attach it to the window object so it can be used in another file
            // @see youtube.atge.iframe.async.js:56
            let clickedVideoId = $(video).attr('id');
            let vidInfoDiv = $(video).find('.atge-youtube-data');
            let youTubeVidId = $(vidInfoDiv).data('videoId');

            // If this function is defined on the window object, execute it
            // Downloads the YouTube JavaScript required to play videos
            // Plays the video that was clicked after the JS has been loaded
            if (typeof atgeAddYouTubeCode === 'function') {
              window.clickedVideo = clickedVideoId;
              atgeAddYouTubeCode();
            }

            $(this).fadeOut();
            // If there are videos on the page, play the one that was clicked
            // Stop the ones that were not clicked
            if (window.videosOnPage) {
              window.videosOnPage.map(function(video) {
                if (youTubeVidId === video.id) {
                  video.player.playVideo();
                } else {
                  video.player.stopVideo();
                }
              });
            }

            $(video).find('.yt-player').each(function (k, player){
              player.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
            });
            // Pause All Other Videos
            $('.c-carousel').find('.e-video--external').not($(video)).find('.yt-player').each(function(k, player) {
              player.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
            });
          });
        });

        // Hide Cover image on click for internal videos.
        $(videoInline).find('.e-video--internal').each(function (j, video) {
          $(video).find('.e-media-cover-img').on('click', function () {

            //Download YouTube JS as it's not downloaded immediately on page load
            if (typeof atgeAddYouTubeCode === 'function') {
              atgeAddYouTubeCode();
            }

            $(this).fadeOut();
            $(video).find('.e-media__video--banner').each(function (k, player) {
              if(player.paused) {
                player.play();
                // Pause All Other Videos
                $('.c-carousel').find('.e-video--internal').not($(video)).find('.e-media__video--banner').each(function(l, player2) {
                  player2.pause();
                });
              } else {
                player.pause();
              }
            });
          });
        });

      });

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeMediaSlickCarousel) {
    Drupal.atgeMediaSlickCarousel = {};
  }

  Drupal.behaviors.atgeMediaSlickCarousel = {
    attach: function(context, settings) {
      // Iterate through each usage of carousel component.
      $('.c-carousel').each(function (i, carousel) {
        let carouselItems = '.c-carousel__items';
        let count = $(carousel).find(carouselItems + '> div').length;

        if (count > 1) {
          // Find the items selector and apply slick based on drupalSettings passed.
          let carouselItemsObj = $(carousel).find(carouselItems);
          $(carousel).find(carouselItems).slick({
            accessibility: true,
            adaptiveHeight: true,
            arrows: carouselItemsObj.attr('carousel-arrows') == 1 ? true : false,
            autoplay: carouselItemsObj.attr('carousel-autoplay') == 1 ? true : false,
            autoplaySpeed: carouselItemsObj.attr('carousel-autoplaySpeed'),
            dots: carouselItemsObj.attr('carousel-dots') == 1 ? true : false,
            fade: carouselItemsObj.attr('carousel-fade') == 1 ? true : false,
            focusOnSelect: false,
            infinite: carouselItemsObj.attr('carousel-infinite') == 1 ? true : false,
            initialSlide: parseInt(carouselItemsObj.attr('carousel-initialSlide')),
            slidesToShow: parseInt(carouselItemsObj.attr('carousel-slidesToShow')),
            slidesToScroll: 1,
            variableWidth: carouselItemsObj.attr('carousel-variableWidth') == 1 ? true : false,
            responsive: [
              {
                breakpoint: 1023,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 639,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          });

          // Fixing the height of the first item after the image loaded.
          // The event scroll is necessary because the image only load when
          // is being show on the screen.
          let fixHeightItem = false; 
          $(document).scroll(function () {
            if ($(carousel).find('img').length) {
              let imgHeight = $($(carousel).find('img').get(0)).height();
              if (imgHeight != 0 && !fixHeightItem) {
                let heightItemCarousel = $(carousel).find('.slick-active').closest('.slick-track').height();
                $(carousel).find('.slick-active').closest('.slick-list.draggable').height(heightItemCarousel);
                fixHeightItem = true;
              }
            }
          });
          
          // Pause YouTube Video on slide change.
          $(carousel).find(carouselItems).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $(carousel).find('.yt-player').each(function (j, player) {
              player.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
            });
          });
        }
      });

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeBannerComponentInteractions) {
    Drupal.atgeBannerComponentInteractions = {};
  }

  Drupal.behaviors.atgeBannerComponentInteractions = {
    attach: function(context, settings) {

      // Create function to set media item mobile item.
      function setMediaItemMobileHeight() {
        // Variables.
        let width = $(window).width();

        // run on each media item.
        $('.c-banner').each(function () {
          // Set variable that gets height of the media container.
          let bannerItem = $(this).find('.c-banner__media--item');
          let bannerImg = $(this).find('.c-banner__media--item img');

          // Check if mobile.
          if (width < 1024) {
            let headerHeight = $(this).find('.p-banner__media').height();
            // Add class to media item.
            bannerItem.addClass('e-overlay-media');
            // Set dynamic height on media item image.
            bannerImg.css('max-height', headerHeight - 10);
          }
          else {
            // If we're not at a mobile screensize, reset the max-height.
            bannerImg.css('max-height', '');
          }

        });
      }

      // Check if media item exists.
      if ($('.c-banner__content--item:not(.e-media--no-overlay)').hasClass('c-banner__media--item')) {
        // Init function on load.
        $(window).on('load', setMediaItemMobileHeight);
        // Update function on resize.
        $(window).resize(setMediaItemMobileHeight);
      }

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumHeaderMainNav) {
    Drupal.rumHeaderMainNav = {};
  }

  Drupal.behaviors.rumHeaderMainNav = {
    attach: function (context, settings) {

      $(document).ready(function() {
        var heroBanner = $('.hide-on-tablet .c-banner:first');
        if (heroBanner.length <= 0) heroBanner = $('.c-banner:first');
        var footerMenu = $('#block-secondaryfooternavigation');
        // Checking if theres Hero Banner in the page
        if (heroBanner.length > 0) {
          heroBannerPosition = heroBanner.offset();
          heroBannerHeight = Math.round(heroBanner.height());
          $(window).scroll(function () {
            heroBannerPosition = heroBanner.offset();
            currentTop = ($(window).scrollTop());
            if (currentTop > heroBannerHeight + heroBannerPosition.top - 70 ) {
              footerMenu.addClass('menu--visible');
            } else {
              footerMenu.removeClass('menu--visible');
            }
          });
        } else {
          footerMenu.addClass('menu--visible');
        }
      });
      
      function changeBackgroundHeader() {
        if($('.c-rum-banner--item').hasClass('p-banner__bg-color--none')){
          $('.region__header.alt-header').addClass('primary-color');
        }
      }
      $(window).on('load', changeBackgroundHeader);

      // Adding GTM to call-to-action classes
      const utilitySearch = $('#block-secondaryfooternavigation');
      utilitySearch.find('.menu-cta-link').attr({
        'data-gtm': 'call-to-action'
      });
      
      const mobileutility = $('#block-mobileutility');
      mobileutility.find('.menu-cta-link').attr({
        'data-gtm': 'call-to-action'
      });

      // Adding an attribute data-click-label to  
      // identify buttons with same text
      let callToAction = $('[data-gtm="call-to-action"]');
      let countAllCallToAction = [];
      let repeatedCallToAction = [];
      callToAction.each(function (i, button) {
        if ((button.text.trim() + ' - ' + button.href) in countAllCallToAction) {
          repeatedCallToAction[button.text.trim() + ' - ' + button.href] = button.text.trim();
        } else {
          countAllCallToAction[button.text.trim() + ' - ' + button.href] = button.text.trim();
        }
      });

      let key;
      for (key in repeatedCallToAction) {
        let numButton = 1;
        $('[data-gtm="call-to-action"]:contains("' + repeatedCallToAction[key] + '")').each(function (i, button) {
          if (key == (button.text.trim() + ' - ' + button.href)) {
            $(button).attr('data-click-label', button.text.trim() + ' - Button ' + numButton++);
          }
        });
      }

      //remove default navClick; add data attribute
      $('.block__menu--main li.call-to-action').find('a').once()
          .removeAttr('onClick')
          .attr('data-gtm', 'call-to-action')
    }
  };

})(jQuery, Drupal, this, this.document);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeTBMegaMenu) {
    Drupal.atgeTBMegaMenu = {};
  }

  Drupal.behaviors.atgeTBMegaMenu = {
    attach: function(context, settings) {

      function setTBMegaMenuWidth() {
        let offset, windowWidth;

        // Determine window width so that tb mega menu can always span edge to edge.
        $('.tb-megamenu ul.tb-megamenu-nav > li').each(function (i, tbNavItem) {

          // Set const Vars.
          const dropDown = '.tb-full-width.mega-dropdown-menu';
          const dropDownInner = '.mega-dropdown-inner';
          const dataWidth = $(tbNavItem).find('.tb-megamenu-column').data('width');
          const tablet = window.matchMedia('(min-width:40em) and (max-width: 1023px)');

          offset = $(tbNavItem).find(dropDown).offset();
          windowWidth = $(window).width();

          // Get window width and apply it to submenu wrapper.
          $(tbNavItem).find(dropDown).css('width', windowWidth);
          // Get distance between browser edge and beginning of submenu.
          $(tbNavItem).find(dropDown).offset({left: 0});
          // Check Data Width Attributes and apply max-widths in cases of 3 & 4 data widths.
          if (dataWidth === 4) {
            // Apply an extra class so that we can control width in css.
            $(tbNavItem).find(dropDown).children(dropDownInner).addClass('tb-col-3');
          } else if (dataWidth === 3) {
            // Apply an extra class so that we can control width in css.
            $(tbNavItem).find(dropDown).children(dropDownInner).addClass('tb-col-4');
          } else if (dataWidth === 6) {
            // Apply an extra class so that we can control width in css.
            $(tbNavItem).find(dropDown).children(dropDownInner).addClass('tb-col-2');
          } else if (dataWidth === 12) {
            $(tbNavItem).find('.mega-dropdown-menu').children(dropDownInner).addClass('tb-col-12');
          }
        });
      }

      /* Check the viewport and decide which behavior */
      setTBMegaMenuWidth();

      /* After resizing the browser, reset everthing, then check the viewport and decide which behavior */
      $(window).resize(setTBMegaMenuWidth);

    }
  };

})(jQuery, Drupal, drupalSettings);
;
/*
 * This is a dupe of tb_megamenus/tb-megamenus-frontend.js after having applied
 * tb_megamenu_a11y_compatibility.patch and tb_megamenu_frontend_js_is_touch_var_fix.patch
 * with overrides at lines 92 and 112 to disable mouseover event handling in favor of clicks
 */
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($, Drupal, drupalSettings) {
  "use strict";

  Drupal.TBMegaMenu.oldWindowWidth = 0;
  Drupal.TBMegaMenu.displayedMenuMobile = false;
  Drupal.TBMegaMenu.supportedScreens = [980];
  Drupal.TBMegaMenu.menuResponsive = function () {
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    var navCollapse = $('.tb-megamenu').children('.nav-collapse');
    if (windowWidth < Drupal.TBMegaMenu.supportedScreens[0]) {
      navCollapse.addClass('collapse');
      if (Drupal.TBMegaMenu.displayedMenuMobile) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      } else {
        navCollapse.css({height: 0, overflow: 'hidden'});
      }
    } else {
      // If width of window is greater than 980 (supported screen).
      navCollapse.removeClass('collapse');
      if (navCollapse.height() <= 0) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      }
    }
  };

  Drupal.behaviors.tbMegaMenuAction = {
    attach: function (context, settings) {

      var showMenu = function ($menuItem, mm_timeout) {
        $menuItem.children('.dropdown-toggle').attr('aria-expanded', 'true');
        if ($menuItem.hasClass ('mega')) {
          $menuItem.addClass ('animating');
          clearTimeout ($menuItem.data('animatingTimeout'));
          $menuItem.data('animatingTimeout', setTimeout(function(){$menuItem.removeClass ('animating')}, mm_timeout));
          clearTimeout ($menuItem.data('hoverTimeout'));
          $menuItem.data('hoverTimeout', setTimeout(function(){$menuItem.addClass ('open')}, 100));
        } else {
          clearTimeout ($menuItem.data('hoverTimeout'));
          $menuItem.data('hoverTimeout',
              setTimeout(function(){$menuItem.addClass ('open')}, 100));
        }
      };

      var hideMenu = function ($menuItem, mm_timeout) {

        $menuItem.children('.dropdown-toggle').attr('aria-expanded', 'false');

        if ($menuItem.hasClass ('mega')) {
          $menuItem.addClass ('animating');
          clearTimeout ($menuItem.data('animatingTimeout'));
          $menuItem.data('animatingTimeout',
              setTimeout(function(){$menuItem.removeClass ('animating')}, mm_timeout));
          clearTimeout ($menuItem.data('hoverTimeout'));
          $menuItem.data('hoverTimeout', setTimeout(function(){$menuItem.removeClass ('open')}, 100));
        } else {
          clearTimeout ($menuItem.data('hoverTimeout'));
          $menuItem.data('hoverTimeout',
              setTimeout(function(){$menuItem.removeClass ('open')}, 100));
        }
      };

      var button = $(context).find('.tb-megamenu-button').once('tb-megamenu-action');
      $(button).click(function () {
        if (parseInt($(this).parent().children('.nav-collapse').height())) {
          $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
          Drupal.TBMegaMenu.displayedMenuMobile = false;
        }
        else {
          $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
          Drupal.TBMegaMenu.displayedMenuMobile = true;
        }
      });


      var isTouch = false;
      if (!isTouch) {
        $(document).ready(function ($) {
          var mm_duration = 0;
          $('.tb-megamenu', context).each(function () {
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });
          var mm_timeout = mm_duration ? 100 + mm_duration : 500;

          //open mega on parent focus (tabbing forward)
          $('.nav > li > .dropdown-toggle, li.mega > .dropdown-toggle', context).on('focus', function(event) {
            var $this = $(this);
            var $subMenu = $this.closest('li');

            showMenu($subMenu, mm_timeout);
            // If the focus moves outside of the subMenu, close it.
            $(document).bind('focusin', function(event) {
              if ($subMenu.has(event.target).length) {
                return;
              }
              $(document).unbind(event);
              hideMenu($subMenu, mm_timeout);
            });
          });
          //open mega on child's focus (shift-tabbing back)
          $('li.mega.level-2 > a', context).bind('focus', function(event) {
            var $this = $(this);
            var $subMenu = $this.closest('li.mega.level-1');

            showMenu($subMenu, mm_timeout);
            // If the focus moves outside of the subMenu, close it.
            $(document).bind('focusin', function(event) {
              if ($subMenu.has(event.target).length) {
                return;
              }
              $(document).unbind(event);
              hideMenu($subMenu, mm_timeout);
            });
          });

          //Store previously clicked item in menu
          var previousMenuClick;

          $(document).once('dropdown-toggle').on('click', function(event) {
            if (!$(event.target).closest('.tb-megamenu-item').length) {
              hideMenu($('li.mega.open'), mm_timeout);
            } else {
              //If the target is an A but IS a parent nav item, store its value
              //then toggle the menu shut if it's the same item as opened the menu
              if ($(event.target).is('a') && $(event.target).hasClass('dropdown-toggle')) {
                event.preventDefault();

                if (previousMenuClick === event.target && $(event.target).parent().hasClass('open')) {
                  hideMenu($(event.target).parent(), mm_timeout);
                } else {
                  showMenu($(event.target).parent(), mm_timeout);
                }
              }

              //if the click happens to be on the close icon, hideMenu
              if ($(event.target).hasClass('mega-dropdown__close')) {
                hideMenu($('li.mega.open'), mm_timeout);
              }
              //Set the previous click variable to the event target for the next click
              previousMenuClick = event.target;
            }

          });
        });
      }

      $(window).resize(function () {
        var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        if (windowWidth != Drupal.TBMegaMenu.oldWindowWidth) {
          Drupal.TBMegaMenu.oldWindowWidth = windowWidth;
          Drupal.TBMegaMenu.menuResponsive();
        }
      });
    }
  };
})(jQuery, Drupal, drupalSettings);

;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.rumFormSearchHeader) {
    Drupal.rumFormSearchHeader = {};
  }

  Drupal.behaviors.rumFormSearchHeader = {
    attach: function (context, settings) {

      //header search button and form
      $('.global-search').find('input').once()
          .attr('placeholder', 'What are you looking for?')
          .on('focus', function(e){
            $('.global-search').find('.form--inline').addClass('is-active');
          })
          .on('blur', function(e){
            $('.global-search').find('.form--inline').removeClass('is-active');
          });
      $('.global-search-trigger', context).once().on('click', function(e){
        e.preventDefault();
        $('.global-search')
            .toggleClass('is-active')
            .find('input').val('');
        $('.global-search').find('.form--inline input').focus();
      });

      $('.header--mobile-menu .e-icon.icon-rum-menu').click(function(){
        $('.menu__mobile--search').find('input.form-text').attr('placeholder', ' Search');
      })

    }
  };

})(jQuery, Drupal, this, this.document);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.agteAltHeaderStyle) {
    Drupal.agteAltHeaderStyle = {};
  }

  Drupal.behaviors.agteAltHeaderStyle = {
    attach: function(context, settings) {
      // homepage
      if($(context).find('body').hasClass('path-frontpage')) {

        var header = $(context).find('.region__header').addClass('alt-header'),
            altHead = new Waypoint({
              element: $(context).find('.page--main'),
              handler: function(direction) {
                header.toggleClass('alt-header',function() {
                  return (direction === 'up');
                });
              },
              offset: -header.outerHeight()
            });

      } // homepage
    }
  };

})(jQuery, Drupal, drupalSettings);
;
/*!
Waypoints Sticky Element Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
  function Sticky(options) {
    this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options)
    this.element = this.options.element
    this.$element = $(this.element)
    this.createWrapper()
    this.createWaypoint()
  }

  /* Private */
  Sticky.prototype.createWaypoint = function() {
    var originalHandler = this.options.handler

    this.waypoint = new Waypoint($.extend({}, this.options, {
      element: this.wrapper,
      handler: $.proxy(function(direction) {
        var shouldBeStuck = this.options.direction.indexOf(direction) > -1
        var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : ''

        this.$wrapper.height(wrapperHeight)
        this.$element.toggleClass(this.options.stuckClass, shouldBeStuck)

        if (originalHandler) {
          originalHandler.call(this, direction)
        }
      }, this)
    }))
  }

  /* Private */
  Sticky.prototype.createWrapper = function() {
    if (this.options.wrapper) {
      this.$element.wrap(this.options.wrapper)
    }
    this.$wrapper = this.$element.parent()
    this.wrapper = this.$wrapper[0]
  }

  /* Public */
  Sticky.prototype.destroy = function() {
    if (this.$element.parent()[0] === this.wrapper) {
      this.waypoint.destroy()
      this.$element.removeClass(this.options.stuckClass)
      if (this.options.wrapper) {
        this.$element.unwrap()
      }
    }
  }

  Sticky.defaults = {
    wrapper: '<div class="sticky-wrapper" />',
    stuckClass: 'stuck',
    direction: 'down right'
  }

  Waypoint.Sticky = Sticky
}())
;;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.agteStickyHeader) {
    Drupal.agteStickyHeader = {};
  }

  Drupal.behaviors.agteStickyHeader = {
    attach: function(context, settings) {
      var sticky = null, stickyHeader, 
      stickyTimeout, currentWidth = $(window).width();
      function stickyMenuHeader() {
        //Check if exist alert banner above nav and define the offset for menu header
        let alertStickyAnchor = $(context).find('.c-alert.c-alert--stick'),
        sumHeight = 0;
        if (alertStickyAnchor.length) {
          alertStickyAnchor.each(function (i, anchor) {
            if ($(anchor).hasClass('c-alert--above-nav')) {
              sumHeight += $(anchor).outerHeight();
            }
          });
        }
        // Sticky Header
        stickyHeader = $(context).find('.region__header');
        if ($(window).width() >= 1024) {
          sticky = new Waypoint.Sticky({
            element: stickyHeader,
            offset: sumHeight,
            handler: function(direction) {
              if (direction === 'down') {
                this.element.css('top', sumHeight);
              } else {
                this.element.css('top', 0);
              }
            }
          });
        }
      }
      stickyMenuHeader();
      $(window).resize( function(){
        if (currentWidth != $(window).width()) {
            currentWidth = $(window).width();
          if (sticky != null) {
            sticky.destroy();
          }
          clearTimeout(stickyTimeout);
          stickyTimeout = setTimeout( function() {
            stickyMenuHeader();
          },300);
        }
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.atgeMobileMenu) {
    Drupal.atgeMobileMenu = {};
  }

  Drupal.behaviors.atgeMobileMenu = {
    attach: function(context, settings) {

      // Set vars.
      const mobileIcon = $('.menu__mobile--header .menu-button .e-icon', context);
      const mobileBtn = $('.header--mobile-menu', context);
      const mobileContent = $('.menu__mobile--content', context);
      const mobileSearch = $('.menu__mobile--search', context);
      const searchTarget = '.menu__mobile--search .form-type-textfield';
      const searchPlaceholder = Drupal.t(' What are you looking for?');

      var mobileWidth = $(window).width();

      const themeAbbv = drupalSettings.atge_base.global.theme_abbv;

      // Init Mobile Header elements.
      function mobileMenuInit() {
        // Hide Mobile Menu Content & close submenus.
        $(mobileContent).hide();

        // Reset Icon Class.
        mobileIcon.removeClass('icon-' + themeAbbv + '-close').addClass('icon-' + themeAbbv + '-menu');

        // Reset menu status class.
        mobileContent.removeClass('mobile-menu-open').addClass('mobile-menu-closed');

        // Search Bar Updates.
        // Clear the search input and submit button values.
        mobileSearch.find('input[type="submit"], input[type="text"]').val('');

        // Remove some classes from our submit button.
        mobileSearch.find('#edit-submit-acquia-search').removeClass('button e-btn--primary');

        // Append icon markup before the submit button.
        mobileSearch.find('.form-actions').once().prepend('<span class="icon-' + themeAbbv + '-search e-icon-search"></span>');

        // Add a placeholder to the input field.
        mobileSearch.find('input').once().attr('placeholder', searchPlaceholder);

        // If the reset button is present, remove it.
        mobileSearch.find('#edit-reset').remove();

        // Update hidden label for a11y.
        mobileSearch.find('label').addClass('visually-hidden').text(Drupal.t('Mobile Search'));
        // Update hidden label and reset ids / for attributes for a11y.
        const searchId = $(searchTarget).children('input').attr('id');
        $(searchTarget).children('input').attr('id',searchId+'-2');
        $(searchTarget).children('label').attr('for',searchId+'-2');
        $(searchTarget).children('label').text('Mobile Menu Search');

        mobileWidth = $(window).width();
      }

      // Mobile Menu Open / Close Toggle.
      mobileBtn.once('mobile-menu-open').on('click', function(e) {
        e.stopPropagation();

        // Conditions for if the menu is open or not.
        if (mobileContent.hasClass('mobile-menu-closed')) {
          mobileContent.removeClass('mobile-menu-closed').addClass('mobile-menu-open');
          mobileIcon.parent().addClass('is-active');
          mobileIcon.removeClass('icon-' + themeAbbv + '-menu').addClass('icon-' + themeAbbv + '-close').addClass('is-active');
          mobileIcon.attr('aria-expanded', 'true');
          mobileContent.slideDown();
        }
        else {
          mobileContent.removeClass('mobile-menu-open').addClass('mobile-menu-closed');
          mobileIcon.parent().removeClass('is-active');
          mobileIcon.addClass('icon-' + themeAbbv + '-menu').removeClass('icon-' + themeAbbv + '-close').removeClass('is-active');
          mobileIcon.attr('aria-expanded', 'false');
          mobileContent.slideUp();
          // If the mobile menu is active and we've clicked to close, reset the
          // menu accordions.
          $('.menu__accordion--subnav-1').removeClass('menu__accordion--subnav-1--active').hide();
          $('.menu__accordion--icon:not(.no-children)').removeClass('icon-' + themeAbbv + '-minus active').addClass('icon-' + themeAbbv + '-plus');
        }

        // TODO: is there a better solution for prevent a keyboard init resize?
        if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) && mobileWidth < 768) {
          // Disable resize on actual mobile devices.
          // Opening the keyboard on some mobile devices triggers a resize which resets mobile menu.
          $(window).off('resize');
        }
      });

      // Allow the search icon click to trigger search submit.
      mobileSearch.find('.form-actions').on('click', function(e){
        e.preventDefault();
        $(this).parents('form').trigger('submit');
      });

      // Apply a focus class to the form wrapper so that we can include the
      // search button in the a11y form field outline.
      $(searchTarget).find('input').focus(function () {
        $(this).parents('.form--inline').addClass('is-focused');
      }).blur(function () {
        $(this).parents('.form--inline').removeClass('is-focused');
      });

      // When Mobile Menu items from the main menu don't have children, have the
      // arrow trigger the link.
      $('.menu__main--mobile .menu__accordion--parent > .menu-item').once().each(function () {
        // If when uses Mobile Menu "no-link" items allow span click to trigger the link.
        $(this).find('span.menu__accordion--link').on('click touch', function () {
          $(this).parent().find('.menu__accordion--icon')[0].click();
        });
        // Else, when Mobile Menu items from the main menu don't have children, have the
        // arrow trigger the link.
        $(this).find('.menu__accordion--icon.no-children').on('click touch', function () {
          $(this).parent().find('a')[0].click();
        });
      });

      // Call mobile menu init function.
      $(window).on('load', mobileMenuInit);
      // Rerun on window resize.
      $(window).resize(mobileMenuInit);

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.agteAccordionMenus) {
    Drupal.agteAccordionMenus = {};
  }

  Drupal.behaviors.agteAccordionMenus = {
    attach: function(context, settings) {

      // Accordion Menu Select Vars.
      const accordionInner = '.menu__accordion--subnav-1';
      const accordionLinkTarget = '.menu__accordion--parent > .menu-item--expanded > .menu__accordion--icon';
      const accordionLinkParent = '.menu-item--expanded';
      const accordionLinkClass = '.menu__accordion--link';
      const accordionIconClass = '.menu__accordion--icon';

      // Calling Accordion Menu Function.
      Drupal.behaviors.atgeBaseGlobalFunctions.accordionMenus(accordionInner, accordionLinkTarget, accordionLinkParent, accordionLinkClass, accordionIconClass, false);

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.ExternalLinks) {
    Drupal.ExternalLinks = {};
  }

  Drupal.behaviors.ExternalLinks = {
    attach: function(context, settings) {

      // Set Base settings var.
      const atgeSettings = settings.atge_external_links.external_links;
      // Get the array of the whitelisted external links (passed from drupal).
      const linkItems = atgeSettings.whitelist;
      // Get enabled / disabled state of module.
      const onSwitch = atgeSettings.onswitch;
      // Get the value of the modal delay and multiply by 1000 to convert to
      // milliseconds.
      const modalSetting = atgeSettings.modal.delay;
      const modalDelay = modalSetting === '0' ? 0 : modalSetting * 1000;
      let modalFlag = modalDelay === 0;

      function externalLinkModal(anchor) {
        // Set Vars.
        const container = '.layout-container';
        const modalBlock = '.block__elm';
        const modalUnderlay = '.block__elm--underlay';
        const modalClose = '.block__elm--close';
        const modalDeclineBtn = '.block__elm--button-decline';
        const modalAcceptBtn = '.block__elm--button-accept';
        let autoClick;
        let resetBtn;

        // On Init, reset the accept button data-href attribute.
        $(modalAcceptBtn).attr('href', '');

        // On click of a true external link, prevent normal link behavior and
        // open the modal window.  Also, set the accept button data-href
        // attribute according to the link that was clicked.
        $(anchor, context).once('elmClicked').on('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          $(modalBlock).fadeIn();
          $(this).parents(container).find(modalAcceptBtn).attr('href', anchor.href);
          let dataHref = $(this).parents(container).find(modalAcceptBtn).attr('href');
          // If a specific amount of time passes before the user either declines
          // or accepts, proceed to URL set by data-href attribute.
          if (dataHref && modalFlag === false) {
            autoClick = setTimeout(function () {
              window.open(dataHref);
              $(modalBlock).fadeOut();
              $(modalAcceptBtn).attr('href', '');
            }, modalDelay);
          }
          // Set focus to first button for accessibility.
          $(this).parents(container).find(modalAcceptBtn).focus();
        });

        // On click of modal underlay, close, or decline buttons, fade out the
        // the modal window, reset the data-href attribute back to empty and
        // and stop link from executing on time-delay.
        $(modalUnderlay + ', ' + modalClose + ', ' + modalDeclineBtn, context).on('click', function (e) {
          e.stopPropagation();
          $(modalAcceptBtn).attr('href', '');
          $(modalBlock).fadeOut();
          clearTimeout(autoClick);
        });

        // On click of accept button, take the user to the URL set by the
        // data-href attribute.
        $(modalAcceptBtn, context).on('click', function (e) {
          e.stopPropagation();
          clearTimeout(autoClick);
          resetBtn = setTimeout(function () {
            $(modalBlock).fadeOut();
            $(modalAcceptBtn).attr('href', '');
          }, 500);
        });
      }

      if (onSwitch === 1) {
        // Iterate through each anchor link.
        $('.layout-container a', context).once('elmBehaviors').each(function () {
          if (location.hostname === this.hostname || this.href.match(/^mailto\:/) || this.href.match(/^tel\:/)) {
            // if the anchor hostname is local, add an internal link class.
            $(this).addClass('link--internal');
          }
          else {
            if ($.inArray(this.hostname, linkItems) !== -1) {
              // If our anchor's hostname matches a hostname in the linkItems
              // array, then add a whitelist class.
              $(this).addClass('link--whitelisted');
              $(this).attr('target', '_blank');
            }
            else {
              // If our anchor's host name is external and NOT in the linkItems
              // array, then add an external link class and process the external
              // link modal function.
              if (!$(this).attr('href') || $(this).attr('href') === '#' || $(this).attr('href') === '') {
                // Ignore in cases where there is no set href, an empty href, or a href="#".
              }
              else {
                $(this).addClass('link--external');
                externalLinkModal(this);
              }
            }
          }
        });
      }

    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  /**
   * Define base namespace.
   */
  if (!Drupal.seckitIntegrity) {
    Drupal.seckitIntegrity = {};
  }

  Drupal.behaviors.seckitIntegrity = {
    attach: function (context, settings) {

      // Set Base settings var.
      const secKitSettings = settings.seckit.integrity;
      // Get enabled / disabled state of the integrity hash.
      const integrityStatus = secKitSettings.subresource_integrity;
      // Get enabled / disabled state of the crossorigin attribute.
      const crossOriginStatus = secKitSettings.subresource_crossorigin;

      setTimeout(function () {
        $("script").each(function (index) {
          var script = $(this).attr('src') ? $(this) : '';
          var hash = 'sha384-R4/ztc4ZlRqWjqIuvf6RX5yb/v90qNGx6fS48N0tRxiGkqveZETq72KgDVJCp2TC';
          if (script[0]) {
            if (crossOriginStatus === 1) {
              $(this).attr('crossorigin', 'anonymous');
            }
            if (integrityStatus === 1) {
              $(this).attr('integrity', hash);
            }
          }
        });
      }, 3000);
    }
  };

})(jQuery, Drupal, drupalSettings);


;
