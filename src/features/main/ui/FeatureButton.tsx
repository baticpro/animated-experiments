import React, {FC} from 'react';
import styled from 'styled-components/native';

type Props = {
  title: string;
  onPress: () => void;
};

const FeatureButton: FC<Props> = ({title, onPress}) => (
  <Root onPress={onPress}>
    <Title>{title}</Title>
  </Root>
);

const Root = styled.TouchableOpacity`
  padding: 10px;
  border: 1px solid #ddd;
`;
const Title = styled.Text``;

export default FeatureButton;
