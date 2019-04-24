import React, { Component } from "react";
import doEach from 'lodash/forEach';
import PropTypes from 'prop-types';
// components
import InfiniteScroll from 'react-infinite-scroller';
import OutlineItem from './OutlineItem';
// theme
import theme from './../../theme';
// icons
import DrawerTitleIcon from '@material-ui/icons/Tab';
import DrawerIcon from '@material-ui/icons/TabUnselected';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// material-ui
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
// colors
import materialBlue from '@material-ui/core/colors/indigo';
import materialGrey from '@material-ui/core/colors/grey';

const OutlineControlStyles = () => ({
	listContainer: {
		backgroundColor: materialGrey[200],
		height: '100%',
		margin: '0 auto',
		width: '100%',
		textAlign: 'center',
		display: 'table-row',
		overflow: 'auto',
		userSelect: 'none',
	},
	drawerIcon: {
		...theme.menuIconCommonTheme,
		top: '55px',
	},
	drawerIconEditing: {
		left: '55px',
		top: '90px',
	},
	backdropContainer: {
		...theme.backdropTheme,
	},
	menuContainer: {
		height: '100%',
		width: '100%',
		margin: '10px',
		textAlign: 'center',
		display: 'table',
		overflow: 'hidden',
		border: 0,
	},
	menuTitle: {
		display: 'table-row',
		padding: '20px 15px 15px 15px',
		width: '190px',
		position: 'relative',
		backgroundColor: materialBlue[500],
	},
	menuTitleIcon: {
		color: 'white',
		position: 'absolute',
		left: '10px',
		top: '23px',
		cursor: 'pointer',
	},
	menuTitleLabel: {
		color: 'white',
	}
});

class OutlineControl extends Component {
	constructor(props) {
        super(props);
        this.limitPerPage = 6;
        this.state = this.initialState(props);
        // self members binding
        const funcs = [
        	'onDrawer',
        	'onOutlineItem',
        	'onChangePage',
        	// render helpers
        	'renderOutline',
        	'renderOutlineItem',
        	'renderDrawerIcon',
        	'renderBackdrop',
        	'renderOutlineTitle',
        ];
        doEach(funcs, func => this[func] = this[func].bind(this));
    }

    componentWillReceiveProps(nextProps) {
    	// if the page and factory (pdf) object is changed
        if (this.isPDFChanged(nextProps)){
        	// reset all of states
        	this.setState(this.initialState(nextProps));
        } else if (this.isPageChanged(nextProps)) {
            this.updatePageSelected(nextProps);
        }
    }

    componentWillMount() {
    	// render first page of outline
        this.renderOutlineItem();
    }

    // clone the existing outline item from the outline list with selected status
    cloneItemBySelectedState(items, index, selected) {
    	if (items[index]) {
	    	const current = items[index];
			items.splice(index, 1, React.cloneElement(current, {
				...current.props,
				selected,
			}));
		}
    }

    updatePageSelected(nextProps) {
    	const { items } = this.state;
    	const currentPage = nextProps.currentPage - 1;
    	const prevPage = this.props.currentPage - 1;
    	// update prev current page to unselected
    	this.cloneItemBySelectedState(items, prevPage, false);
    	// update next current page to selected
    	this.cloneItemBySelectedState(items, currentPage, true);
    	this.setState({
    		items,
    	});
    }

    isPageChanged(nextProps) {
        return nextProps.currentPage !== this.props.currentPage;
    }

    isPDFChanged(nextProps) {
        const currentPDF = this.props.pdf || {};
        const nextPDF = nextProps.pdf || {};
        return currentPDF.fingerprint !== nextPDF.fingerprint;
    }

    initialState(props) {
    	this.outlineItems = [];
    	return {
    		visable: false,	// show the side menu
    		items: [],
    		hasPaging: false,
    		currentPagingPage: 0,	// setup the first page item
    	};
    }

    onDrawer() {
    	if (!this.state.visable) {
			const outline = this.outlineItems[this.props.currentPage - 1];
			if (outline) {    		
    			outline.scrollIntoView({
    				block: 'end',
    				behavior: 'instant',
    			});
    		}
    	}
    	this.setState(prev => ({
    		visable: !prev.visable,
    	}));
    }

    onChangePage(page) {
    	this.props.onChangePage(page);
    	this.setState({ visable: false })
    }

    onOutlineItem(index, ref) {
    	if (ref) {
	    	this.outlineItems[index] = ref;
	    }
    }

    renderOutlineItem() {
    	let { items } = this.state;
    	let { currentPagingPage } = this.state;
    	const start = currentPagingPage;
    	currentPagingPage = currentPagingPage + this.limitPerPage;
    	let hasPaging = true;	
    	const { totalPage } = this.props;
    	if (totalPage < currentPagingPage) {
    		hasPaging = false; // reach the last page of record
    		currentPagingPage = totalPage;
    	}

    	for(let i = start ; i < currentPagingPage ; i++) {
    		const page = i + 1;
    		items = [
    			...items,
    			(
    				<OutlineItem 
    					key={page}
    					pdf={this.props.pdf}
    					page={page}
    					onOutlineItem={this.onOutlineItem}
    					selected={this.props.currentPage === page}
    					onChangePage={this.onChangePage}
    				/>
    			)
    		];
    	}
    	
		// return items;
		this.setState({
			hasPaging,
			items,
			currentPagingPage,
		});
    }

	renderOutline() {
		const { totalPage = 0 } = this.props;
		// const { currentPagingPage } = this.state;
		// const pageStart = currentPagingPage - 1 < 0 ? 0 : currentPagingPage - 1;
		// console.log(pageStart);
		return (
			<div
				ref={r => this.itemScrollerRef = r}
				className={this.props.classes.listContainer}
			>
				<InfiniteScroll
					useWindow={false}
			        loadMore={this.renderOutlineItem}
			        hasMore={this.state.hasPaging}
			        getScrollParent={() => this.itemScrollerRef}
				>
					{ this.state.items }
				</InfiniteScroll>
			</div>	
		);
	}

	renderDrawerIcon() {
		const { classes, pdf } = this.props;
		let containerStyles = [ classes.drawerIcon ];
		if (pdf) {
			containerStyles = [
				...containerStyles,
				classes.drawerIconEditing,
			];
		}
		return (
			<div
				className={containerStyles.join(' ')}
				onClick={this.onDrawer}
			>
				<DrawerIcon />
			</div>
		);
	}

	renderOutlineTitle() {
		const { classes } = this.props;
		return (
			<div className={classes.menuTitle}>
				<div
					className={classes.menuTitleIcon}
					onClick={this.onDrawer}
				>
					<ChevronLeftIcon />
				</div>
				<Typography
	                color="inherit"
	                variant="h6"
	                className={classes.menuTitleLabel}
	            >
	                OUTLINE
	            </Typography>
            </div>
		);
	}

	renderBackdrop() {
		return (
			this.state.visable && <div
				onClick={this.onDrawer}
				className={this.props.classes.backdropContainer}
			/>
		);
	}

	render() {
		return (
			<div>
				{ this.renderDrawerIcon() }
				{ this.renderBackdrop() }
				<Drawer
					anchor="left"
					variant="persistent"
					open={this.state.visable}
					onClose={this.onDrawer}
				>
					{ this.renderOutlineTitle() }				
					{ this.renderOutline() }
				</Drawer>
			</div>
		);
	}
}

OutlineControl.propTypes = {
	pdf: PropTypes.object.isRequired,
	totalPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	onChangePage: PropTypes.func.isRequired,
};

export default withStyles(OutlineControlStyles)(OutlineControl);
