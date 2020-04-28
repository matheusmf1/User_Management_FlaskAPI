import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';


class Chart extends Component {


  constructor( props ) {
    super( props );
    this.state = {

      chartData: props.chartData
    }
  
  }

  render() {

    return(
      <div className="chart">
        <script>
          
        </script>

        <Bar
          data={this.state.chartData}
          options={ {} }
        />
        </div>

    )    
  }

}

export default Chart;