import search_icon from "../../Assets/search_icon.png";

const SearchBarComponent = ({ onSearch }) => {
  const handeInputChange = (e) => {
    console.log(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className="relative">
      <input
        type="text"
        className="h-[44px] w-96 pr-8 pl-16 rounded-lg z-0 hover:shadow focus:outline-none"
        placeholder="Search Class..."
        onChange={handeInputChange}
      />
      <div className="absolute top-3 left-5 cursor-pointer">
        <img src={search_icon} alt="search_icon" className="hover:w-5" />
      </div>
    </div>
  );
};

export default SearchBarComponent;
