import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ApiHandler from "../../pages/services/menucategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'tailwindcss/tailwind.css';


const MenuCategoryCreate = ({ onDataAdded }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    active: false,
  });

  const [api] = useState(new ApiHandler());

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const notify = () => toast.success("Message sent!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Do something with the form data, like sending it to an API endpoint
    console.log(formData);

    // For example, if you want to use fetch to send the data
    try {
      api
        .createData(formData)

        .then((createdData) => {
          console.log("Data created:", createdData);
          toast.success("Menu Category Created!");
          onDataAdded();
        });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="text-3xl font-bold underline">
              Create Menu Category
            </h2>
            <ToastContainer />
            <p className="text-3xl font-bold underline">
              Enter Your Vehicle Details here.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Vehicle Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="name">Name : </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="border border-red-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Active</label>
                        <input
                          type="checkbox"
                          name="active"
                          id="cbxActive"
                          value={formData.active}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuCategoryCreate;
