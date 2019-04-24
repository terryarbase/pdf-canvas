import React, { Component } from "react";
import doEach from 'lodash/forEach';
// import PropTypes from 'prop-types';
// theme
import theme from './../../../theme';
// icons
// import ZoomInIcon from '@material-ui/icons/ZoomIn';
// import ZoomOutIcon from '@material-ui/icons/ZoomOut';
// material-ui
import { withStyles } from "@material-ui/core/styles";
// import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import Typography from '@material-ui/core/Typography';
// colors
import materialBlueGrey from '@material-ui/core/colors/blueGrey';

const ScalerStyles = () => ({
	scalerContainer: {
        ...theme.controlContainerTheme,
        marginLeft: '20px',
        paddingLeft: '25px',
        borderLeft: `1px solid ${materialBlueGrey[300]}`,
    },
    scalerInput: {
        ...theme.controlInputTheme,
        width: '60px',
        display: 'inline-block',
        color: 'black',
        lineHeight: '30px',
        margin: '0 5px',
    },
    optionsListContainer: {
        maxHeight: 48 * 4.5,
        width: 200,
    },
});

class Scaler extends Component {
    constructor(props) {
        super(props);
        this.percentages = [
            0.3,
            0.6,
            0.8,
            1,
            2,
            3,
            4,
        ];
        this.state = this.initialState(props);
        // self members binding
        const funcs = [
            'onMenuShow',
            'onMenuHide',
            'onPercentageSelect',
            // callback helpers
            // 'zoomIn',
            // 'zoomOut',
            // render helpers
            'renderOptionsList',
        ];
        doEach(funcs, func => this[func] = this[func].bind(this));
    }

    initialState(props) {
        return {
            anchorEl: null,
        };
    }

    // zoomIn() {

    // }

    // zoomOut() {

    // }

    onMenuShow({ currentTarget: anchorEl }) {
        this.setState({
            anchorEl,
        });
    }

    onMenuHide() {
        this.setState({
            anchorEl: null,
        });
    }

    onPercentageSelect(percentage) {
        this.setState({
            anchorEl: null,
        }, () => {
            this.props.zoom(percentage)
        });
    }

    renderOptionsList() {
        const { anchorEl } = this.state;
        return (
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={this.onMenuHide}
                PaperProps={{
                    style: {
                        ...this.props.classes.optionsListContainer,
                    },
                }}
            >
                {
                    this.percentages.map(p => (
                        <MenuItem
                            key={String(p)}
                            selected={p === this.props.percentage}
                            onClick={() => this.onPercentageSelect(p)}
                        >
                          {p*100}%
                        </MenuItem>
                    ))
                }
            </Menu>
        );
    }

    render() {
        const { classes, percentage } = this.props;
        return (
            <div className={classes.scalerContainer}>
                { this.renderOptionsList() }
                <span
                    onClick={this.onMenuShow}
                    className={classes.scalerInput}
                >
                    {percentage * 100}%
                </span>
            </div>
        );
    }
}

// Scaler.propTypes = {
//     percentage: PropTypes.number.isRequired,
//     zoom: PropTypes.func.isRequired,
// 	classes: PropTypes.object.isRequired,
// };

export default withStyles(ScalerStyles)(Scaler);
