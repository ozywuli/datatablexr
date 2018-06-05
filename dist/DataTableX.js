(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"/mnt/c/wamp64/www/projects/datatablex-react/src/DataTableX.jsx":[function(require,module,exports){
"use strict";

var items = {
    initialKey: 'age',
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

    // function ListItem(props) {
    //     console.log(props);
    //     return <li>{props.value}</li>;
    // }

    // function ListItems(props) {
    //     const items = props.items.data;

    //     return (
    //         </ul>
    //             {
    //                 items.map( (item) => <ListItem key={item.name} value={item.name} /> )
    //             }
    //         </ul>
    //     );
    // }

    // ReactDOM.render(<ListItems items={items} />, document.getElementById('root'));

};function TableCell(props) {
    var value = props.value;
    return React.createElement(
        "td",
        null,
        value
    );
}

function TableRow(props) {
    var item = props.item;
    var keys = props.keys;

    var TableCells = keys.map(function (key, index) {
        if (key !== 'id') {
            return React.createElement(TableCell, { key: key, value: item[key] });
        }
    });

    return React.createElement(
        "tr",
        null,
        TableCells
    );
}

function TableHead(props) {
    var keys = props.keys;
    console.log(keys);

    var TableHeadCells = keys.map(function (key, index) {
        if (key !== 'id') {
            return React.createElement(
                "td",
                null,
                key
            );
        }
    });

    return React.createElement(
        "tr",
        null,
        TableHeadCells
    );
}

function TableElement(props) {
    var items = props.items.data;

    var keys = Object.keys(items[0]);

    var TableRows = items.map(function (item, index) {
        return React.createElement(TableRow, { key: item.id, keys: keys, item: item });
    });

    return React.createElement(
        "table",
        null,
        React.createElement(
            "tbody",
            null,
            React.createElement(TableHead, { keys: keys }),
            TableRows
        )
    );
}

ReactDOM.render(React.createElement(TableElement, { items: items }), document.getElementById('root'));

},{}]},{},["/mnt/c/wamp64/www/projects/datatablex-react/src/DataTableX.jsx"])

//# sourceMappingURL=DataTableX.js.map
