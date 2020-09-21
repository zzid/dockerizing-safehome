import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'

const Chart = ({regions, category, drawData}) =>{
    const [colorCodes, setColorCodes] = useState({})
    
    useEffect(()=>{
        const makeDict = () =>{
            var regionColorDict ={}
            drawData.map(e=>regionColorDict[e.region_code] = e.district_color)
            return regionColorDict;
        }
        setColorCodes(makeDict());
    },[drawData]) 

    regions.sort((a,b)=>{ return b.total - a.total }) // Will change the original value
    const columns = regions.map(region=>region.region_name)
    const regionColors = regions.map(region=>colorCodes[region.region_code]+'99')
    const data = regions.map(region=> region.total)

    const barChart =(
        <Bar
            data = {{
                labels : columns,
                datasets:[{
                    label : category,
                    backgroundColor: regionColors,
                    data : data,
                }]
            }}
            options ={{
                legend : {display : false},
                // title : {display : true, text: category}
            }}
        />
    )
    
    return(
        <div className={styles.container}>
            {barChart}
        </div>
    )   
}

export default Chart;