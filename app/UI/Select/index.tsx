import React, { PureComponent, ReactChildren } from 'react';
import styled, { withTheme } from 'styled-components';

interface Props extends React.HTMLProps<HTMLSelectElement> {
  theme : any;
  options: Array<{
    value : string | number;
    content : string;
  }>
  onDataChanged? : (data : string | number) => void;
}

class Select extends PureComponent<Props> {

  public render() {
    const { options } = this.props;
    return (
      <select
        {...this.props}
        onChange={this.updateData}
      >
        {options.map((it) => (
          <option
            key={it.value}
            value={it.value}
          >
            {it.content}
          </option>
        ))}
      </select>
    );
  }

  private updateData = (e : React.FormEvent<EventTarget>) => {
    const data = (e.target as HTMLSelectElement).value;
    const { onDataChanged } = this.props;
    if (onDataChanged) {
      onDataChanged(data);
    }
  }

}

export default withTheme(Select);
