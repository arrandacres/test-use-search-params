import { usePersonTableSearchParams } from "../hooks/usePersonTableSearchParams";

const PersonTable = () => {
  const [searchParams] = usePersonTableSearchParams();

  console.log(searchParams);
  return <h1>Person Table</h1>;
};

export default PersonTable;
