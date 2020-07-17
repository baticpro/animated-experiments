import React, {FC, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../../Navigator';
import {Button} from 'react-native';
import DotsIndicator from './ui/DotsIndicator';
import Animated, {
  block,
  clockRunning,
  cond,
  Easing,
  startClock,
  timing,
  Value,
  not,
  useCode,
  set,
  Clock,
  eq,
  stopClock,
  and,
} from 'react-native-reanimated';

type Props = StackScreenProps<RootStackParamList, 'Preloader'>;

const runTiming = (clock: Animated.Clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(1),
    duration: 1000,
    easing: Easing.linear,
  };

  return block([
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, cond(eq(state.position, 1), 0, 1)),
    ]),
    state.position,
  ]);
};

const PreloaderScreen: FC<Props> = () => {
  const [isPlaying, setPlaying] = useState(true);

  const {progress, clock, isPlayingValue} = useMemo(
    () => ({
      progress: new Value(0),
      clock: new Clock(),
      isPlayingValue: new Value<number>(1),
    }),
    [],
  );

  const toggle = () => setPlaying(!isPlaying);

  isPlayingValue.setValue(isPlaying ? 1 : 0);

  useCode(
    () =>
      block([
        cond(and(eq(isPlayingValue, 1), clockRunning(clock)), stopClock(clock)),
        cond(
          and(eq(isPlayingValue, 0), not(clockRunning(clock))),
          startClock(clock),
        ),
        set(progress, runTiming(clock)),
      ]),
    [],
  );

  return (
    <Root>
      <DotsIndicator progress={progress} />
      <Button title={isPlaying ? 'stop' : 'start'} onPress={toggle} />
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
  padding-bottom: 20px;
`;

export default PreloaderScreen;
