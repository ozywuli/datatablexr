(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"/mnt/c/wamp64/www/projects/datatablex-react/src/DataTableX.jsx":[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var items = {
    initialKey: 'age',
    initialReverse: false,
    data: [{
        id: 0,
        name: "ozy",
        ethnicity: "chinese",
        nationality: "american",
        age: 28,
        height: 70
    }, {
        id: 1,
        name: 'edson',
        ethnicity: 'mestizo',
        nationality: 'brazilian',
        age: 31,
        height: 72
    }, {
        id: 2,
        name: "ricky",
        ethnicity: "spanish",
        nationality: "spanish",
        age: 27,
        height: 75
    }, {
        id: 3,
        name: "risa",
        ethnicity: "japanese",
        nationality: "japanese",
        age: 24,
        height: 65
    }]

    /**
     * 
     */
};
var TableElement = function (_React$Component) {
    _inherits(TableElement, _React$Component);

    function TableElement(props) {
        _classCallCheck(this, TableElement);

        var _this = _possibleConstructorReturn(this, (TableElement.__proto__ || Object.getPrototypeOf(TableElement)).call(this, props));
        // console.log('constructor');


        _this.initialKey = props.items.initialKey;
        _this.items = props.items.data;
        _this.itemKeys = Object.keys(_this.items[0]);

        _this.state = {
            items: _this.items,
            reversed: false,
            activeKey: null
        };

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleResetClick = _this.handleResetClick.bind(_this);
        return _this;
    }

    /**
     * 
     */


    _createClass(TableElement, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            // console.log('componentWillMount');
            this.setState({
                items: this.initData(this.items),
                activeKey: this.initialKey
            });
        }

        /**
         * 
         */

    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
        // console.log('componentDidMount');


        /**
         * 
         */

    }, {
        key: "initData",
        value: function initData(props) {
            var initData = void 0;

            if (this.initialKey) {
                initData = this.sortedData(this.initialKey);
            } else {
                initData = this.items;
            }

            return initData;
        }

        /**
         * 
         */

    }, {
        key: "clonedData",
        value: function clonedData(data) {
            return data.slice(0);
        }

        /**
         * 
         */

    }, {
        key: "sortedData",
        value: function sortedData(key) {
            var _this2 = this;

            // console.log('sortedData');
            var thisClonedData = this.clonedData(this.items);
            var sortedClonedData = thisClonedData.sort(function (a, b) {
                if (_this2.state.reversed) {
                    _this2.setState({ reversed: false });
                    return b[key] - a[key];
                } else {
                    _this2.setState({ reversed: true });
                    return a[key] - b[key];
                }
            });

            return sortedClonedData;
        }

        /**
         * 
         */

    }, {
        key: "handleState",
        value: function handleState(itemKey) {
            // console.log(this.sortedData(itemKey));
            this.setState({
                items: this.sortedData(itemKey),
                activeKey: itemKey
            });
        }

        /**
         * 
         */

    }, {
        key: "handleClick",
        value: function handleClick(itemKey) {
            this.handleState(itemKey);
        }

        /**
         * 
         */

    }, {
        key: "resetData",
        value: function resetData() {
            this.setState({
                activeKey: this.initialKey,
                items: this.items,
                reversed: false
            });
        }

        /**
         * 
         */

    }, {
        key: "handleResetClick",
        value: function handleResetClick() {
            this.resetData();
        }

        /**
         * 
         */

    }, {
        key: "render",
        value: function render() {
            // console.log('render');
            return React.createElement(
                "div",
                { className: "datatablex" },
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(TableHead, { activeKey: this.state.activeKey, items: this.items, itemKeys: this.itemKeys, handleClick: this.handleClick }),
                        React.createElement(TableRows, { activeKey: this.state.activeKey, items: this.state.items, itemKeys: this.itemKeys })
                    )
                ),
                React.createElement(ResetButton, { handleResetClick: this.handleResetClick })
            );
        }
    }]);

    return TableElement;
}(React.Component);

/**
 * 
 */


function setSortingClass(activeKey, sampleKey) {
    var className = '';

    if (activeKey === sampleKey) {
        className += 'is-sorting';
    } else {
        className = '';
    }

    return className;
}

/**
 * 
 */
function TableHead(props) {
    var itemKeys = props.itemKeys;
    var items = props.items;
    var sampleItem = items[0];

    var TableHeadCells = itemKeys.map(function (itemKey, index) {
        if (itemKey !== 'id') {
            return React.createElement(TableHeadCell, {
                key: itemKey,
                activeKey: props.activeKey,
                sampleKey: itemKey,
                sampleKeyValue: sampleItem[itemKey],
                handleClick: props.handleClick
            });
        }
    });

    return React.createElement(
        "tr",
        null,
        TableHeadCells
    );
}

/**
 * 
 */
function TableHeadCell(props) {
    var activeKey = props.activeKey;
    var sampleKey = props.sampleKey;
    var sampleKeyValue = props.sampleKeyValue;

    var TableHeadCellElement = void 0;

    if (isNaN(sampleKeyValue)) {
        TableHeadCellElement = sampleKey;
    } else {
        TableHeadCellElement = React.createElement(TableToggle, { sampleKey: sampleKey, handleClick: props.handleClick });
    }

    return React.createElement(
        "td",
        { className: setSortingClass(activeKey, sampleKey) },
        TableHeadCellElement
    );
}

/**
 * 
 */
function TableToggle(props) {
    var sampleKey = props.sampleKey;
    return React.createElement(
        "a",
        { href: "#", onClick: props.handleClick.bind(this, sampleKey) },
        sampleKey
    );
}

/**
 * 
 */
function TableRows(props) {
    var activeKey = props.activeKey;
    var items = props.items;
    var itemKeys = props.itemKeys;

    var tableRows = items.map(function (item, index) {
        return React.createElement(TableRow, { key: item.id, activeKey: activeKey, itemKeys: itemKeys, item: item });
    });

    return tableRows;
}

/**
 * 
 */
function TableRow(props) {
    var activeKey = props.activeKey;
    var item = props.item;
    var itemKeys = props.itemKeys;

    var tableCells = itemKeys.map(function (itemKey, index) {
        if (itemKey !== 'id') {
            return React.createElement(TableCell, { key: itemKey, activeKey: activeKey, itemKey: itemKey, itemValue: item[itemKey] });
        }
    });

    return React.createElement(
        "tr",
        null,
        tableCells
    );
}

/**
 * 
 */
function TableCell(props) {
    var activeKey = props.activeKey;
    var itemKey = props.itemKey;
    var itemValue = props.itemValue;

    return React.createElement(
        "td",
        { className: setSortingClass(activeKey, itemKey) },
        itemValue
    );
}

/**
 * Reset table data to show defaults
 */

/**
 * Reset button component
 */
function ResetButton(props) {
    return React.createElement(
        "a",
        { href: "#", onClick: props.handleResetClick },
        "reset"
    );
}

ReactDOM.render(React.createElement(TableElement, { items: items }), document.getElementById('root'));

},{}]},{},["/mnt/c/wamp64/www/projects/datatablex-react/src/DataTableX.jsx"])

//# sourceMappingURL=DataTableX.js.map
