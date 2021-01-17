import { Layout, Menu, Breadcrumb, Row } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  DashboardOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React ,{ useState } from 'react';
import '../static/css/index.css';
import Footer from '../components/GlobalFooter/index';

const Index: React.FC <{}> = () => {
  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed}
        onCollapse={(): void => {
          toggleMenu();
        }}
      >
        <div className="logo">
          logo area
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            DashBoard
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header 
          className="site-layout-background" 
          style={{ padding: 0 }} 
          // onClick={(): void => {
          //   toggleMenu();
          // }} 
        />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <Row align="middle" justify="center">
          <Footer />
        </Row>
      </Layout>
    </Layout>
  );
};

export default Index;