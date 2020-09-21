import React from 'react';

import {CircularProgress} from '@material-ui/core';

const Loading = ({which}) =>{
    return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
        <CircularProgress color="secondary"/>
        <h5>Loading {which}..</h5>
    </div>
    )
}

export default Loading;