import React, { PureComponent, ReactChildren } from 'react';
import styled, { withTheme } from 'styled-components';

const Container = styled.div`
  border-radius: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #DDD;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
`;

const OptionsArea = styled.div``;

const SelectArea = styled.div`
  height: ${(p) => p.theme.HEIGHT_UNIT}px;
  display: flex;
  border: 1px solid red;
  width: 100%;
`;

const Title = styled.div`
    margin-right: 10px;
`;

interface Props extends React.HTMLProps<HTMLSelectElement> {
  title? : string;
  theme : any;
  options: Array<{
    value : string | number;
    content : string;
  }>
  onDataChanged? : (data : string | number) => void;
}

interface State {
  openOptions : boolean;
}

class Select extends PureComponent<Props, State> {

  public state = {
    openOptions: false,
  };

  public render() {
    const { options, title } = this.props;
    const { openOptions } = this.state;
    return (
      <Container>
        <SelectArea onClick={this.toggleOptions}>
          { title && (<Title>{title}</Title>) }
          <span>Selected</span>
        </SelectArea>
        { openOptions && (
          <OptionsArea>
            {options.map((it, key) => {
              return (<div key={it.value}>{it.content}</div>);
            })}
          </OptionsArea>
        )}
      </Container>
    );
  }

  private toggleOptions = () => {
    this.setState({ openOptions: !this.state.openOptions });
  };

  private updateData = (e : React.FormEvent<EventTarget>) => {
    const data = (e.target as HTMLSelectElement).value;
    const { onDataChanged } = this.props;
    if (onDataChanged) {
      onDataChanged(data);
    }
  }

}

export default withTheme(Select);
