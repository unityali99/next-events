import { useRouter } from "next/router";
import { useState } from "react";
import { months } from "../utils/months";
import { boxShadow } from "../utils/styles";

const Filter = () => {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const router = useRouter();

  const handleFilter = () => {
    router.push(`/${year}/${month}`);
  };
  return (
    <div
      className="row justify-content-center align-items-center mx-auto my-3"
      style={{ ...boxShadow, width: "40%" }}
    >
      <select
        onChange={(e) => setYear(e.target.value)}
        className="w-25 m-3 form-control form-control-lg"
      >
        <option selected disabled>
          Select a year
        </option>
        <option>2022</option>
        <option>2021</option>
      </select>
      <select
        onChange={(e) => {
          setMonth(e.target.value);
        }}
        className="w-25 m-3 form-control form-control-lg"
      >
        <option selected disabled>
          Select a month
        </option>
        {months.map((value, index) => (
          <option value={index + 1} key={index}>
            {value}
          </option>
        ))}
      </select>
      <button
        disabled={year && month ? false : true}
        className="btn btn-primary"
        style={{ width: "10rem" }}
        onClick={handleFilter}
      >
        Search
      </button>
    </div>
  );
};

export default Filter;
