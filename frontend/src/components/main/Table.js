import React, {useEffect} from "react"
import store from "../../storage/storage";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import '../../index.css'
import {Button} from "primereact/button";


function Table(props) {

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    return<div >
        <DataTable id="result_table" value={props.results} paginator rows={10}
                   paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
            <Column field="x" header="x" filterMaxLength={5}/>
            <Column field="y" header="y" filterMaxLength={5}/>
            <Column field="r" header="r" filterMaxLength={5}/>
            <Column field="result" header="result"/>
        </DataTable>
    </div>
}
export default Table