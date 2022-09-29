import { MagnifyingGlass } from "phosphor-react";

const Search = () => {
  return (
    <form className="flex items-center">
      <input
        className="w-full p-3 pr-10"
        aria-label="Search"
        placeholder="Search"
      />
      <button className="-ml-8">
        <MagnifyingGlass size={24} />
      </button>
    </form>
  );
};

export default Search;
