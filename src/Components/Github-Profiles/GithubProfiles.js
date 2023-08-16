import './GithubProfiles.css';
import React, { useState, useRef} from 'react';
import defaultProfileImg from './assets/profile.jpg';
// import html2canvas from 'html2canvas';
import DomToImage from 'dom-to-image';
import { saveAs } from 'file-saver';

const GithubProfiles = () => {

  const [searchValue, setSearchValue] = useState('');

  const [profileImg, setProfileImg] = useState(defaultProfileImg);
  const [name, setName] = useState('Name');
  const [username, setUsername] = useState('Username');
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  const [repositories, setRepositories] = useState();
  const [profileUrl, setProfileUrl] = useState();


  const searchBtn = async () => {

    try {
      const response = await fetch(`https://api.github.com/users/${searchValue}`);
      const userData = await response.json();

      setProfileImg(userData.avatar_url);
      setName(userData.name);
      setUsername(userData.login);
      setFollowers(userData.followers);
      setFollowings(userData.following);
      setRepositories(userData.public_repos);
      setProfileUrl(userData.html_url);

      setSearchValue('');

    } catch (error) {
      console.error('Error fetching GitHub user Data', error);
    }
  }

  // const cardRef = useRef(null);

  // const handleDownload = () => {
  //   html2canvas(cardRef.current).then((canvas) => {
  //     canvas.toBlob((blob) => {
  //       saveAs(blob, 'profile_card.jpg');
  //     });
  //   });
  // };

  const cardRef = useRef(null);

  const handleDownload = () => {
    if (!cardRef.current) {
      return;
    }

    DomToImage.toBlob(cardRef.current).then((blob) => {
      saveAs(blob, 'profile_card.jpg');
    });
  };


  return (
    <>
      <div className="card-container">
        <div className="search">
          <input type="search" value={searchValue} placeholder='Search github user' onChange={(e) => setSearchValue(e.target.value)} />
          <button onClick={searchBtn}>Search</button>
        </div>
        <div className="card"  ref={cardRef}>
          <img src={profileImg} alt="profile" />
          <p>{name}</p>
          <p>{username}</p>
          <div className='about'>
            <div><span>Repositories</span><span>{repositories}</span></div>
            <div><span>Followers</span><span>{followers}</span></div>
            <div><span>Followng</span><span>{followings}</span></div>
          </div>
          <div className='buttons'>
            <button onClick={() => { window.open(profileUrl, '_blank'); }}>View Profile</button>
            <button onClick={handleDownload}>Download Card</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default GithubProfiles
