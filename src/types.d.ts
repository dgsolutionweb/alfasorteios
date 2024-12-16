declare module './pages/Home' {
  const Home: () => JSX.Element;
  export default Home;
}

declare module './pages/Register' {
  const Register: () => JSX.Element;
  export default Register;
}

declare module './pages/Admin' {
  const Admin: () => JSX.Element;
  export default Admin;
}

declare module './pages/Terms' {
  const Terms: () => JSX.Element;
  export default Terms;
}

declare module './components/Layout' {
  import { ReactNode } from 'react';
  interface LayoutProps {
    children: ReactNode;
  }
  const Layout: (props: LayoutProps) => JSX.Element;
  export default Layout;
} 