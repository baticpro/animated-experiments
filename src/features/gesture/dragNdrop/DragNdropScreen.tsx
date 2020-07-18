import React, {FC, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import Animated, {
  add,
  cond,
  event,
  set,
  eq,
  Value,
} from 'react-native-reanimated';
import Card from '../../../shared/ui/Card';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {LayoutChangeEvent} from 'react-native';
import {diffClamp} from 'react-native-redash';

const withOffset = (value: Value<number>, state: Value<State>) => {
  const offset = new Value(0);
  return cond(
    eq(state, State.END),
    set(offset, add(offset, value)),
    add(offset, value),
  );
};

const DragNdropScreen: FC = () => {
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const {state, translationX, translationY} = useMemo(
    () => ({
      state: new Value(State.UNDETERMINED),
      translationX: new Value(0),
      translationY: new Value(0),
    }),
    [],
  );

  const onGestureEvent = event([
    {nativeEvent: {state, translationX, translationY}},
  ]);

  const onLayout = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;
    setLayout({width, height});
  };

  console.log(layout);

  const translateX = diffClamp(
    withOffset(translationX, state),
    0,
    layout.width - CARD_WIDTH,
  );
  const translateY = diffClamp(
    withOffset(translationY, state),
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

export default DragNdropScreen;
