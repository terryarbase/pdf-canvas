import React, { Component } from "react";
import doEach from 'lodash/forEach';
// import PropTypes from 'prop-types';
// components
import DocumentPaging from './Paging';
// import DocumentScaler from './Scaler';
// material-ui
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const DocumentControlStyles = () => ({
	appBar: {
        top: 'auto',
        bottom: 0,
    },
    toolbar: {
        height: '40px',
        minHeight: '40px',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toolContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

class DocumentControl extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState(props);
        // self members binding
        const funcs = [
            'next',
            'prev',
            'onPageChanged',
        ];
        doEach(funcs, func => this[func] = this[func].bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.isPDFChanged(nextProps) || 
            this.isPageChanged(nextProps) || 
            this.isZoomChanged(nextProps)
        ) {
            this.setState(this.initialState(nextProps));
        }
    }

    isPageChanged(nextProps) {
        return nextProps.currentPage !== this.props.currentPage;
    }

    isPDFChanged(nextProps) {
        const currentPDF = this.props.pdf || {};
        const nextPDF = nextProps.pdf || {};
        return currentPDF.fingerprint !== nextPDF.fingerprint;
    }

    isZoomChanged(nextProps) {
        return this.props.percentage !== nextProps.percentage;
    }

    shouldComponentUpdate(nextProps) {
        // no need to render if the pdf object is not being changed
        return this.isPDFChanged(nextProps) || 
                this.isPageChanged(nextProps) || 
                this.isZoomChanged(nextProps);
    }

    initialState({ totalPage, currentPage, percentage }) {
        return {
            total: totalPage,   // total number of page
            page: currentPage,    // default page
            last: totalPage === currentPage,
            first: currentPage === 1,
            percentage,
        };
    }

    onPageChanged(page) {
        this.setState(({ total }) => ({
            page,
            last: page === total,
            first: page === 1,
        }), () => {
            this.props.onChangePage(page);
        });
    }

    next() {
        const { page } = this.state;
        if (page < this.state.total) {
            this.onPageChanged(page + 1);
        }
    }

    prev() {
        const { page } = this.state;
        if (page > 1) {
            this.onPageChanged(page - 1);
        }
    }

    renderBarContent() {
        if (!this.props.pdf) {
            return (<div />);
        }
        const { classes, file } = this.props;
        return (
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit">
                    { file.name }
                </Typography>
                <div className={classes.toolContainer}>
                    <DocumentPaging
                        next={this.next}
                        prev={this.prev}
                        change={this.onPageChanged}
                        { ...this.state }
                    />
                    {
                        /*
                            <DocumentScaler
                                zoom={this.props.onScaleChanged}
                                percentage={this.state.percentage} 
                            />
                        */
                    }
                </div>
            </Toolbar>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                { this.renderBarContent() }
            </AppBar>
        );
    }
}

// DocumentControl.propTypes = {
//     pdf: PropTypes.object,
//     file: PropTypes.object,
//     onScaleChanged: PropTypes.func.isRequired,
//     percentage: PropTypes.number.isRequired,
// 	currentPage: PropTypes.number.isRequired,
//     totalPage: PropTypes.number.isRequired,
//     onChangePage: PropTypes.func.isRequired,
// 	classes: PropTypes.object.isRequired,
// };

export default withStyles(DocumentControlStyles)(DocumentControl);
