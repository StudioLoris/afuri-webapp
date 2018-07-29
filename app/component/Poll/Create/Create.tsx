import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Input from '@/UI/Input';
import Button from '@/UI/Button';
import ImageUploader from '@/component/ImageUploader';

const Container = styled.div`
    padding: 20px;
`;

const Row = styled.div`
    display: flex;
    margin: 5px;
`;

const CandiateArea = styled.div`
    display: flex;
    margin: 5px;
    align-items: center;
    padding: 10px;
`;
const CadiateImageArea = styled.div`
    padding: 10px;
`;
const CadiateInfoArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

interface Candidate {
    imageURL? : string;
    title? : string;
    description? : string;
}

interface Props {

}

interface State {
    maxVote : number;
    minVote : number;
    candidates : Array<Candidate>;
}

export default class PollCreate extends PureComponent<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            maxVote: 1,
            minVote: 1,
            candidates: [],
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
                <Row>
                    <Button
                        ghost
                        onClick={this.addCandiate}
                    >
                        Add New Candidates
                    </Button>
                </Row>
                <div>
                    {candidates.map((it : Candidate, key) => {
                        const { imageURL } = it;
                        return (
                            <CandiateArea key={key}>
                                <CadiateImageArea>
                                    <ImageUploader
                                        url={imageURL}
                                        onDataChanged={(url) => {
                                            it.imageURL = url;
                                        }}
                                    />
                                </CadiateImageArea>
                                <CadiateInfoArea>
                                    <Input
                                        secondary
                                        title='Title'
                                    />
                                    <Input
                                        secondary
                                        title='Description'
                                    />
                                </CadiateInfoArea>
                            </CandiateArea>
                        );
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
    private addCandiate = () => {
        const { candidates } = this.state;
        this.setState({ candidates: [...candidates, {}] });
    }
}
