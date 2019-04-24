import React, { Component } from "react";
import doEach from 'lodash/forEach';
import PropTypes from 'prop-types';
// components
import {
	Page,
} from 'react-pdf';
// theme
import theme from './../../../theme';
// material-ui
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
// colors
import materialBlue from '@material-ui/core/colors/indigo';

const OutlineItemStyles = () => ({
	thumbnailContainer: {
		margin: '10px auto',
		position: 'relative',
		textAlign: 'center',
		maxWidth: '140px',
		cursor: 'pointer',
		'&:not(last-child)': {
			marginBottom: '20px',
		},
		'&first-child': {
			marginTop: '20px',
		},
	},
	pageLabel: {
		position: 'absolute',
		top: '5px',
		zIndex: '1',
		left: '5px',
	},
	thumbnailActiveContainer: {
		border: `2px solid ${materialBlue[600]}`,
		cursor: 'default',
	},
	loadingContainer: {
		...theme.centralBlockTheme,
	},
	currentProgress: {
		color: 'white',
		fontWeight: 'bolder',
	},
});

class OutlineItem extends Component {
	constructor(props) {
        super(props);
        this.state = this.initialState(props);
        // self members binding
        const funcs = [
        	'onLoadingPage',
        	'onLoadedPage',
        	// callback helpers
        	'onItemClick',
        	// render helpers
        	'renderLoadingProgress',
        ];
        doEach(funcs, func => this[func] = this[func].bind(this));
    }

    shouldComponentUpdate(nextProps) {
    	// the selected state is changed
        return nextProps.selected !== this.props.selected;
    }

    initialState(props) {
    	return {
    		progress: 0,	// progress for the page loaded
    		loading: false,
    	};
    }

    onItemClick() {
    	if (!this.props.selected) {
    		this.props.onChangePage(this.props.page);
    	}
    }

    onLoadingPage({ loaded, total }) {
    	this.setState({
    		progress: Math.floor((loaded / total) * 100),
    	});
    }

    onLoadedPage() {
    	this.setState({
    		loading: false,
    	})
    }

    renderLoadingProgress() {
    	const { classes } = this.props;
    	if (!this.state.loading) {
    		return (<div />);
    	}
    	return (
    		<div className={classes.loadingContainer}>
	    		<CircularProgress
		        	variant="determinate"
		        	value={this.state.progress}
		        />
		        <div className={classes.currentProgress}>
		        	<Typography
		                color="inherit"
		                variant="h6"
		            >
		                {this.state.progress}%
		            </Typography>
		        </div>
	        </div>
    	);
    }

	render() {
		if (!this.props.pdf) {
			return (<div />);
		}
		const { classes } = this.props;
		let blockStyle = [ classes.thumbnailContainer ];
		if (this.props.selected) {
			blockStyle = [
				...blockStyle,
				classes.thumbnailActiveContainer,
			];
		}
		return (
			<div
				className={blockStyle.join(' ')}
				onClick={this.onItemClick}
				ref={r => {
					if (this.props.onOutlineItem) {
						return this.props.onOutlineItem(this.props.page - 1, r);
					}
				}}
			>
				<Chip
					label={this.props.page}
					className={classes.pageLabel}
					color={this.props.selected ? 'primary' : 'default'}
				/>
				<Paper
					elevation={1}
				>
					<Page
						width={135}
						pdf={this.props.pdf}
						onLoadProgress={this.onLoadingPage}
						onLoadSuccess={this.onLoadedPage}
						renderAnnotationLayer={false}
						renderTextLayer={false}
						pageNumber={this.props.page}
					/>
				</Paper>
			</div>
		);
	}
}

OutlineItem.propTypes = {
	pdf: PropTypes.object,
	page: PropTypes.number,
	ref: PropTypes.object,
	selected: PropTypes.bool,
	classes: PropTypes.object.isRequired,
	onChangePage: PropTypes.func.isRequired,
};

export default withStyles(OutlineItemStyles)(OutlineItem);
