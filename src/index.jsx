import React         from "react";
import ReactDOM      from 'react-dom';
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-root/dist/styles/ag-grid.css';
import 'ag-grid-root/dist/styles/theme-fresh.css';

//..............................................................................
var rowData = generateRowData();
//..............................................................................

//..............................................................................
function generateRowData()
{
    var count = 50;
    var newRowData = [];

    while(count--)
    {
        newRowData.push({id: 'item-' + count, type: Math.floor(Math.random() * 100)});
    }

    return newRowData;
}
//..............................................................................

//..............................................................................
class MyApp extends React.Component
{
    constructor()
    {
        super();

        this.state =
        {
            quickFilterText : null,
            columnDefs:
            [
                {field: 'id'  , headerName:'Id'  },
                {field: 'type', headerName:'Type'}
            ]
        };

        this.onGridReady       = this.onGridReady      .bind(this);
        this.onRefreshData     = this.onRefreshData    .bind(this);
        this.onQuickFilterText = this.onQuickFilterText.bind(this);
    }

    onGridReady(params)
    {
        window.api       = this.api       = params.api;
        window.columnApi = this.columnApi = params.columnApi;
    }

    onQuickFilterText(event)
    {
        this.setState({quickFilterText: event.target.value});
    }

    onRefreshData()
    {
        rowData = generateRowData();
        this.forceUpdate();
    }

    render()
    {
        var topHeaderTemplate =
        (
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                <button onClick={this.onRefreshData}>Refresh Data</button>
                <input type="text" onChange={this.onQuickFilterText} placeholder="Filter..."/>
            </div>
        );

        var gridTemplate =
        (
            <div style={{height: 400}} className="ag-fresh">
                <AgGridReact
                    onGridReady={this.onGridReady}
                    quickFilterText={this.state.quickFilterText}
                    columnDefs={this.state.columnDefs}
                    rowData={rowData}
                    enableColResize="true"
                    enableSorting="true"
                    enableFilter="true"
                    floatingFilter="true"
                    suppressScrollOnNewData="true"
                />
            </div>
        );

        return <div style={{width: '1024px'}}>
            <div style={{padding: '4px'}}>
                {topHeaderTemplate}
                {gridTemplate}
            </div>
        </div>;
    }
}
//..............................................................................

//..............................................................................
document.addEventListener('DOMContentLoaded', function()
{
    ReactDOM.render
    (
        React.createElement(MyApp),
        document.getElementById('myAppContainer')
    );
});
//..............................................................................