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
  cursor: pointer;
`;

const OptionsArea = styled.div`
  z-index: 999;
  background-color: white;
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

interface Props {
  title? : string;
  value? : string | number | null;
  theme : any;
  options: Array<Option>
  onDataChanged? : (data : string | number) => void;
}

interface State {
  openOptions : boolean;
  selected : null | Option;
}

class Select extends PureComponent<Props, State> {

  static getOptionByValue(value, props) : Option {
    const { options } = props;
    const option = (options || []).find((it : Option) => it.value === value);
    return option;
  }

  static getDerivedStateFromProps(props, state){
    if (props.value && (props.value !== state.selected.value)) {
      const selected = Select.getOptionByValue(props.value, props);
      return selected ? { selected } : state;
    }
    return state;
  }

  constructor(props : Props) {
    super(props);
    this.state = {
      openOptions: false,
      selected: {
        value: null,
        content: '',
      },
    };
  }

  public render() {
    const { options, title } = this.props;
    const { openOptions, selected } = this.state;
    return (
      <Container>
        <SelectArea
          onClick={this.toggleOptions}
        >
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
    const { onDataChanged } = this.props;
    if (onDataChanged) {
      onDataChanged(selected.value);
      this.toggleOptions();
    }
    this.setState({ selected });
  }

}

export default withTheme(Select);
