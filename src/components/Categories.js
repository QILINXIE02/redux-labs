import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeActive } from '../categories';
import { getRemoteData } from '../thunk';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

function Categories() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.categoriesList);
    const classes = useStyles();
    const [value, setValue] = useState(0);

    useEffect(() => {
        async function fetchData() {
            await dispatch(getRemoteData());
            dispatch(changeActive("electronics"));
        }
        fetchData();
    }, [dispatch]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(changeActive(state.categoriesList[newValue].name));
    };

    return (
        <>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    centered
                >
                    {state.categoriesList.map((element, index) => (
                        <Tab key={element.name} label={element.name} onClick={(e) => handleChange(e, index)} />
                    ))}
                </Tabs>
            </Paper>
            <div style={{ display: "flex", justifyContent: 'center', marginTop: '30px' }}>
                <h1 style={{ marginRight: '5px', color: 'rgb(0, 112, 153)' }}>{state.activeCategory.name} </h1>
                <h4 style={{ color: 'rgb(148, 184, 184)' }}> {state.activeCategory.description} </h4>
            </div>
        </>
    );
}

export default Categories;
