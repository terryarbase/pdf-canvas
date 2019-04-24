import React from "react";
// import PropTypes from 'prop-types';
// theme
import theme from './../../../theme';
// icons
import NextIcon from '@material-ui/icons/NavigateNext';
import PrevIcon from '@material-ui/icons/NavigateBefore';
// material-ui
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const PagingStyles = () => ({
	pageContainer: {
        ...theme.controlContainerTheme,
    },
    pagingInput: {
        ...theme.controlInputTheme,
    },
    totalPageContainer: {
        userSelect: 'none',
        margin: '0 5px 0 10px',
        display: 'inline-block',
        fontSize: '18px',
        letterSpacing: '5px',
        fontWeight: 'bolder',
        verticalAlign: 'middle',
    }
});

const Paging = ({ classes, ...props }) => {
    return (
        <div className={classes.pageContainer}>
            <IconButton
                color="inherit"
                disabled={props.first}
                onClick={props.prev}
            >
                <PrevIcon />
            </IconButton>
            <span>
                <input 
                    type="text"
                    pattern="[0-9]*"
                    className={classes.pagingInput}
                    value={props.page}
                    onChange={e => {
                        let page = e.target.value;
                        if (!isNaN(page) && Number.isInteger(+page)) {
                            page = Number(page);
                            if (page < 1) {
                                page = 1;
                            } else if (page > props.total) {
                                page = props.total;
                            }
                            props.change(page);
                        }   
                    }}
                />
            </span>
            <Typography
                color="inherit"
                className={classes.totalPageContainer}
            >
                / {props.total}
            </Typography>
            <IconButton
                color="inherit"
                onClick={props.next}
                disabled={props.last}
            >
                <NextIcon />
            </IconButton>
        </div>
    );
};

// Paging.propTypes = {
// 	page: PropTypes.number.isRequired,
//     total: PropTypes.number.isRequired,
//     last: PropTypes.bool.isRequired,
//     first: PropTypes.bool.isRequired,
//     next: PropTypes.func.isRequired,
//     prev: PropTypes.func.isRequired,
//     change: PropTypes.func.isRequired,
// 	classes: PropTypes.object.isRequired,
// };

export default withStyles(PagingStyles)(Paging);
