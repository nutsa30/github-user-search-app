

import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainPage from './MainPage';
import { SearchBar } from './SearchBar';

interface User {
  id: number;
  login: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  location?: string;
  twitter_username?: string;
  blog?: string;
  company?: string;
}

export const GithubUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); 
  const [selectedUser, setSelectedUser] = useState<User | null>(null); 
  const [error, setError] = useState<string | null>(null); 
  const [isSearching, setIsSearching] = useState(false); 
  useEffect(() => {
    const fetchUsers = async () => {
     const response = await fetch('https://api.github.com/users');
      const data = await response.json();
      setUsers(data);
      
    };
  
    fetchUsers();
  }, []);


  const fetchUserDetails = async (username: string) => {
   const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    setSelectedUser(data);
  
  };

  const handleSearch = (searchTerm: string) => {
    setIsSearching(true);
    if (searchTerm && typeof searchTerm === 'string') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = users.filter((user) =>
        user.login.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredUsers(results);


      if (results.length === 1) {
        fetchUserDetails(results[0].login);
      } 
      else {
        setError(null); 
      }
    }
  };

 

  return (
    <div className='main-box'>
      <Header />
      <SearchBar onSearch={handleSearch} error={error} />
      

      {isSearching && filteredUsers.length === 0 && !selectedUser ? (
    <p className="no-results-message">No results</p>
  ) : (
      <MainPage
        users={filteredUsers}
        onUserClick={fetchUserDetails}
        selectedUser={selectedUser}
      />
  )}
      
    </div>
  );
}
