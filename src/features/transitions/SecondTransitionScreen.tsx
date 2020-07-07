import React, {FC, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../Navigator';
import styled from 'styled-components/native';
import Card from '../../shared/ui/Card';
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';
import {Button} from 'react-native';

type Props = StackScreenProps<RootStackParamList, 'SecondTransition'>;

type LayoutType = {
  container: any;
  child?: any;
};

const rowLayout: LayoutType = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  child: {
    width: '32%',
    height: 100,
  },
};

const columnLayout: LayoutType = {
  container: {
    flexDirection: 'column',
  },
};

const wrapLayout: LayoutType = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  child: {
    width: '49%',
    height: 150,
  },
};

const layouts = {
  row: rowLayout,
  column: columnLayout,
  wrap: wrapLayout,
};

const transition = (
  <Transition.Change delayMs={500} interpolation={'easeOut'} />
);

const SecondTransitionScreen: FC<Props> = () => {
  const ref = useRef<TransitioningView>(null);
  const [layout, setLayout] = useState<LayoutType>(layouts.column);

  const changeLayout = (newLayout: LayoutType) => {
    setLayout(newLayout);
    ref.current && ref.current.animateNextTransition();
  };

  return (
    <Root>
      <Wrapper>
        <Transitioning.View
          ref={ref}
          transition={transition}
          style={[layout.container]}>
          <Card style={layout.child} />
          <Card style={layout.child} />
          <Card style={layout.child} />
        </Transitioning.View>
      </Wrapper>
      <Button title={'row'} onPress={() => changeLayout(layouts.row)} />
      <Button title={'column'} onPress={() => changeLayout(layouts.column)} />
      <Button title={'wrap'} onPress={() => changeLayout(layouts.wrap)} />
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
  padding: 15px;
`;
const Wrapper = styled.View`
  flex: 1;
`;

export default SecondTransitionScreen;
