import { Button, Layout, Menu, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import {
    HomeOutlined,
    UserOutlined,
    DollarOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { NavLink, Outlet, matchRoutes } from "react-router";
import { routes } from "./router";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    to: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label: <NavLink to={to}>{label}</NavLink>,
    } as MenuItem;
}
  
const items: MenuItem[] = [
    getItem('Главная', 'index', '/', <HomeOutlined />),
    getItem('Stacking', 'stacking', '/stacking', <DollarOutlined />),
    getItem('Профиль', 'profile', '/profile', <UserOutlined />),
    getItem('Инфо', 'info', '/info', <InfoCircleOutlined />),
];

function App() {
    const currentRoutes = matchRoutes(routes, location);
    // r.route.id -> Property 'id' does not exist
    // (r.route as any).id -> no error
    // TODO: fix later
    const currentRoutesIds = currentRoutes?.map((r) => (r.route as any).id);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider className="p-5 text-white">
                <Menu theme="dark" defaultSelectedKeys={currentRoutesIds} mode="inline" items={items} />
            </Sider>

            <Layout>
                <Header className="h-auto! p-5! text-white! flex justify-end">
                    <Button variant="solid" color="primary" onClick={() => false}>Войти</Button>
                </Header>

                <Content className="p-5">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App