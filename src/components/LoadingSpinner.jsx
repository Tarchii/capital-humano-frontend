import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from '../utils/constants';

const LoadingSpinner = ({ style }) => {
  return (
    <StyledLoadingSpinner style={style}>
      <LoadingOutlined />
    </StyledLoadingSpinner>
  );
};

const StyledLoadingSpinner = styled.div`
  color: ${theme.primary};
  font-size: 40px;
  width: 100%;
  text-align: center;
`;

export default LoadingSpinner;
