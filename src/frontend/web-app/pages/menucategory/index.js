import React from "react";
import MenuCategoryCreate from "../../components/menucategory/create";
import { useState, useEffect } from "react";
import ApiHandler from "../../services/menucategory";
import DataTable from "react-data-table-component";
import EditModal from "@/components/menucategory/editmodal";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'; 
import RootLayout from '@/components/layout';
import { Column } from 'primereact/column';


const MenuCategoryPage = () => {
  const [categoryServer] = useState(new ApiHandler());
  const [categoryData,setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.getAll();
      setCategory(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const columns = [
    { name: "Code", selector: (row) => row.code },
    { name: "Name", selector: (row) => row.name },
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

  useEffect(() => {
    fetchData();
  }, [categoryServer]);

  const handleDataAdded = () => {
    fetchData(); // Refresh data after new data is added
  };

  const handleEdit = (row) => {
    setIsEditModalOpen(true);
    setSelectedCategory(row);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
   // setSelectedCategory(null);
  };

  return (
    <>
    <React.StrictMode>
     <RootLayout>

    
      <div className="container max-w-screen-lg mx-auto">
        <MenuCategoryCreate onDataAdded={handleDataAdded} />
        <div className="card">
            <DataTable value={categoryData} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}  sortField="id" sortOrder={-1} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code" sortable style={{ width: '20%' }}></Column>
                <Column field="name" header="Name" sortable style={{ width: '20%' }}></Column>
                {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ width: '20%' }}></Column> */}
                 {/* <Column field="category.name" header="Category" sortable style={{ width: '20%' }}></Column> */}
               {/* <Column field="quantity" header="Quantity" sortable style={{ width: '20%' }}></Column> */}
            </DataTable>
        </div>

        {/* <div className="bg-white border border-1 rounded-lg shadow relative m-10">
          <DataTable
            columns={columns}
            data={apiData}
            pagination
            progressPending={loading}
            progressComponent={
              <div class="w-36 h-36 border-8 rounded-full border-t-lime-400 animate-spin" />
            }
          />
        </div> */}
      </div>
     
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        categoryData={selectedCategory}
        onCategoryUpdated={fetchData}
      />
      </RootLayout>
      </React.StrictMode>
    </>
  );
};

export default MenuCategoryPage;
