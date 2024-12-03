import React,{ useState, useEffect } from "react";
import { useRouter } from "next/router";
import ItemService from "../../services/item";
import ApiHandler from "../../services/menucategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "primereact/checkbox";
import { generateCode } from "@/utils/codeGenerator";
import { AutoComplete } from "primereact/autocomplete";

const ItemCreate = ({ onDataAdded }) => {
  const router = useRouter();
  const [categories, setApiData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    active: false,
    categoryId: null,
  });

  const [api] = useState(new ItemService());
  const [menuService] = useState(new ApiHandler());
  const [errors, setErrors] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);


  useEffect(() => {
    setCode();
  }, []);

  useEffect(() => {
    fetchData();
  }, [menuService]);

  const fetchData = async () => {
    try {
      const data = await menuService.getAll();
      setApiData(data.filter((x) => x.active == true));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const setCode = async () => {
    const tableId = (await getIndexCount()) + 1;
    const code = await generateCode("ITM", tableId);
    setFormData((prevData) => ({
      ...prevData,
      code: code,
    }));
  };

  const searchItems = (event) => {
    let query = event.query.toLowerCase();
    let _filteredItems = [];

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        if (category.name.toLowerCase().includes(query)) {
            _filteredItems.push({ label: category.name, value: category.id });
        }
    }
    setFilteredItems(_filteredItems);
}


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      categoryId: selectedOption ? selectedOption.value : null,
    });
    setErrors({
      ...errors,
      categoryId: "",
    });
  };

  const notify = () => toast.success("Message sent!");

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      api.createData(formData).then((createdData) => {
        toast.success("Item Created!");
        onDataAdded();
        handleReset();
        setCode();
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const getIndexCount = async () => {
    try {
      const data = await api.getLastId();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      name: "",
      code: "",
      active: false,
      category: null,
    });
    setSelectedItem(null);
    setErrors({});
    fetchData();
    setCode();
  };

  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-12">
          <div className="card p-fluid">
            <ToastContainer />

            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Create Item</h3>
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="code">Code</label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="p-inputtext p-component"
                  data-pc-name="inputtext"
                  data-pc-section="root"
                  required=""
                  value={formData.code}
                  onChange={handleChange}
                  readOnly={true}
                />
              </div>
              <div className="field col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="p-inputtext p-component"
                  data-pc-name="inputtext"
                  data-pc-section="root"
                  placeholder="Name"
                  required=""
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="formgrid grid">
              <div className="field col-6">
                <label htmlFor="category">Category</label>
                <AutoComplete 
            value={selectedItem} 
            suggestions={filteredItems} 
            completeMethod={searchItems}
            virtualScrollerOptions={{ itemSize: 38 }} 
            field="label" 
            dropdown 
            placeholder= 'Select a category'
            onChange={(e) => {
              setSelectedItem(e.value);
              handleCategoryChange(e.value);
            }} 
        />
                {errors.categoryId && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.categoryId}
                  </p>
                )}
              </div>
            </div>
            <div className="formgrid grid">
              <div className="field col-6">
                <label htmlFor="active">
                  <Checkbox
                    checked
                    type="checkbox"
                    name="active"
                    id="active"
                    className="mr-2"
                    onChange={handleChange}
                  />
                  Active
                </label>
              </div>
            </div>
            <div className="formgrid grid">
              <div className="col-1 md:col-1">
                <button
                  aria-label="Danger"
                  class="p-button p-component "
                  data-pc-name="button"
                  data-pc-section="root"
                >
                  <span
                    class="p-button-label p-c"
                    data-pc-section="label"
                    onClick={handleSubmit}
                  >
                    Save
                  </span>
                </button>{" "}
              </div>
              <div className="col-1 md:col-1">
                <button
                  aria-label="Danger"
                  class="p-button p-component p-button-secondary"
                  data-pc-name="button"
                  data-pc-section="root"
                >
                  <span
                    class="p-button-label p-c"
                    data-pc-section="label"
                    onClick={handleReset}
                  >
                    Reset
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCreate;
