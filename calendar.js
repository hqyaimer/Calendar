(function($) {
    'use serict';
    var Calendar = function(element, options) {
        this.$element = $(element);
        this.element = element;
        this.init(options);
    };
    Calendar.prototype = {
        $element: null,
        $reference: null,
        element: null,
        choose: null,
        title: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
        date: new Date(),
        ndate: null,
        cdate: null,
        gridh: null,
        fontsize: null,
        init: function(options) {
            $.extend(true, this, options);
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0);
            this.ndate = this.date;
            if (!this.$reference) this.$reference = this.$element;
            this.rander();
            var element = this.$element;
            var date = this.date;
            element.find('.calendar-backbtn').click(function() {
                var data = element.data('calendar');
                data.ndate = data.date;
                data.rander();
                data.chooseDate(data.date);
                element.find('.calendar-backbtn').css('display', 'none');
            });
            element.find('.calendar-prevbtn').click(function() {
                var data = element.data('calendar');
                if (data.ndate.getMonth() == 0) {
                    data.ndate = new Date(data.ndate.getFullYear() - 1, 11, 1, 0, 0, 0);
                } else {
                    data.ndate = new Date(data.ndate.getFullYear(), data.ndate.getMonth() - 1, 1, 0, 0, 0);
                }
                data.rander();
            });
            element.find('.calendar-nextbtn').click(function() {
                var data = element.data('calendar');
                if (data.ndate.getMonth() == 11) {
                    data.ndate = new Date(data.ndate.getFullYear() + 1, 0, 1, 0, 0, 0);
                } else {
                    data.ndate = new Date(data.ndate.getFullYear(), data.ndate.getMonth() + 1, 1, 0, 0, 0);
                }
                data.rander();
            });
            element.find('.calendar-date').change(function() {
                console.log($(this).val());
                var date = new Date(Date.parse($(this).val()));
                var data = element.data('calendar');
                data.ndate = date;
                data.rander();
                data.chooseDate(date);
            });
            this.chooseDate(this.date);
        },
        rander: function() {
            var height = this.$reference.height();
            var gridh = (height - 134.5) / 6;
            this.gridh = gridh + 'px';
            var tfs = this.gridh - 25;
            this.fontsize = tfs > 8 ? tfs + 'px' : 8 + 'px'; //td内边距
            this.fontsize = tfs < 36 ? tfs + 'px' : 36 + 'px'; //td内边距
            $('.calendar-date').val(this.ndate.format('yyyy-MM-dd'));
            var fdate = $('.calendar-fdate').attr("data-format");
            $('.calendar-fdate').html(this.ndate.format(fdate));
            var element = this.$element;
            var table = element.find('.calendar-table');
            if (table.length > 0) {
                table.html("");
            } else {
                element.append('<div class="calendar-table"></div>');
                table = element.find('.calendar-table');
            }
            //console.log(this.date);
            var cdate = this.date;
            var date = this.ndate;
            var tdate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
            var nextmonth = date.getMonth() + 1 > 11 ? 0 : date.getMonth() + 1;
            var html = "<table><thead><tr>";
            for (var i = 0; i < 7; i++) {
                html += "<th>" + this.title[i] + "</th>";
            }
            html += "</tr></thead>"
            html += "<body><tr>";
            var day = tdate.getDay() == 0 ? 6 : tdate.getDay() - 1;
            for (var i = 0; i < day; i++) {
                var temp = new Date(tdate.getTime());
                temp.setDate(tdate.getDate() - (day - i));
                html += '<td class="prevtd" data-date="' + temp.format('yyyy-MM-dd') + '" style="font-size:' + this.fontsize + ';height:' + this.gridh + ';">' + temp.getDate() + '</td>';
            }
            var rowcount = 1;
            do {
                if (this.cdate && tdate.getTime() == this.cdate.getTime()) {
                    html += '<td class="currtd active" data-date="' + tdate.format('yyyy-MM-dd') + '" style="font-size:' + this.fontsize + ';height:' + this.gridh + ';">' + tdate.getDate() + '</td>';
                }else{
                    html += '<td class="currtd" data-date="' + tdate.format('yyyy-MM-dd') + '" style="font-size:' + this.fontsize + ';height:' + this.gridh + ';">' + tdate.getDate() + '</td>';
                }
                if (tdate.getDay() == 0) {
                    html += "</tr><tr>";
                    rowcount++;
                }
                tdate.setDate(tdate.getDate() + 1);
            } while (tdate.getMonth() != nextmonth);
            var tday = tdate.getDay() == 0 ? 6 : tdate.getDay() - 1;
            var max = rowcount < 6 ? 14 : 7;
            for (var i = tday; i < max; i++) {
                html += '<td class="nexttd" data-date="' + tdate.format('yyyy-MM-dd') + '" style="font-size:' + this.fontsize + ';height:' + this.gridh + ';">' + tdate.getDate() + '</td>';
                if (tdate.getDay() == 0) {
                    html += "</tr><tr>";
                }
                tdate.setDate(tdate.getDate() + 1);
            }
            html += "</tr></body></table>";
            table.append(html);
            var parent = this;
            table.find('td.currtd').click(function(e) {
                var sdate = $(this).attr('data-date');
                var tdate = new Date(Date.parse(sdate));
                parent.chooseDate(tdate);
            });
            table.find('td.prevtd,td.nexttd').click(function(e) {
                var sdate = $(this).attr('data-date');
                var tdate = new Date(Date.parse(sdate));
                parent.setDate(tdate);
                parent.chooseDate(tdate);
            });
        },
        setDate: function(tdate) {
            var date = this.date;
            if (typeof tdate == 'string') date = new Date(Date.parse(tdate));
            if (typeof tdate == 'object') date = tdate;
            this.ndate = date;
            this.rander();
        },
        chooseDate: function(tdate) {
            var date = this.date;
            if (typeof tdate == 'string') date = new Date(Date.parse(tdate));
            if (typeof tdate == 'object') date = tdate;
            date.setHours(0);
            this.cdate = date;
            var element = this.$element;
            var cdate = this.date;
            var table = element.find('.calendar-table');
            var tds = table.find('td');
            var item = null;
            $.each(tds, function() {
                var sdate = $(this).attr('data-date');
                if (sdate) {
                    var tdate = new Date(Date.parse(sdate));
                    tdate.setHours(0);
                    if (tdate.getTime() == date.getTime()) {
                        item = $(this);
                        table.find('td').removeClass('active');
                        $(this).addClass('active');
                        if (tdate.getTime() == cdate.getTime()) {
                            element.find('.calendar-backbtn').css('display', 'none');
                        } else {
                            element.find('.calendar-backbtn').css('display', 'block');
                        }
                        $('.calendar-date').val(tdate.format('yyyy-MM-dd'));
                        return;
                    }
                }
            });
            if (this.choose) this.choose(item);
        }
    }
    $.fn.calendar = function(option, e) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('calendar'),
                options = (typeof option == 'object') && option;
            if (!data) $this.data('calendar', data = new Calendar($this, options));
            if (typeof option == 'string') data[option].call(data, e);
        });
    }
    $.fn.calendar.Constructor = Calendar;
})(jQuery);
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //ÔÂ·Ý
        "d+": this.getDate(), //ÈÕ
        "h+": this.getHours(), //Ð¡Ê±
        "m+": this.getMinutes(), //·Ö
        "s+": this.getSeconds(), //Ãë
        "q+": Math.floor((this.getMonth() + 3) / 3), //¼¾¶È
        "S": this.getMilliseconds() //ºÁÃë
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}