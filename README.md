Calendar 日期控件
===========================

#### 存放于Div的阳历控件，依赖于JQuery、Bootstrap

开始使用
-------

### 引入依赖

#### 引入JQuery

`<script src="http://code.jquery.com/jquery-3.4.1.min.js" type="text/javascript"></script>`

#### 引入Bootstrap

```
<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
```

#### 引入Calendar

```
<script src="./calendar.js" type="text/javascript" charset="utf8"></script>`
<link rel="stylesheet" href="./calendar.css" />
```

### 编写Html

```
<div class="calendar-container">
    <div class="calendar-title">
        <div>
            <input class="calendar-date" type="date">
        </div>
        <div>
            <div class="calendar-prevbtn"><span class="glyphicon glyphicon-chevron-left"></span></div>
            <div class="calendar-fdate" data-format="yyyy年MM月"></div>
            <div class="calendar-nextbtn"><span class="glyphicon glyphicon-chevron-right"></span></div>
            <div style="clear:both;"></div>
        </div>
        <div>
            <button class="calendar-backbtn btn btn-default">
                回到今天
            </button>
        </div>
        <div style="float: none;clear: both;"></div>
    </div>
</div>
```

### 编写Javascript

```js
$('.calendar-container').calendar();
```

Options 选项
-------

`$reference` - 设置参考元素,日历会按照参考元素自适应宽高,默认为设置的容器。

`title` - 设置标题,默认`['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']`。

Event 事件
-------

`choose` - 选中事件,默认为null。

Function 功能
-------

`rander` - 重绘。

`setDate` - 参数 `tdate` ,支持 `string` 和 `Date` 类型传入,切换到日期月份,但不选中。

`chooseDate` - 参数 `tdate` ,支持 `string` 和 `Date` 类型传入,选中这个日期。

Example 示例
-------

```js
$('.calendar-container').calendar({
	title: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
	choose:function(item){
    	console.log(item.attr("data-date"));
    }
});
```