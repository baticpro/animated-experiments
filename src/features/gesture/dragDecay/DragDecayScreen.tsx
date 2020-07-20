import React, {FC, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import Animated, {
  add,
  cond,
  event,
  set,
  eq,
  Value,
  Clock,
  block,
  decay,
  startClock,
  stopClock,
  not,
  clockRunning,
} from 'react-native-reanimated';
import Card from '../../../shared/ui/Card';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {LayoutChangeEvent} from 'react-native';
import {diffClamp} from 'react-native-redash';

const withDecay = (
  value: Value<number>,
  gestureState: Value<State>,
  velocity: Value<number>,
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity,
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    deceleration: 0.991,
  };

  const offset = new Value(0);

  return block([
    cond(
      eq(gestureState, State.END),
      [
        set(offset, add(offset, value)),
        decay(clock, state, config),
        cond(
          eq(state.finished, 1),
          [
            set(offset, state.position),
            stopClock(clock),
            set(state.time, 0),
            set(state.finished, 0),
          ],
          [cond(not(clockRunning(clock)), startClock(clock))],
        ),
      ],
      [set(state.position, add(offset, value))],
    ),
    state.position,
  ]);
};

const DragDecayScreen: FC = () => {
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const {state, translationX, translationY, velocityX, velocityY} = useMemo(
    () => ({
      state: new Value(State.UNDETERMINED),
      translationX: new Value(0),
      translationY: new Value(0),
      velocityX: new Value(0),
      velocityY: new Value(0),
    }),
    [],
  );

  const onGestureEvent = event([
    {nativeEvent: {state, translationX, translationY, velocityX, velocityY}},
  ]);

  const onLayout = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;
    setLayout({width, height});
  };

  const translateX = diffClamp(
    withDecay(translationX, state, velocityX),
    0,
    layout.width - CARD_WIDTH,
  );
  const translateY = diffClamp(
    withDecay(translationY, state, velocityY),
    0,
    layout.height - CARD_HEIGHT,
  );

  return (
    <Root onLayout={onLayout}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}>
        <AnimatedRotateCard
          style={{
            transform: [{translateX}, {translateY}],
          }}>
          <Card style={{flex: 1}} />
        </AnimatedRotateCard>
      </PanGestureHandler>
    </Root>
  );
};

const CARD_WIDTH = 250;
const CARD_HEIGHT = 180;

const Root = styled.View`
  flex: 1;
`;
const RotateCard = styled.View`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
`;
const AnimatedRotateCard = Animated.createAnimatedComponent(RotateCard);

export default DragDecayScreen;
