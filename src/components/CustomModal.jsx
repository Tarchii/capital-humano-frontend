import { Modal } from 'antd';
import styled from 'styled-components';
import { theme } from '../utils/constants';

const CustomModal = styled(Modal)`
  width: ${(props) => props.width || '65'}vw !important;

  @media screen and (max-width: 767px) {
    width: 90vw !important;
  }

  .ant-modal-content {
    border-radius: ${theme.radius};
  }

  .ant-modal-header {
    border-top-left-radius: ${theme.radius};
    border-top-right-radius: ${theme.radius};
  }

  .ant-alert {
    font-size: 17px;
    margin-bottom: 24px;
  }

  &.operation-modal {
    .ant-modal-header {
      background-color: ${theme.primary};
    }

    .ant-modal-title {
      color: ${theme.white};
      font-size: 17px;
      font-weight: 700;
    }

    .ant-modal-close-x {
      color: ${theme.white};
    }
  }

  &.agent-modal {
    .ant-modal-footer {
      text-align: center;

      button {
        font-size: 16px;
      }
    }
  }
`;

export default CustomModal;