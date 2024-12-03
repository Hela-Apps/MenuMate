import { useState, useEffect } from "react";
import ApiHandler from "../../services/menucategory";
import DataTable from "react-data-table-component";
import MenuCategoryCreate from "../../components/menucategory/create";
import EditModal from "../../components/menucategory/editmodal";
import HyperHeader from "@/components/ui/hyperui/header";
import HyperFooter from "@/components/ui/hyperui/footer";

const MenuCategoryPage = () => {
  const [api] = useState(new ApiHandler());
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.getAll();
      setApiData(data);
      console.log(data);
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
  }, [api]);

  const handleDataAdded = () => {
    fetchData(); // Refresh data after new data is added
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <HyperHeader />
      <div className="container max-w-screen-lg mx-auto">
        <MenuCategoryCreate onDataAdded={handleDataAdded} />
        <div className="bg-white border border-1 rounded-lg shadow relative m-10">
          <DataTable
            columns={columns}
            data={apiData}
            pagination
            progressPending={loading}
            progressComponent={
              <div className="w-36 h-36 border-8 rounded-full border-t-lime-400 animate-spin" />
            }
          />
        </div>
      </div>
      <HyperFooter />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        categoryData={selectedCategory}
        onCategoryUpdated={fetchData}
      />
    </>
  );
};

export default MenuCategoryPage;
