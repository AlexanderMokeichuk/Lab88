import React, { PropsWithChildren } from 'react';
import AppToolbar from '../AppToolbar/AppToolbar.tsx';
import { Container } from '@mui/material';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={{ background: 'black', minHeight: '100vh' }}>
      <header>
        <Container>
          <AppToolbar />
        </Container>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default Layout;
