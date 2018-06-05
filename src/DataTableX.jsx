let items = {
    initialKey: 'age',
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

function TableCell(props) {
    let value = props.value;
    return (
        <td>{value}</td>
    )
}

function TableRow(props) {
    let item = props.item;
    let keys = props.keys;

    let TableCells = keys.map((key, index) => {
        if (key !== 'id') {
            return (
                <TableCell key={key} value={item[key]} />
            )
        }
    })

    return (
        <tr>
            {TableCells}
        </tr>
    )
}

function TableHead(props) {
    let keys = props.keys;
    console.log(keys);
    
    let TableHeadCells = keys.map((key, index) => {
        if (key !== 'id') {
            return (
                <td>{key}</td>
            )
        }
    })

    return (
        <tr>
            {TableHeadCells}
        </tr>
    )
}

function TableElement(props) {
    let items = props.items.data;

    let keys = Object.keys(items[0]);

    let TableRows = items.map((item, index) => {
        return (
            <TableRow key={item.id} keys={keys} item={item} />
        )
    })

    return (
        <table>
            <tbody>
                <TableHead keys={keys} />
                {TableRows}
            </tbody>
        </table>
    )
}

ReactDOM.render(<TableElement items={items} />, document.getElementById('root'));