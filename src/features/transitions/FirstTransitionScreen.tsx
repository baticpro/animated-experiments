import React, {FC, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../Navigator';
import styled from 'styled-components/native';
import Card from '../../shared/ui/Card';
import Animated, {
  add,
  cond,
  eq,
  Extrapolate,
  interpolate,
  not,
  proc,
  set,
  startClock,
  useCode,
  Value,
} from 'react-native-reanimated';
import {useClock, useValue} from 'react-native-redash';
import {Button} from 'react-native';

type Props = StackScreenProps<RootStackParamList, 'FirstTransition'>;

const duration = 1000;
const runAnimation = proc(
  (
    startAnimation: Animated.Value<number>,
    clock: Animated.Clock,
    from: Animated.Value<number>,
    to: Animated.Value<number>,
    startTime: Animated.Value<number>,
    opacity: Animated.Node<number>,
  ) =>
    cond(eq(startAnimation, 1), [
      startClock(clock),
      set(from, opacity),
      set(to, not(opacity)),
      set(startTime, clock),
      set(startAnimation, 0),
    ]),
);

const FirstTransitionScreen: FC<Props> = () => {
  const [, setShow] = useState(false);
  const clock = useClock();

  const startTime = useValue(0);
  const from = useValue(0);
  const to = useValue(0);

  const startAnimation = new Value(1);
  const endTime = add(startTime, duration);

  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    () => runAnimation(startAnimation, clock, from, to, startTime, opacity),
    [startAnimation, clock, from, to, startTime, opacity],
  );

  return (
    <Container>
      <Animated.View style={{opacity}}>
        <Card />
      </Animated.View>
      <Button title={'toggle'} onPress={() => setShow((p) => !p)} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 15px;
`;

export default FirstTransitionScreen;
