import { useState, useEffect } from "react";
import ItemService from "../../services/item";
import ItemCreate from "@/components/item/create";
import EditItemModal from "@/components/item/editmodal";
import RootLayout from "@/components/layout";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";


const ItemCreatePage = () => {
  const [api] = useState(new ItemService());
  const [items, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDataAdded = () => {
    fetchData(); // Refresh data after new data is added
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.getAll();
      const sortedData = data.sort((a, b) => b.Id - a.Id);
    setApiData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [api]);

  const handleEdit = (row) => {
    setIsEditModalOpen(true);
    setSelectedItem(row);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const columns = [
    { name: "Code", selector: (row) => row.code },
    { name: "Name", selector: (row) => row.name },
    {name:"Category",selector: (row) => row.category.name},
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleEdit(row)}
        >
          Edit
        </button>
      ),
    },
  ];

  
  return (
    <>
    <RootLayout>
        <ItemCreate onDataAdded={handleDataAdded} />
        <div className="card">
            <DataTable value={items} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}  sortField="id" sortOrder={-1} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code" sortable style={{ width: '20%' }}></Column>
                <Column field="name" header="Name" sortable style={{ width: '20%' }}></Column>
                {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ width: '20%' }}></Column> */}
                 <Column field="category.name" header="Category" sortable style={{ width: '20%' }}></Column>
                <Column field="id" header="Edit" sortable style={{ width: '20%' }}></Column> 
            </DataTable>
        </div>
      
      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        itemData={selectedItem}
        onItemUpdated={fetchData}
      />
      </RootLayout>
    </>
  );
};
export default ItemCreatePage;
