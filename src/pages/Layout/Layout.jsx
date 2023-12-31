import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import LayoutRouter from './Layout.router';
import { isMobileScreen } from '../../utilities';

const { Content } = Layout;

const AppLayout = () => {
  const mobileScreen = isMobileScreen();
  const [display, setDisplay] = useState(false);

  const handleDisplayChange = () => {
    setDisplay(!display);
  };
  return (
    <div className="w-full h-[100vh] overflow-hidden">
      <Layout className="!h-full">
        <Content>
          <Header
            mainHeader="true"
            handleDisplayChange={handleDisplayChange}
            display={display}
          />
          <Layout>
            {!mobileScreen ? (
              <Sidebar />
            ) : (
              display && <Sidebar handleDisplayChange={handleDisplayChange} />
            )}
            <Content className="min-h-[180px] overflow-x-scroll">
              {(!mobileScreen || (mobileScreen && !display)) && (
                <section className="max-h-[100vh] h-[100vh]">
                  <LayoutRouter />
                </section>
              )}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};

export default AppLayout;
