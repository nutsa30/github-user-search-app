



import LocationIcon from '../../assets/icon-location.svg';
import TwitterIcon from '../../assets/icon-twitter.svg';
import WebsiteIcon from '../../assets/icon-website.svg';
import CompanyIcon from '../../assets/icon-company.svg';
import React from 'react';


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

type SelectedUser = GithubUser | null;

interface MainPageProps {
  selectedUser: SelectedUser; 
}


const MainPage:React.FC<MainPageProps>= ({selectedUser}) => {
  const joinedDate = selectedUser?.created_at ? new Date(selectedUser.created_at).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : "15 July 2011";
  return (
    
      

     <div className="main-page">
  
       <img
         className="main-page-image"
         src={selectedUser?.avatar_url ||"https://octodex.github.com/images/original.png" } 
         alt="Octocat profile"
         />
  
  
  
  
     <div className="main-page-info">
         <div className="main-page-name">
          <h2>
            <span className='main-name-span' >{selectedUser?.login|| "The octocat"}</span>
            <span className="main-page-name-span">{selectedUser?.name|| "The octocat"}</span>
          </h2>
        <span className="main-span">Joined {joinedDate}
      
        </span>
        </div>
         
  
  
         <p className='main-p'>{selectedUser?.bio || "This profile has no bio"}</p>
  
        <div className="info-with-footer">

         <div className="account-people">
             <h5 className="repos">Repos <span className="repos-span">{selectedUser?.public_repos||8}</span></h5>
            <h5 className="followers">Followers <span className="followers-span">{selectedUser?.followers || 3928}</span></h5>
          <h5 className="followings">Following <span className="followings-span">{selectedUser?.following || 9}</span></h5>
           </div>


           <div className="footer">
           <span><img src={LocationIcon} alt="" />{selectedUser?.location || " San Francisco"} </span>
          <span><img src={TwitterIcon} alt="" />{selectedUser?.twitter_username||" Not Avaliable"} </span>
          <a 
  href={selectedUser?.html_url || "https://github.blog"} 
  target="_blank" 
  rel="noopener noreferrer"
  className="website-link"
  
>
  <img src={WebsiteIcon} alt="" />
  {selectedUser?.html_url || " https://github.blog"}
</a>

          <span><img src={CompanyIcon} alt="" />{selectedUser?.company || " @github"}</span>
           </div>



        </div>
       </div>
    </div>
  );
};

export default MainPage;




