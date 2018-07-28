import React, { PureComponent } from 'react';
import styled, { StyledFunction } from 'styled-components';

const wraper : StyledFunction<{
    src? : string,
} & React.HTMLProps<HTMLDivElement>> = styled.div;

const Image = wraper`
    position: relative;
    background-image: url(${(p) => p.src});
    border: 1px solid black;
    width: 100px;
    height: 100px;
    &:hover {
        border: 2px solid black;
    }
`;

const Uploader = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

interface Props {
    url : string;
}
interface State {
    url : string;
    hover : boolean;
}

export default class ImageUploader extends PureComponent<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            hover : false,
        };
    }

    public render() {
        const { url, hover } = this.state;
        return (
          <Image
            src={url}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
            onClick={this.upload}
          >
            {(!url || hover) && <span>Click to Upload</span>}
            <Uploader type='file'/>
          </Image>
        );
    }

    private toggleHover = () => { this.setState({ hover: !this.state.hover });};

    private upload = () => {

    }
}
