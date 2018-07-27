import React, { PureComponent, ReactChildren } from 'react';
import styled, { withTheme, StyledFunction } from 'styled-components';

const container : StyledFunction<{
  focus : boolean;
  color : string;
} & React.HTMLProps<HTMLDivElement>> = styled.div;

const Container = container`
  position: relative;
  border-radius: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid ${p => p.focus ? p.color : '#DDD'};
  min-width: 100px;
  padding: 0 15px;
  cursor: pointer;
`;

const optionsArea : StyledFunction<{
  color : string;
} & React.HTMLProps<HTMLDivElement>> = styled.div;

const OptionsArea = optionsArea`
  z-index: 999;
  background-color: white;
  position: absolute;
  box-sizing: border-box;
  top: ${(p) => p.theme.HEIGHT_UNIT}px;
  left: 0;
  border-radius: 5px;
  border: 1px solid ${p => p.color};
  width: 100%;
  margin: 5px 0px;
  text-align: center;
`;

const options : StyledFunction<{
  hoverColor : string;
} & React.HTMLProps<HTMLDivElement>> = styled.div;

const Options = options`
  padding: 5px;
  cursor: pointer;
  &:hover {
    color: ${p => p.hoverColor};
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
    color: ${p => p.color};
    margin-right: 10px;
`;

interface Option {
  value : string | number | null;
  content : string;
}

interface Props {
  title? : string;
  value? : string | number | null;
  primary? : boolean;
  secondary? : boolean;
  warning? : boolean;
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
    const { options, title, theme, primary, secondary, warning } = this.props;
    const { openOptions, selected } = this.state;
    const { PRIMARY, SECONDARY, WARNING, PRIMARY_LIGHTER, SECONDARY_LIGHTER } = theme;
    const color = warning ? WARNING : (secondary ? SECONDARY : PRIMARY);
    return (
      <Container
        focus={openOptions}
        color={color}
      >
        <SelectArea
          onClick={this.toggleOptions}
        >
          { title && (<Title color={color}>{title}</Title>) }
          <span>{ selected && selected.content }</span>
        </SelectArea>
        { openOptions && (
          <OptionsArea color={color} >
            {options.map((it : Option) =>  (
              <Options
                hoverColor={color}
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
