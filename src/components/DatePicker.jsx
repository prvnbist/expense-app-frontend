
import React from 'react';

const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
  ];
  
  //Child Component
  export default class DatePicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        year: new Date().getFullYear(),
        month: months[new Date().getMonth()]
      };
      // Create the ref
      this.selectedYear = React.createRef();
    }
  
    componentDidMount() {
      let node = this.selectedYear.current;
  
      this.prevYear = () => {
        node.innerHTML--;
      };
  
      this.nextYear = () => {
        node.innerHTML++;
      };
      this.onMonthSelection = e => {
        e.persist();
        document
          .querySelectorAll('input[name="month"]')[new Date().getMonth()].removeAttribute("checked");
        this.setState({ month: e.target.value, year: Number(node.innerHTML) });
      };
    }
  
    render() {
      const { month, year } = this.state;
      return (
        <div
          id="datePicker"
          style={{
            left: this.props.position.posX - 115,
            top: this.props.position.posY + 30
          }}
        >
          <div id="year">
            <i className="material-icons" onClick={() => this.prevYear()}>
              keyboard_arrow_left
            </i>
            <span id="selectedYear" ref={this.selectedYear}>
              {year}
            </span>
            <i className="material-icons" onClick={() => this.nextYear()}>
              keyboard_arrow_right
            </i>
          </div>
          <ul id="month">
            {months &&
              months.map((item, index) => (
                <li key={index}>
                  <input
                    className="monthRadio"
                    type="radio"
                    name="month"
                    id={item}
                    value={item}
                    checked={item === month}
                    onChange={e => this.onMonthSelection(e)}
                  />
                  <label htmlFor={item}>{item}</label>
                </li>
              ))}
          </ul>
          <button
            onClick={() => {
              this.props.selectedData({ month, year });
              this.props.closeDatePicker();
            }}
            style={{
                height:40,
                padding: "0 15px",
                background: "#318FFE",
                borderRadius: 4,
                lineHeight: "normal",
                fontSize: 14,
                textTransform: "uppercase",
                color: "#FFFFFF"}}
          >
            SELECT
          </button>
        </div>
      );
    }
  }