import React, {FC} from 'react';
import styled from 'styled-components/native';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';

const dots = [0, 1, 2];
const delta = 1 / dots.length;

type Props = {
  progress: Animated.Value<number>;
};

const DotsIndicator: FC<Props> = ({progress}) => (
  <Content>
    {dots.map((i) => {
      const start = i * delta;
      const end = start + delta;

      const scale = interpolate(progress, {
        inputRange: [start, end],
        outputRange: [1, 1.5],
        extrapolate: Extrapolate.CLAMP,
      });

      return <Dot key={i} style={{transform: [{scale}]}} />;
    })}
  </Content>
);

const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 50px;
`;
const Dot = styled(Animated.View)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: cadetblue;
`;

export default DotsIndicator;
