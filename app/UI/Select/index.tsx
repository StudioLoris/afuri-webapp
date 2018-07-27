import React, { PureComponent, ReactChildren } from 'react';
import styled, { withTheme } from 'styled-components';

const Container = styled.div`
  position: relative;
  border-radius: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #DDD;
  min-width: 100px;
  padding: 0 15px;
`;

const OptionsArea = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: ${(p) => p.theme.HEIGHT_UNIT}px;
  left: 0;
  border-radius: 5px;
  border: 1px solid #DDD;
  width: 100%;
  margin: 5px 0px;
  text-align: center;
`;

const Options = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #DDD;
  }
`;

const SelectArea = styled.div`
  height: ${(p) => p.theme.HEIGHT_UNIT}px;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
`;

const Title = styled.div`
    margin-right: 10px;
`;

interface Option {
  value : string | number | null;
  content : string;
}

interface Props extends React.HTMLProps<HTMLSelectElement> {
  title? : string;
  theme : any;
  options: Array<Option>
  onDataChanged? : (data : string | number) => void;
}

interface State {
  openOptions : boolean;
  selected : null | Option;
}

class Select extends PureComponent<Props, State> {

  public state = {
    openOptions: false,
    selected: {
      value: null,
      content: '',
    },
  };

  public render() {
    const { options, title } = this.props;
    const { openOptions, selected } = this.state;
    return (
      <Container>
        <SelectArea onClick={this.toggleOptions}>
          { title && (<Title>{title}</Title>) }
          <span>{ selected && selected.content }</span>
        </SelectArea>
        { openOptions && (
          <OptionsArea>
            {options.map((it : Option) =>  (
              <Options
                key={it.value}
                onClick={() => {
                  this.updateData(it);
                }}
              >
                {it.content}
              </Options>
            ))}
          </OptionsArea>
        )}
      </Container>
    );
  }

  private toggleOptions = () => {
    this.setState({ openOptions: !this.state.openOptions });
  };

  private updateData = (selected : Option) => {
    this.setState({ selected }, () => {
      const { value } = this.state.selected;
      const { onDataChanged } = this.props;
      if (onDataChanged) {
        onDataChanged(value);
      }
    });

  }

}

export default withTheme(Select);
