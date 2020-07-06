import React, {FC} from 'react';
import styled from 'styled-components/native';

const Card: FC = () => <Root />;

const Root = styled.View`
  width: 100%;
  background-color: red;
  height: 250px;
  border-radius: 10px;
`;

export default Card;
