import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { Tab, Tabs } from '@material-ui/core';

import title_img from '../../images/title_200_47.png';

import styles from './Header.module.css';

import ProgressBar from './ProgressBar';


const MainHeader = ({scrollToContent}) => {
    const [value, setValue] = useState(0)
    const [scrollPosition, setScrollPosition] = useState(0)

    const listenToScrollEvent = () => {
        document.addEventListener("scroll", () => {
            requestAnimationFrame(()=>{
                calculateScrollDistance();
            })
        })
    }
    const calculateScrollDistance = () => {
        const scrollTop = window.pageYOffset; // how much the user has scrolled by
        const winHeight = window.innerHeight;
        const docHeight = getDocHeight();
        const totalDocScrollLength = docHeight - winHeight;
        setScrollPosition(Math.floor(scrollTop / totalDocScrollLength * 100))
    }

    const getDocHeight = () => {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }
    
    useEffect(()=>{
        listenToScrollEvent()
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
        scrollToContent(newValue);
    };
    const makeLabel = (label) =>{
        return <Typography variant="h6">{label}</Typography>
    }

    return(
        <>
        <div className={styles.container}>
            <AppBar>
                <div className={styles.title_words}>어디가 좋을구?</div>
                <div className={styles.toolbarWrap}>
                    <div className={styles.iconImg}><a href=""><img className={styles.img} src={title_img} alt="img error"/></a></div>
                    <Toolbar>
                            <Tabs
                            className={styles.tabs}
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="standard"
                            centered
                            >
                            <Tab label={makeLabel("카테고리별")}/>
                            <Tab label={makeLabel("구별")}/>
                            <Tab label={makeLabel("뉴스")}/>
                            </Tabs>
                    </Toolbar>
                    {/* <Button className={styles.loginBtn} color="inherit">Login</Button> */}
                </div>
                <ProgressBar scroll = {scrollPosition + '%'}/>
            </AppBar>
        </div>
        </>
    )

}
export default MainHeader;
