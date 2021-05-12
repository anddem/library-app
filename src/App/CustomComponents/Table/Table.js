import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

const DataCell = ({data}) => <td>{data ? data : "—"}</td>

DataCell.propTypes = {
    data: PropTypes.any
}

const BooleanCell = ({data}) => <td>{data ? "Да" : "Нет"}</td>

BooleanCell.propTypes = {
    data: PropTypes.bool
}

const TableCell = ({data}) => typeof(data) === 'boolean' ? <BooleanCell data={data}/> : <DataCell data={data}/>

TableCell.propTypes = {
    data: PropTypes.any
}

const TableHeadRow = ({rowData}) => <tr>{rowData.map(header => <th key={header}>{header}</th>)}</tr>

TableHeadRow.propTypes = {
    rowData: PropTypes.array
}

const TableHead = ({headers}) => <thead><TableHeadRow rowData={headers}/></thead>

TableHead.propTypes = {
    headers: PropTypes.array
}

const TableBodyRow = ({rowData, rowNum}) => <tr>{rowData.map((data, i) => <TableCell key={`${rowNum}_${i}_${data}`} data={data}/>)}</tr>

TableBodyRow.propTypes = {
    rowData: PropTypes.array,
    rowNum: PropTypes.number
}

const TableBody = ({rows}) => {
    let body = []

    for (let i = 0; i < rows.length; i++) body.push(<TableBodyRow key={rows[i]} rowNum={i} rowData={rows[i]}/>)

    return <tbody>{body}</tbody>
}

TableBody.propTypes = {
    rows: PropTypes.array
}

const Table = data => {
    return (
        <table>
            <TableHead headers={data.columns}/>
            <TableBody rows={data.rows}/>
        </table>
    )
}

Table.propTypes = {
    data: PropTypes.object
}

export default Table