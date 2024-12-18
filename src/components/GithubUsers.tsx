

import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainPage from './MainPage';
import { SearchBar } from './SearchBar';




interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User';
  user_view_type: 'public';
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}








export const GithubUsers: React.FC = () => {
  const [users, setUsers] = useState<GithubUser[]>([]); 
  const [filteredUsers, setFilteredUsers] = useState<GithubUser[]>([]); 
  const [selectedUser, setSelectedUser] = useState<GithubUser |null>(null); 
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
        
        selectedUser={selectedUser}
      />
  )}
      
    </div>
  );
}



