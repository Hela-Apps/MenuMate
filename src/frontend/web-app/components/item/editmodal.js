import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiHandler from "../../services/item";
import CategoryApiHandler from "../../services/menucategory"
import Select from "react-select";

const EditItemModal = ({ isOpen, onClose, itemData, onItemUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    active: false,
    id: null,
    categoryId: null
  });
  const [api] = useState(new ApiHandler());
  const [errors, setErrors] = useState({});
  const [apiData, setApiData] = useState([]);
  const [menuService] = useState(new CategoryApiHandler());

  useEffect(() => {
    setFormData(itemData);
  }, [itemData]);

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

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
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
      await api.updateData(formData);
      toast.success("Menu Category Updated!");
      onItemUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
    }
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

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white border border-1 rounded-lg shadow relative m-10">
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Edit Category</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="code"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Code
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                  value={formData.code}
                  readOnly
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
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
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Category
                </label>
                <Select
                  id="category"
                  name="category"
                  options={apiData.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  value={apiData.category}
                  onChange={handleCategoryChange}
                  placeholder="Select a category"
                  className="border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400"
                />
                {errors.categoryId && (
                  <p className="text-sm text-red-600 mt-1">{errors.categoryId}</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="active"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  <input
                    type="checkbox"
                    name="active"
                    id="active"
                    className="mr-2"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                  Active
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-between p-6 border-t border-gray-200 rounded-b">
            <button
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleSubmit}
            >
              Update
            </button>
            <button
              className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditItemModal;
