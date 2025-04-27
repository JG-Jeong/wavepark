import React from 'react';
import styled from 'styled-components';
import WeatherTable from '../components/WeatherTable';

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
  text-align: center;
`;

const InfoSection = styled.section`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const MainPage = () => {
  return (
    <MainContainer>
      <Header>
        <Title>WavePark</Title>
      </Header>
      <WeatherTable />
      <InfoSection>
        {/* 다른 컨텐츠 */}
      </InfoSection>
    </MainContainer>
  );
};

export default MainPage; 