import MenuCategoryCreate from "../../components/menucategory/create";
import { useState, useEffect } from "react";
import ApiHandler from "../services/menucategory";
import 'tailwindcss/tailwind.css';
const MenuCategoryPage = () => {
    const [api] = useState(new ApiHandler());
    const [apiData, setApiData] = useState([]);

  
        const fetchData = async () => {
            try {
                const data = await api.getAll();
                setApiData(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        useEffect(() => {
        fetchData();
    }, [api]);

    const handleDataAdded = () => {
        debugger
        fetchData(); // Refresh data after new data is added
    };
    return (
        <>
            <MenuCategoryCreate onDataAdded={handleDataAdded}/>
            <div class="flex min-h-screen items-center justify-center">
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-xl">
                    <thead>
                        <tr class="bg-blue-gray-100 text-gray-700">
                            <th class="py-3 px-4 text-left">Id</th>
                            <th class="py-3 px-4 text-left">Name</th>
                            <th class="py-3 px-4 text-left">Active</th>
                            <th class="py-3 px-4 text-left"></th>
                            {/* Add more table headers as needed */}
                        </tr>
                    </thead>
                    <tbody class="text-blue-gray-900">
                        {apiData.map((item, index) => (
                            <tr key={index} class="border-b border-blue-gray-200">
                                <td class="py-3 px-4">{item.id}</td>
                                <td class="py-3 px-4">{item.name}</td>
                                <td class="py-3 px-4">{item.active?'active':'inactive'}</td>
                                <td href="#" class="font-medium text-blue-600 hover:text-blue-800">edit</td>
                                {/* Display other properties */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    );
};

export default MenuCategoryPage;
