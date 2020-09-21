import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';

import styles from './RadarChart.module.css';
import { Typography } from '@material-ui/core';

const columnDict = {
    'population' : '인구수',
    "flood_vic": '재난(홍수)',
    "crime_num": '범죄',
    "crime_arr": '체포',
    "fire_cost": '화재',
    "child_car_num": '어린이교통사고',
    "alc_car_num": '음주운전사고',
    "house_price": '집값',
}

const RadarChart = React.forwardRef(({regionDatasets, drawData},ref) =>{
    const [colorCodes, setColorCodes] = useState({})
    
    useEffect(()=>{
        const makeDict = () =>{
            var regionColorDict ={}
            drawData.map(e=>regionColorDict[e.region_code] = e.district_color)
            // console.log(regionColorDict)
            return regionColorDict;
        }
        setColorCodes(makeDict());
    },[drawData]) 
    
    if(!regionDatasets || !regionDatasets.length)
        return <p ref={ref}>지역을 선택하면 Radar가 그려집니다</p>
    
    const columns = Object.keys(regionDatasets[0]);
    const dataOnlyColumns = columns.filter(c=>(c !== "region_code" && c !== "region_name"))
    const korColumns = dataOnlyColumns.map(c=>columnDict[c])

    const dataSets = regionDatasets.map(regionsDataset=>{
        let regionColor = colorCodes[regionsDataset.region_code];
        return {
            label : regionsDataset.region_name,
            backgroundColor: regionColor +'66',
            borderColor: regionColor +'bb',
            pointBorderColor: regionColor +'bb',
            pointBackgrounColor: regionColor +'bb',
            data : dataOnlyColumns.map(c=>regionsDataset[c]),
        }
    })

    const radarData ={
        labels : korColumns,
        datasets : dataSets,
    }

    return(
        <>
            <Typography component='p' className={styles.p} ref={ref}> ** 값 = ( 해당 구의 값 / 25개구 중 최대 값) * 100 </Typography>
            <Radar
                data ={radarData}
            />
        </>
    )
});
export default RadarChart;