import React from 'react'
import ApexChart from 'react-apexcharts'

function ChartStock(props) {
    ////////////////////////////////////////////////////////
    // Declare series, name is a name of series, and data //
    //  is my series information in this case dividends   //
    ////////////////////////////////////////////////////////
    let series = [{
        name: 'Dividend',
        data: []
    }]

    ///////////////////////////////////////////////////////////
    // Declare options this is a information grafics in this //
    ///// case, I will use this in my legend date, legend /////
    // position, legend size, color, grafic color and others //
    ///////////////////////////////////////////////////////////
    let options = {
        chart: {
            toolbar: {
              show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -20,
            style: {
                fontSize: '14px',
                colors: ["#ffffff"]
            }
        },
        xaxis: {
            labels: {
                show: false
            },
            categories: [],
            position: 'bottom',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 0],
                        opacityFrom: 0.1,
                        opacityTo: 0.1,
                    }
                }
            },
            tooltip: {
                enabled: false,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val;
                }
            }
        },
        title: {
            text: 'STOCK',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    }

    //////////////////////////////////////////////////////////////////
    // This point I check how many dividens there are, and the code //
    /////////// filters if there are more than 12 returns ////////////
    //////////////////////////////////////////////////////////////////
    if(props.resultStock.cashDividends){
        if(props.resultStock.cashDividends.length > 0){
            let countStocks = 0
            if(props.resultStock.cashDividends.length < 12){
                countStocks = props.resultStock.cashDividends.length
            }else{
                countStocks = 12
            }
            for(let i = 0; i < countStocks; i++){
                series[0].data.push(props.resultStock.cashDividends[i].rate.toFixed(3))
                var d = new Date(props.resultStock.cashDividends[i].paymentDate);
                options.xaxis.categories.push(d.getUTCDate()+'/'+(d.getUTCMonth()+1)+'/'+d.getUTCFullYear())
            }
        }
    }

    /////////////////////////////////////
    // ApexChart was imported for the  //
    // project and it makes the grafic //
    /////////////////////////////////////
    return (
        <div id="chart">
            <ApexChart 
                options={options}
                series={series}
                type="bar"
                height={150}
                width={500}
            />
        </div>
    );
}
export default ChartStock