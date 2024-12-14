import { useContext, useState } from "react";
import { DataApiContext } from "../api/DataApiProvider";
import { districts, regions } from "./Address";

const Header = () => {
  const { data, setSearch } = useContext(DataApiContext);
  const [searchText, setSearchText] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const filterData = (text, car, region, district) => {
    return data.filter((item) => {
      const nameMatch =
        text === "" ||
        item.familiyasi.toLowerCase().includes(text.toLowerCase()) ||
        item.ismi.toLowerCase().includes(text.toLowerCase()) ||
        item.otasining_ismi.toLowerCase().includes(text.toLowerCase());

      const carMatch =
        car === "" ||
        car === "hammasi" ||
        item.avto_ulov.toLowerCase() === car.toLowerCase();

      const regionMatch =
        region === "" ||
        region === "hammasi" ||
        item.yashash_joyi.includes(region);

      const districtMatch =
        district === "" ||
        district === "hammasi" ||
        item.yashash_joyi.includes(district);

      return nameMatch && carMatch && regionMatch && districtMatch;
    });
  };

  const handleChange = (e) => {
    const text = e.target.value.trim();
    setSearchText(text);
    setSearch(filterData(text, selectedCar, selectedRegion, selectedDistrict));
  };

  const handleSelectCar = (e) => {
    const car = e.target.value;
    setSelectedCar(car);
    setSearch(filterData(searchText, car, selectedRegion, selectedDistrict));
  };

  const handleSelectRegion = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedDistrict("");
    setSearch(filterData(searchText, selectedCar, region, ""));
  };

  const handleSelectDistrict = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSearch(filterData(searchText, selectedCar, selectedRegion, district));
  };

  return (
    <div className="p-4 bg-gray-100 border-b flex gap-2 justify-between items-end lg:items-center xl:container xl:mx-auto lg:flex-row flex-col">
      <div className="flex justify-between items-center w-full lg:w-[60%] gap-1 ">
        <h2 className="text-xl font-bold text-gray-800">
          {"Hodimlar Ma'lumotlari"}
        </h2>
        <div className="w-[55%] min-w-[180px]">
          <input
            type="text"
            placeholder="Qidirish..."
            className="border-none outline-none px-4 py-2 rounded-md w-full shadow"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-3">
        {/* Car selection */}
        <select
          className="outline-none border-none py-2 px-4 rounded-md shadow cursor-pointer"
          onChange={handleSelectCar}
          value={selectedCar}
        >
          <option disabled value={""}>
            Mashina
          </option>
          <option value={"hammasi"}>Hammasi</option>
          <option value={"bor"}>Bor</option>
          <option value={"yo'q"}>{"Yo'q"}</option>
        </select>

        {/* Regions selection */}
        <select
          className="outline-none border-none py-2 px-4 rounded-md shadow cursor-pointer"
          onChange={handleSelectRegion}
          value={selectedRegion}
        >
          <option value="" disabled>
            Viloyatlar
          </option>
          <option value="hammasi">Hammasi</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        {/* District selection */}
        <select
          className="outline-none border-none py-2 px-4 rounded-md shadow cursor-pointer"
          onChange={handleSelectDistrict}
          value={selectedDistrict}
        >
          <option value="" disabled>
            Tumanlar
          </option>
          <option value="hammasi">Hammasi</option>
          {selectedRegion &&
            selectedRegion != "hammasi" &&
            districts[0][selectedRegion].map((district, i) => (
              <option key={i} value={district}>
                {district}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
