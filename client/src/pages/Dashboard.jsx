import React, { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // console.log(urlParams);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    } else {
      setTab('profile');
    }
  }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* sidebar */}
      <div className="">
        <DashSidebar/>
      </div>

      {/* profile */}
      {tab === 'profile' && <DashProfile/>}
      {tab === 'post' && <DashPosts/>}
      {tab === 'users' && <DashUsers/>}
    </div>
  )
}

export default Dashboard