import React, {FC} from 'react';
import styled from 'styled-components/native';

const Card: FC<{style?: any}> = ({style}) => <Root style={style} />;

const Root = styled.View`
  width: 100%;
  background-color: red;
  height: 180px;
  border-radius: 10px;
  margin: 5px 0;
`;

export default Card;
