import React, {FC, useState} from 'react';
import styled from 'styled-components/native';
import Card from '../../shared/ui/Card';
import {Button} from 'react-native';
import Animated, {interpolate, multiply} from 'react-native-reanimated';
import {transformOrigin, useTransition} from 'react-native-redash';

const ThirdTransitionScreen: FC = () => {
  const [toggled, setToggled] = useState(0);
  const transition = useTransition(toggled);

  return (
    <Root>
      <Wrapper>
        {[0, 1, 2].map((i) => {
          const direction = interpolate(i, {
            inputRange: [0, 1, 2],
            outputRange: [-1, 0, 1],
          });

          const rotate = multiply(
            direction,
            interpolate(transition, {
              inputRange: [0, 1],
              outputRange: [0, Math.PI / 6],
            }),
          );

          return (
            <AnimatedRotateCard
              style={{
                transform: transformOrigin({x: -100, y: 1}, {rotate}),
              }}>
              <Card key={i} />
            </AnimatedRotateCard>
          );
        })}
      </Wrapper>
      <Button title={'toggle'} onPress={() => setToggled(toggled ^ 1)} />
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
  padding: 30px;
`;
const RotateCard = styled.View`
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const AnimatedRotateCard = Animated.createAnimatedComponent(RotateCard);
const Wrapper = styled.View`
  flex: 1;
`;

export default ThirdTransitionScreen;
