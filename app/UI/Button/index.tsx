import React, { PureComponent, ReactChildren } from 'react';
import styled, { withTheme } from 'styled-components';

import Spinner from '../Spinner';

const LoadingWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    color: black;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonStyled = styled.button`
    position: relative;
    display: inline-block;
    border: 2px solid;
    border-radius: 5px;
    padding: 8px 17px;
    cursor: pointer;
    font-size: large;
    margin: 5px;
    opacity: ${(p) => p.disabled ? 0.5 : 1};
    min-width: 100px;
`;

const createNormalBtn = (color : string, hover : string, disabled : boolean, loading : boolean) => {
    return (
        ButtonStyled.extend`
            color: ${(p) => !loading ? p.theme.BACKGROUND : color};
            border-color: ${color};
            background-color: ${color};
            cursor: ${disabled && 'not-allowed'};
            ${!disabled && `
                &:hover {
                    background-color: ${hover};
                    border-color: ${hover};
                }
            `}

        `
    );
};
const createGhostBtn = (color : string, hover : string, disabled : boolean, loading : boolean) => {
    return (
        ButtonStyled.extend`
            color: ${!loading ? color : 'transparent'};
            border-color: transparent;
            cursor: ${disabled && 'not-allowed'};
            ${!disabled && `
                &:hover {
                    color: ${hover};
                }
            `}
        `
    );
};

const Button = (props : {
    children? : any,
    primary? : boolean,
    secondary? : boolean,
    warning? : boolean,
    ghost? : boolean,
    disabled? : boolean,
    onClick? : () => void,
    loading? : boolean,
    theme,
}) => {
    const { secondary, ghost, warning, disabled, theme, loading, onClick } = props;
    const { PRIMARY, SECONDARY, SECONDARY_HOVER, PRIMARY_HOVER, RED, RED_DARK, BACKGROUND } = theme;
    const color = warning ? RED : (secondary ? SECONDARY : PRIMARY);
    const hover = warning ? RED_DARK : (secondary ? SECONDARY_HOVER : PRIMARY_HOVER);
    const create = ghost ? createGhostBtn : createNormalBtn;
    const isDisabled = disabled || loading;
    const Btn = create(color, hover, isDisabled, loading);
    return (
        <Btn
            disabled={isDisabled}
            onClick={() => { if (!isDisabled && onClick) { onClick(); } }}
        >
            {props.children}
            {loading && (
                <LoadingWrapper>
                    <Spinner color={ghost ? color : BACKGROUND} />
                </LoadingWrapper>
            )}
        </Btn>
    );
};

export default withTheme(Button);
