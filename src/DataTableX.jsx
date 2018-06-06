let items = {
    initialKey: 'age',
    initialReverse: false,
    data: [
        {
            id: 0,
            name: "ozy",
            ethnicity: "chinese",
            nationality: "american",
            age: 28,
            height: 70
        },
        {
            id: 1,
            name: 'edson',
            ethnicity: 'mestizo',
            nationality: 'brazilian',
            age: 31,
            height: 72
        },
        {
            id: 2,
            name: "ricky",
            ethnicity: "spanish",
            nationality: "spanish",
            age: 27,
            height: 75
        },
        {
            id: 3,
            name: "risa",
            ethnicity: "japanese",
            nationality: "japanese",
            age: 24,
            height: 65
        }
    ]
}

/**
 * 
 */
class TableElement extends React.Component {
    constructor(props) {
        // console.log('constructor');
        super(props);

        this.initialKey = props.items.initialKey;
        this.items = props.items.data;
        this.itemKeys = Object.keys(this.items[0]);

        this.state = {
            items: this.items,
            reversed: false,
            activeKey: null,
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    /**
     * 
     */
    componentWillMount() {
        // console.log('componentWillMount');
        this.setState({
            items: this.initData(this.items),
            activeKey: this.initialKey
        })
    }

    /**
     * 
     */
    componentDidMount() {
        // console.log('componentDidMount');
    }

    /**
     * 
     */
    initData(props) {
        let initData;

        if (this.initialKey) {
            initData = this.sortedData(this.initialKey)
        } else {
            initData = this.items;
        }

        return initData;
    }

    /**
     * 
     */
    clonedData(data) {
        return data.slice(0);
    }

    /**
     * 
     */
    sortedData(key) {
        // console.log('sortedData');
        let thisClonedData = this.clonedData(this.items);
        let sortedClonedData = thisClonedData.sort((a, b) => {
            if (this.state.reversed) {
                this.setState({reversed: false})
                return b[key] - a[key];
            } else {
                this.setState({reversed: true})
                return a[key] - b[key];
            }
        });

        return sortedClonedData;
    }

    /**
     * 
     */
    handleState(itemKey) {
        // console.log(this.sortedData(itemKey));
        this.setState({
            items: this.sortedData(itemKey),
            activeKey: itemKey
        })
    }

    /**
     * 
     */
    handleClick(itemKey) {
        this.handleState(itemKey);
    }

    /**
     * 
     */
    resetData() {
        this.setState({
            activeKey: this.initialKey,
            items: this.items,
            reversed: false
        })
    }

    /**
     * 
     */
    handleResetClick() {
        this.resetData();
    }

    /**
     * 
     */
    render() {
        // console.log('render');
        return (
            <div className="datatablex">
                <table>
                    <tbody>
                        <TableHead activeKey={this.state.activeKey} items={this.items} itemKeys={this.itemKeys} handleClick={this.handleClick} />
                        <TableRows activeKey={this.state.activeKey} items={this.state.items} itemKeys={this.itemKeys} />
                    </tbody>
                </table>
                <ResetButton handleResetClick={this.handleResetClick} />
            </div>
        )
    }
}

/**
 * 
 */
function setSortingClass(activeKey, sampleKey) {
    let className = '';

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
    let itemKeys = props.itemKeys;
    let items = props.items;
    let sampleItem = items[0];
    
    let TableHeadCells = itemKeys.map((itemKey, index) => {
        if (itemKey !== 'id') {
            return (
                <TableHeadCell 
                    key={itemKey}
                    activeKey={props.activeKey}
                    sampleKey={itemKey} 
                    sampleKeyValue={sampleItem[itemKey]} 
                    handleClick={props.handleClick}
                />
            )
        }
    })

    return (
        <tr>
            {TableHeadCells}
        </tr>
    )
}

/**
 * 
 */
function TableHeadCell(props) {
    let activeKey = props.activeKey;
    let sampleKey = props.sampleKey;
    let sampleKeyValue = props.sampleKeyValue;

    let TableHeadCellElement;

    if (isNaN(sampleKeyValue)) {
        TableHeadCellElement = (sampleKey)
    } else {
        TableHeadCellElement = (<TableToggle sampleKey={sampleKey} handleClick={props.handleClick} />)
    }

    return (
        <td className={setSortingClass(activeKey, sampleKey)}>{TableHeadCellElement}</td>
    )
}

/**
 * 
 */
function TableToggle(props) {
    let sampleKey = props.sampleKey;
    return (
        <a href="#" onClick={props.handleClick.bind(this, sampleKey)}>{sampleKey}</a>
    )
}

/**
 * 
 */
function TableRows(props) {
    let activeKey = props.activeKey;
    let items = props.items;
    let itemKeys = props.itemKeys;

    let tableRows = items.map((item, index) => {
        return (
            <TableRow key={item.id} activeKey={activeKey} itemKeys={itemKeys} item={item} />
        )
    })

    return tableRows;
}

/**
 * 
 */
function TableRow(props) {
    let activeKey = props.activeKey;
    let item = props.item;
    let itemKeys = props.itemKeys;

    let tableCells = itemKeys.map((itemKey, index) => {
        if (itemKey !== 'id') {
            return (
                <TableCell key={itemKey} activeKey={activeKey} itemKey={itemKey} itemValue={item[itemKey]} />
            )
        }
    })

    return (
        <tr>
            {tableCells}
        </tr>
    )
}

/**
 * 
 */
function TableCell(props) {
    let activeKey = props.activeKey;
    let itemKey = props.itemKey;
    let itemValue = props.itemValue;

    return (
        <td className={setSortingClass(activeKey, itemKey)}>{itemValue}</td>
    )
}

/**
 * Reset table data to show defaults
 */

/**
 * Reset button component
 */
function ResetButton(props) {
    return (
        <a href="#" onClick={props.handleResetClick}>reset</a>
    )
}

ReactDOM.render(<TableElement items={items} />, document.getElementById('root'));