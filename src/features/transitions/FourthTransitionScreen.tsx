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

type Props = StackScreenProps<RootStackParamList, 'FourthTransition'>;

const transition = (
  <Transition.Together>
    <Transition.In type={'fade'} />
    <Transition.Out type={'fade'} />
  </Transition.Together>
);

const FourthTransitionScreen: FC<Props> = () => {
  const ref = useRef<TransitioningView>(null);
  const [dark, toggleDark] = useState(false);

  const toggle = (isDark: boolean) => {
    toggleDark(isDark);
    ref.current && ref.current.animateNextTransition();
  };

  return (
    <Root>
      <Button title={'toggle'} onPress={() => toggle(!dark)} />
      <Wrapper>
        <TransitionView ref={ref} transition={transition}>
          {dark && <DarkBg />}
          <Card style={[dark && {backgroundColor: 'white'}]} />
        </TransitionView>
      </Wrapper>
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
`;
const Wrapper = styled.View`
  flex: 1;
`;
const DarkBg = styled.View`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const TransitionView = styled(Transitioning.View)`
  flex: 1;
  padding: 15px;
`;

export default FourthTransitionScreen;
