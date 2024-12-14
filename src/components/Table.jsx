import { useContext } from "react";
import { DataApiContext } from "../api/DataApiProvider";

const Table = () => {
  const {data, isLoading, error, search} = useContext(DataApiContext)

 if (isLoading) {
   return (
     <div className="flex justify-center items-center h-screen">
       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
     </div>
   );
 }

 if (error) {
   return <div className="text-red-500 text-center p-4 text-xl">{error}</div>;
 }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-200">
              <tr>
                {[
                  "N",
                  "FISH",
                  "Yoshi",
                  "Manzil",
                  "Ish joyi",
                  "Tug'ilgan sana",
                  "Moshina",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {search.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="px-4 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {item.familiyasi} {item.ismi} {item.otasining_ismi} {"o'g'li"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{item.yoshi}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {item.yashash_joyi}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {item.ish_joyi}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {item.tugilgan_sana}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap capitalize">
                    {item.avto_ulov}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <div className="text-center text-gray-500 py-8 text-lg">
            {"Ma'lumotlar topilmadi"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
