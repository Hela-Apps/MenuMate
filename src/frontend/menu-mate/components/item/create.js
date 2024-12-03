import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import ApiHandler from "../../pages/services/menucategory";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../../styles/Home.module.css";
import ApiHandlerItem from "../../pages/services/item";

const ItemCreate = ({ onDataAdded }) => {
  const router = useRouter(); 
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "52%",
      width: "30%",
    },
  };

  const [api] = useState(new ApiHandlerItem());
  const [categoryList, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: selectedCategory,
    active: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getAll();
        setData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      api
        .createData(formData)

        .then((createdData) => {
          console.log("Item created:", createdData);
          toast.success("Item Created!");
          onDataAdded();
        });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full h-full">
              <div className="text-center mb-5">
                <div className="text-900 text-3xl font-medium mb-3">
                  Item Create
                </div>
              </div>

              <div>
                <label
                  htmlFor="lblName"
                  className="block text-900 font-medium mb-2"
                >
                  Name
                </label>
                <InputText
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full mb-3"
                  value={formData.name}
                />

                <label
                  htmlFor="categoryId"
                  className="block text-900 font-medium mb-2"
                >
                  Category
                </label>
                <Dropdown
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.value)}
                  options={categoryList}
                  optionLabel="name"
                  editable
                  placeholder="Select a Category"
                  className="w-full mb-3"
                />

                <div className="flex align-items-center mb-5">
                  <Checkbox id="rememberme" className="mr-2" />
                  <label htmlFor="rememberme">Active</label>
                </div>
                <div className="flex gap-3 mt-3">
                  <Button
                    label="Save"
                    icon="pi pi-save"
                    className="flex-2 w-6 mb-3"
                  />
                  <Button
                    label="Reset"
                    icon="pi pi-undo"
                    className="flex-2 p-button w-6 mb-3"
                    severity="danger"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ItemCreate;
