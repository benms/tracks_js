import React from 'react'
import NavBar from '../components/NavBar';
import MainLayout from '../layouts/MainLayout';

const index = () => {
  return (
    <>
    <MainLayout>
      List of tracks
    </MainLayout>
    <div className="center">
      <h1>Welcome</h1>
      <h3>Best tracks</h3>
    </div>
    <style jsx>
      {`
        .center {
          margin-top: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}
    </style>
    </>
  );
}

export default index;
