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

storiesOf('Input', module)
  .add('All kinds of Inputs', () => (
    <ThemeProvider theme={theme}>
        <div>
            <Row>
                <Input
                    onDataChanged={(input) => {
                        console.log(input);
                    }}
                />
            </Row>
            <Row>
                <Input secondary
                    onDataChanged={(input) => {
                        console.log(input);
                    }}
                />
            </Row>
            <Row>
                <Input
                    type='number'
                    placeholder='Please input positive number which is large than 10'
                    validator={[{
                        validate: (data) => data > 0,
                        errorMessage: 'Input number must be positive'
                    }, {
                        validate: (data) => data > 10,
                        errorMessage: 'Input number must be larger than 10'
                    }]}
                    onDataChanged={(input) => {
                        console.log(input);
                    }}
                />
            </Row>
            <Row>
                <Input
                    type='password'
                    secondary
                    placeholder='Password'
                />
            </Row>
        </div>
    </ThemeProvider>
  ));
