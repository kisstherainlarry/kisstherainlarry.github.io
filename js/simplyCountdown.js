/*!
 * Project : simply-countdown
 * File : simplyCountdown
 * Date : 27/06/2015
 * License : MIT
 * Version : 1.3.2
 * Author : 
 * Contributors : 
 *  - Justin Beasley <JustinB@harvest.org>
 *  - Nathan Smith <NathanS@harvest.org>
 */
/*global window, document*/
(function (exports) {
    'use strict';

    var // functions
        extend,
        createElements,
        createCountdownElt,
        simplyCountdown;

    /**
     * Function that merge user parameters with defaults one.
     * @param out
     * @returns {*|{}}
     */
    extend = function (out) {
        var i,
            obj,
            key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }

        return out;
    };

    /**
     * Function that create a countdown section
     * @param countdown
     * @param parameters
     * @param typeClass
     * @returns {{full: (*|Element), amount: (*|Element), word: (*|Element)}}
     */
    createCountdownElt = function (countdown, parameters, typeClass) {
        var innerSectionTag,
            sectionTag,
            amountTag,
            wordTag;

        sectionTag = document.createElement('div');
        amountTag = document.createElement('span');
        wordTag = document.createElement('span');
        innerSectionTag = document.createElement('div');

        innerSectionTag.appendChild(amountTag);
        innerSectionTag.appendChild(wordTag);
        sectionTag.appendChild(innerSectionTag);

        sectionTag.classList.add(parameters.sectionClass);
        sectionTag.classList.add(typeClass);
        amountTag.classList.add(parameters.amountClass);
        wordTag.classList.add(parameters.wordClass);

        countdown.appendChild(sectionTag);

        return {
            full: sectionTag,
            amount: amountTag,
            word: wordTag
        };
    };

    /**
     * Function that create full countdown DOM elements calling createCountdownElt
     * @param parameters
     * @param countdown
     * @returns {{days: (*|Element), hours: (*|Element), minutes: (*|Element), seconds: (*|Element)}}
     */
    createElements = function (parameters, countdown) {
        var spanTag;

        if (!parameters.inline) {
            return {
                //years: createCountdownElt(countdown, parameters, 'simply-years-section'),
                //months: createCountdownElt(countdown, parameters, 'simply-months-section'),
                //days: createCountdownElt(countdown, parameters, 'simply-days-section'),
                //tmp1: createCountdownElt(countdown, parameters, 'simply-tmp1-section'),
                hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
                //tmp2: createCountdownElt(countdown, parameters, 'simply-tmp2-section'),
                minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
                //tmp3: createCountdownElt(countdown, parameters, 'simply-tmp3-section'),
                seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section')
            };
        }

        spanTag = document.createElement('span');
        spanTag.classList.add(parameters.inlineClass);
        return spanTag;
    };

    /**
     * simplyCountdown, create and display the coundtown.
     * @param elt
     * @param args (parameters)
     */
    simplyCountdown = function (elt, args) {

        // var day="";
        // var month="";
        // var ampm="";
        // var ampmhour="";
        // var myweekday="";
        // var year="";
        // var myHours="";
        // var myMinutes="";
        // var mySeconds="";
        // mydate=new Date();
        // myweekday=mydate.getDay();
        // mymonth=parseInt(mydate.getMonth()+1)<10?"0"+(mydate.getMonth()+1):mydate.getMonth()+1;
        // myday= mydate.getDate();
        // myyear= mydate.getYear();
        // myHours = mydate.getHours();
        // myMinutes = mydate.getMinutes();
        // if (eval(myMinutes) < 10) {myMinutes="0"+myMinutes}
        // mySeconds = parseInt(mydate.getSeconds())<10?"0"+mydate.getSeconds():mydate.getSeconds();
        // year=(myyear > 200) ? myyear : 1900 + myyear;
        // if(myweekday == 0)
        //     weekday=" 星期日 ";
        // else if(myweekday == 1)
        //     weekday=" 星期一 ";
        // else if(myweekday == 2)
        //     weekday=" 星期二 ";
        // else if(myweekday == 3)
        //     weekday=" 星期三 ";
        // else if(myweekday == 4)
        //     weekday=" 星期四 ";
        // else if(myweekday == 5)
        //     weekday=" 星期五 ";
        // else if(myweekday == 6)
        //     weekday=" 星期六 ";

        // countdown.innerHTML=year+"年"+mymonth+"月"+myday+"日 "+myHours+":"+myMinutes+":"+mySeconds+" "+weekday;
        // setTimeout("setTime()",1000);
        //datetime.innerText=myHours+":"+myMinutes+":"+mySeconds;
        var parameters = extend({
                year: 2015,
                month: 6,
                day: 28,
                hours: 0,
                minutes: 0,
                seconds: 0,
                words: {
                    year: 'year',
                    month: 'month',
                    day: 'day',
                    tmp1: 'tmp1',
                    hours: 'hours',
                    tmp2: 'tmp2',
                    minutes: 'minutes',
                    tmp3: 'tmp3',
                    seconds: 'seconds',
                    pluralLetter: 's'
                },
                plural: true,
                inline: false,
                enableUtc: true,
                onEnd: function () {
                    return;
                },
                refresh: 1000,
                inlineClass: 'simply-countdown-inline',
                sectionClass: 'simply-section',
                amountClass: 'simply-amount',
                wordClass: 'simply-word',
                zeroPad: false
            }, args),
            interval,
            now,
            years,
            months,
            days,
            tmp1,
            hours,
            minutes,
            seconds,
            cd = document.querySelectorAll(elt);


        Array.prototype.forEach.call(cd, function (countdown) {
            var fullCountDown = createElements(parameters, countdown),
                refresh;

            refresh = function () {
                var 
                    yearWord,
                    monthWord,
                    dayWord,
                    hourWord,
                    minuteWord,
                    secondWord;

                now = new Date();
                years = now.getFullYear();
                months = now.getMonth();
                days = now.getDate();
                hours = now.getHours();
                minutes = now.getMinutes();
                seconds = now.getSeconds();

                yearWord = parameters.words.year;
                monthWord = parameters.words.month;
                dayWord = parameters.words.day;
                hourWord = parameters.words.hours;
                minuteWord = parameters.words.minutes;
                secondWord = parameters.words.seconds;        

                // fullCountDown.years.amount.textContent = years;
                // fullCountDown.years.word.textContent = yearWord;

                // fullCountDown.months.amount.textContent = parseInt(months+1)<10 ? "0" + months : months+1;
                // fullCountDown.months.word.textContent = monthWord;

                // fullCountDown.days.amount.textContent = parseInt(days+1)<10 ? "0"+ days : days;
                // fullCountDown.days.word.textContent = dayWord;

                // fullCountDown.tmp1.amount.textContent = "|";

                fullCountDown.hours.amount.textContent = hours;
                fullCountDown.hours.word.textContent = hourWord;

                //fullCountDown.tmp2.amount.textContent = ":";
                fullCountDown.minutes.amount.textContent =  eval(minutes)<10 ? '0' + minutes : minutes;
                fullCountDown.minutes.word.textContent = minuteWord;

                //fullCountDown.tmp3.amount.textContent = ":";
                fullCountDown.seconds.amount.textContent = parseInt(seconds)<10 ? "0" + seconds : seconds;
                fullCountDown.seconds.word.textContent = secondWord;

            };

            // Refresh immediately to prevent a Flash of Unstyled Content
            refresh();
            interval = window.setInterval(refresh, parameters.refresh);
        });
    };

    exports.simplyCountdown = simplyCountdown;
}(window));

/*global $, jQuery, simplyCountdown*/
if (window.jQuery) {
    (function ($, simplyCountdown) {
        'use strict';

        function simplyCountdownify(el, options) {
            simplyCountdown(el, options);
        }

        $.fn.simplyCountdown = function (options) {
            return simplyCountdownify(this.selector, options);
        };
    }(jQuery, simplyCountdown));
}
