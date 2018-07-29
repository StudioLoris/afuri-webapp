import React, { PureComponent } from 'react';
import styled, { StyledFunction } from 'styled-components';
import apiService from '@/service/api';

const wraper : StyledFunction<{
    src? : string,
} & React.HTMLProps<HTMLDivElement>> = styled.div;

const Image = wraper`
    position: relative;
    background-image: url(${(p) => p.src});
    background-position: center center;
    background-size: cover;
    border: 1px solid black;
    width: 100px;
    height: 100px;
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
    uploading : boolean;
}

export default class ImageUploader extends PureComponent<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            hover: false,
            uploading: false,
        };
    }

    public render() {
        const { url, hover, uploading } = this.state;
        return (
          <Image
            src={url}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
            onClick={this.upload}
          >
            {(!uploading && (!url || hover)) && <span>Click to Upload</span>}
            {uploading && <span>Uploading...</span>}
            <Uploader
                type='file'
                onChange={this.upload}
            />
          </Image>
        );
    }

    private toggleHover = () => { this.setState({ hover: !this.state.hover });};

    private upload = async (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            this.setState({ uploading: true }, async () => {
                const url = await apiService.imgurUpload(file);
                if (url) {
                    this.setState({ url, uploading: false });
                }
            });
        }
    }
}
