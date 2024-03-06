import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; 
const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to='/aboutus'>About us</Link></Menu.Item>
        <Menu.Item key="3"><Link to='/news'>News</Link></Menu.Item>
        <Menu.Item key="4"><Link to='/contact'>Contact</Link></Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;