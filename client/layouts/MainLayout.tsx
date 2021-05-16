import { Container } from '@material-ui/core';
import React from 'react';
import NavBar from '../components/NavBar';

const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar/>
      <Container style={{margin: '90px 0'}}>
        { children }
      </Container>
    </>
  )
}

export default MainLayout;
