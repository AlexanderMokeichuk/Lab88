import Layout from './UI/components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import NotFound from './UI/components/NotFound/NotFound.tsx';
import Register from './features/Users/Register.tsx';
import Login from './features/Users/Login.tsx';
import Posts from './features/Posts/Posts.tsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Posts />} />
        <Route path={'/add-post'} element={<h1>posts</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
