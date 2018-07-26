import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { theme } from '../../app/UI';
import Button from '../../app/UI/Button';
import Input from '../../app/UI/Input';

const Row = styled.div`
    display: flex;
    align-items: center;
`;

class ControllableInput extends React.PureComponent {
    state = {
        value: 123,
        value2: undefined
    };

    render() {
        const { value , value2 } = this.state;
        return (
            <ThemeProvider theme={theme}>
                <>
                    <Input
                        placeholder='Control Element'
                        value={value}
                        onChange={(value) => {
                            this.setState({ value });
                        }}
                    />
                    <Input
                        secondary
                        placeholder='Uncontrol Element'
                        onChange={(value2) => {
                            this.setState({ value2 });
                        }}
                    />
                    <div>Value of controllable element: {value}</div>
                    <div>Value of uncontrollable element: {value2}</div>
                </>
            </ThemeProvider>
        );
    }
}

storiesOf('Input', module)
  .add('All kinds of Inputs', () => (
    <ThemeProvider theme={theme}>
        <div>
            <Row>
                <Input
                    onChange={(input) => {
                        console.log(input);
                    }}
                />
            </Row>
            <Row>
                <Input
                    secondary
                    onChange={(input) => {
                        console.log(input);
                    }}
                />
            </Row>
            <Row>
                <Input
                    title='Age'
                    type='number'
                    placeholder='Please input positive number which is large than 10'
                    validator={[{
                        validate: (data) => data > 0,
                        errorMessage: 'Input number must be positive'
                    }, {
                        validate: (data) => data > 10,
                        errorMessage: 'Input number must be larger than 10'
                    }]}
                    onChange={(input) => {
                        console.log(input);
                    }}
                />
                <Input
                    title='Password'
                    type='password'
                    secondary
                    validator={[{
                        validate: (data : string) => data.length > 6,
                        errorMessage: 'Password length must be larger than 6 characters'
                    }]}
                />
            </Row>
            <Row>
                <Input
                    secondary
                    title='Email'
                    placeholder='user@somewhere.com'
                />
            </Row>
        </div>
    </ThemeProvider>
  ))
  .add('Input with value', () => (<ControllableInput />));
