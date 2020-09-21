import React , { useState ,useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';

import styles from './UseSvg.module.css';

import { fetchCategoryData } from '../../api';

const colorDict = {'red' : 339, 'green' : 129};
const UseSvg = ({regions , category, drawData}) => {
    const [svgDict, setSvgDict] = useState({})
    const [defaultData, setDefaultData] = useState([])
    
    const getDefaultData = async () => {
        try{
            const data = await fetchCategoryData('house')
            var sortedData = data.concat()
            sortedData.sort((a,b)=>{return b.total - a.total})
            setDefaultData(sortedData)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        const makeDict = () =>{
            var regionDict ={}
            drawData.map(e=>regionDict[e.region_code] = e.svgd)
            return regionDict
        }
        setSvgDict(makeDict())
        getDefaultData()
    },[drawData])
    

    var min= Number.MAX_VALUE, max = -Number.MAX_VALUE;
    regions.forEach(e=>{
        min = Math.min(min,e.total)
        max = Math.max(max,e.total)
    })

    const coloring = (num,color) =>{
        const term = (max-min+1) / (6.0);
        if(num <= min + term) return `hsl(${color}, 100%, 95%)`
        else if(num <= min + (term*2)) return `hsl(${color}, 100%, 90%)`
        else if(num <= min + (term*3)) return `hsl(${color}, 100%, 80%)`
        else if(num <= min + (term*4)) return `hsl(${color}, 100%, 70%)`
        else if(num <= min + (term*5)) return `hsl(${color}, 100%, 60%)`
        else return `hsl(${color}, 100%, 50%)`
    }

    const makeMsg = (name, num, index) =>{
        return (
            <>
                <Typography color="inherit">{name}</Typography>
                <Typography variant="h5">{category}{' '}
                    <NumberFormat thousandSeparator={true} value ={parseInt(num)} displayType={'text'}/>
                </Typography>
                { defaultData.length ?
                    <>
                    <Typography variant="body2">{'평당 평균 가격 순위 '}
                        <NumberFormat thousandSeparator={true} value ={index+1} displayType={'text'}/>
                        {'위'}
                    </Typography>
                    <Typography variant='body2'>{`( ${parseInt(defaultData[index].total)}만원 )`}</Typography>
                    </>
                     : null
                }
            </>
        );
    }


    const drawSVG =(
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            {regions.map((region, index)=>
                        <g key={region.region_name}>
                            <Tooltip title={makeMsg(region.region_name, region.total, index)} arrow placement="right-end">
                                <path fill={coloring(region.total, colorDict['red'])} d={svgDict[region.region_code]}/>
                            </Tooltip>
                        </g>)
            }
        </svg>
    )
    return(
        <div className={styles.container}>
            {drawSVG}
        </div>
    )
}

export default UseSvg
