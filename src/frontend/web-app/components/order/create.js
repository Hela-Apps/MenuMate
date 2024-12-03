import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ApiHandler from "../../services/order";
import ItemService from "../../services/item";
import { generateCode } from "@/utils/codeGenerator";
import AutoCompleteDropDown from "../ui/autocompletedropdown";

const OrderCreate = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    orderStatus: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      api.createData(formData).then((createdData) => {
        toast.success("Order Created!");
        onDataAdded();
        setCode();
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleReset = async (e) => {};

  const [api] = useState(new ApiHandler());
  const [itemService] = useState(new ItemService());
  const [ItemData, setItemData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCode();
  }, []);

  const setCode = async () => {
    const tableId = (await getIndexCount()) + 1;
    const code = await generateCode("ORD", tableId);
    setFormData((prevData) => ({
      ...prevData,
      code: code,
    }));
  };

  const orderTypes = [
    { id: 1, name: "Take Away" },
    { id: 2, name: "Dining" },
  ];

  const handleTypeChange = () => {};
  const handleItemChange = () => {};
  const getIndexCount = async () => {
    try {
      const data = await api.getLastId();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemService]);

  const fetchData = async () => {
    try {
      let itemNameList =[];
      const data = await itemService.getAll();
      const itemList = data.filter((x) => x.active == true);
      for (let item of itemList) {
       itemNameList.push({id:item.id,name: item.name + ' - ' + item.category.name});        
      }
      setItemData(itemNameList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-12">
          <div className="card p-fluid">
            <ToastContainer />

            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3>Create Order</h3>
            </div>
            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="code">Code </label>
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
                <label htmlFor="orderType">Order Type</label>
                <AutoCompleteDropDown
                  items={orderTypes}
                  placeHolder={"Select order type"}
                />
                {errors.categoryId && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.categoryId}
                  </p>
                )}
              </div>
            </div>
            <div className="formdrid grid">
              <div className="field col">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Item
                </label>
                <AutoCompleteDropDown
                  items={ItemData}
                  placeHolder={"Select item"}
                />
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

export default OrderCreate;
