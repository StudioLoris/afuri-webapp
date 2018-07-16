import React, { PureComponent, ReactChildren } from 'react';
import styled, { withTheme, StyledFunction } from 'styled-components';

const Container = styled.div`
    width: 100%;
    min-width: 100px;
    margin: 5px;
`;

const wraper : StyledFunction<{
    focus : boolean,
    isError : boolean
} & React.HTMLProps<HTMLDivElement>> = styled.div;

const Wrapper = wraper`
    display: flex;
    height: ${(p) => p.theme.HEIGHT_UNIT}px;
    border-radius: 5px;
    border: 1px solid ${(p : any) => p.focus ? p.color : (p.isError ? p.color : '#CCC')};
    padding: 0 15px;
    align-items: center;
`;

const StyledInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
`;

const ErrorMessageArea = styled.div`
    text-align: right;
`;
const ErrorMessage = styled.div`
    color: ${(p) => p.theme.WARNING};
    font-size: small;
`;

const Title = styled.div`
    color: ${p => p.color};
    margin-right: 10px;
`;

interface Props extends React.HTMLProps<HTMLInputElement> {
    title? : string;
    primary? : boolean;
    secondary? : boolean;
    theme : any;
    validator? : Array<{
        validate : (data : string | number) => boolean;
        errorMessage : string;
    }>;
    onDataChanged? : (data : string | number) => void;

}

interface State {
    focus : boolean;
    data : string | number;
}

class Input extends React.PureComponent<Props, State> {

    public state = {
        focus: false,
        data: undefined,
    };

    public render() {
        const { secondary, theme, title } = this.props;
        const { PRIMARY, SECONDARY, WARNING } = theme;
        const { focus, data } = this.state;
        const { isError, messages } = this.validate();
        const color = isError ? WARNING : (secondary ? SECONDARY : PRIMARY);
        const props : any = this.props;
        return (
            <Container>
                <Wrapper focus={focus} color={color} isError={isError}>
                    {title && (
                        <Title color={color}>{title}</Title>
                    )}
                    <StyledInput
                        {...props}
                        onFocus={this.styleActive}
                        onBlur={this.styleInactive}
                        onChange={this.updateData}
                    />
                </Wrapper>
                {(isError && (messages.length)) && (
                    <ErrorMessageArea>
                        {messages.map((msg : string, index : number) => (
                            <ErrorMessage key={index}>{msg}</ErrorMessage>
                        ))}
                    </ErrorMessageArea>
                )}
            </Container>
        );
    }

    private styleActive = () => this.setState({ focus: true });
    private styleInactive = () => this.setState({ focus: false });
    private updateData = (e : React.FormEvent<EventTarget>) => {
        this.setState({ data: (e.target as HTMLInputElement).value }, () => {
            const { onDataChanged } = this.props;
            if (onDataChanged) {
                onDataChanged(this.state.data);
            }
        });
    }

    private validate() {
        const { validator } = this.props;
        const { data } = this.state;
        let isError = false;
        const messages = [];
        if (!data) {
            return { isError: false, messages };
        }
        (validator || []).forEach(({ validate, errorMessage }) => {
            if (validate) {
                const pass = validate(data);
                if (!pass && errorMessage) {
                    messages.push(errorMessage);
                }
                isError = isError || !pass;
            }
        });
        return { isError, messages };
    }
}

export default withTheme(Input);
