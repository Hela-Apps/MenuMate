import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ApiHandler from "../../services/menucategory";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import 'tailwindcss/tailwind.css';
import { generateCode } from "@/utils/codeGenerator";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

const MenuCategoryCreate = ({ onDataAdded }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    active: false,
  });

  const [api] = useState(new ApiHandler());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCode();
  }, []);

  const setCode = async () => {
    const tableId = (await getIndexCount()) + 1;
    const code = await generateCode("CAT", tableId);
    setFormData((prevData) => ({
      ...prevData,
      code: code,
    }));
  };

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

  const notify = () => toast.success("Message sent!");

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
      api.createData(formData).then((createdData) => {
        toast.success("Menu Category Created!");
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
      name: "",
      code: "",
      active: false,
    });
    setErrors({});
    setCode();
  };

  return (
    <div className="grid">
      <div className="col-12 md:col-12">
        <div className="card p-fluid">
          <ToastContainer />

          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3>Create Category</h3>
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
                readOnly={true}
              />
            </div>
            <div className="field col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="p-inputtext p-component"
                data-pc-name="inputtext"
                data-pc-section="root"
                required=""
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="active">
                <Checkbox
                  checked
                  type="checkbox"
                  name="active"
                  id="active"
                  className="mr-2"
                  value={formData.active}
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
  );
};

export default MenuCategoryCreate;
