

import { useState } from 'react';
import SearchIcon from '../../assets/icon-search.svg';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void; 
  error: string | null; 
}


export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm); 
  };


  return (
    <div className="search-bar">
      <span>
        <img src={SearchIcon} alt="Search" />
      </span>
      <input
        type="text"
        placeholder="Search Github username..."
        value={searchTerm}
        onChange={handleSearchChange} 
      />
      <button onClick={handleSearchClick}>Search</button>
  </div>
   
  );
};
        
