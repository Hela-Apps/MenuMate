import React from 'react';
import  { useState, useEffect } from 'react';
import ItemService from "../../services/item"; 
import { Column, ColumnFilterApplyTemplateOptions, ColumnFilterClearTemplateOptions, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { DataTable, DataTableExpandedRows, DataTableFilterMeta } from 'primereact/datatable';
import RootLayout from '@/components/layout';



const PresortDemo = () => {    
    const [itemService] = useState(new ItemService());
    const [products, setProducts] = useState([]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };
    useEffect(() => {
        itemService.getAll().then(data => setProducts(data));
      }, [itemService]);

    // useEffect(() => {
    //     ItemService.getAll().then(data => setProducts(data));
    // }, []);

    return (
        <React.StrictMode>
            <RootLayout>
        <div className="card">
            <DataTable value={products} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}  sortField="id" sortOrder={-1} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code" sortable style={{ width: '20%' }}></Column>
                <Column field="name" header="Name" sortable style={{ width: '20%' }}></Column>
                {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ width: '20%' }}></Column> */}
                 <Column field="category.name" header="Category" sortable style={{ width: '20%' }}></Column>
               {/* <Column field="quantity" header="Quantity" sortable style={{ width: '20%' }}></Column> */}
            </DataTable>
        </div>
       </RootLayout>
        </React.StrictMode>
       
    );
};
 export default PresortDemo;       