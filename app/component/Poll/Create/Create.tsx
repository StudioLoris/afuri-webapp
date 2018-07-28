import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Input from '@/UI/Input';
import ImageUploader from '@/component/ImageUploader';

const Container = styled.div`
    padding: 20px;
`;

const Row = styled.div`
    display: flex;
    margin: 5px;
`;

interface Props {

}

interface State {
    maxVote : number;
    minVote : number;
    candidates : Array<any>;
}

export default class PollCreate extends PureComponent<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            maxVote: 1,
            minVote: 1,
            candidates: [{
                imageURL: '',
            }],
        };
    }

    public render() {
        const { maxVote, minVote, candidates } = this.state;
        return (
            <Container>
                <Row>
                    <Input
                        secondary
                        title='Title'
                    />
                </Row>
                <Row>
                    <Input
                        secondary
                        title='Description'
                    />
                </Row>
                <Row>
                    <Input
                        value={minVote}
                        secondary
                        title='Minimum Votes'
                        type='number'
                        onDataChanged={this.updateMinVote}
                    />
                    <Input
                        value={maxVote}
                        secondary
                        title='Maximum Votes'
                        type='number'
                        onDataChanged={this.updateMaxVote}
                    />
                </Row>
                <div>
                    {candidates.map((it, key) => {
                        const { imageURL } = it;
                        return <ImageUploader key={key} url={imageURL} />;
                    })}
                </div>
            </Container>
        );
    }

    private updateMaxVote = (maxVote : number) => {
        const { minVote } = this.state;
        if ((maxVote > 0) && (maxVote >= minVote)) {
            this.setState({ maxVote });
        }
    }
    private updateMinVote = (minVote : number) => {
        const { maxVote } = this.state;
        if ((minVote > 0) && (minVote <= maxVote)) {
            this.setState({ minVote });
        }
    }

}
