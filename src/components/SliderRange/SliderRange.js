import React from "react";
import PropTypes from "prop-types";
//import "../../assets/css/slider.css";
import Slider from "rc-slider";
const Range = Slider.Range;

export class SliderRange extends React.Component {

  render() {

    return (
        <div className={this.props.className} style={{paddingLeft:9, paddingRight:8}}>
        <Range
          className="w100r animated"
          allowCross={false}
          min={this.props.rangeObject.minValue}
          max={this.props.rangeObject.maxValue}
          defaultValue={[this.props.rangeObject.value.startValue, this.props.rangeObject.value.endValue]}         
          step={1}         
          // handleStyle={[
          //   {
          //     borderColor: "#2D3D57",
          //     height: 15,
          //     width: 15,
          //     backgroundColor: "#2D3D57",
          //     marginTop: -5
          //   },
          //   {
          //     borderColor: "#2D3D57",
          //     height: 15,
          //     width: 15,
          //     backgroundColor: "#2D3D57",
          //     marginTop: -5
          //   }
          // ]}
          // railStyle={{
          //   backgroundColor: "#fff",
          //   height: 5
          // }}
          // trackStyle={[
          //   {
          //     backgroundColor: "#898169",
          //     height: 5
          //   }
          // ]}
          onChange={valuesArr => {
            this.props.onValueChange(this.props.rangeObject, {
              startValue: valuesArr[0],
              endValue: valuesArr[1]
            });
          }}
        />
        <div className="rangeValues flex w100 animated">
          <span className="rangeValues__item rangeValueStart">${this.props.rangeObject.value.startValue}</span>
          <span className="rangeValues__item rangeValueEnd">${this.props.rangeObject.value.endValue}</span>
        </div>
      </div>
    );
  }
}

SliderRange.propTypes = {
  onValueChange: PropTypes.func.isRequired, //arguments: (rangeObject, newValuesObject)
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  className: PropTypes.string,
  rangeObject: PropTypes.shape({
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    value: PropTypes.shape({
      startValue: PropTypes.number.isRequired,
      endValue: PropTypes.number.isRequired
    })
  })
};
