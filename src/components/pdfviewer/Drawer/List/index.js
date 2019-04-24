import React, { Component } from "react";
import doEach from 'lodash/forEach';
import doMap from 'lodash/map';
import byKeys from 'lodash/keys';
// import PropTypes from 'prop-types';
// material-ui
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// colors
import materialGrey from '@material-ui/core/colors/grey';
import materialIndigo from '@material-ui/core/colors/indigo';

const ListControlStyles = () => ({
	listContainer: {
		width: '250px',
	},
	copyrightBlock: {
		margin: '0 0 5px 0',
		color: materialGrey[500],
	},
	versionBlock: {
		fontSize: '9px',
		color: materialGrey[500],
	},
	divider: {
		margin: '8px 0 20px 0',
	},
	companyLink: {
		textDecoration: 'none',
		color: materialIndigo[600],
	}
});

const renderListItems = (items) => (
	doMap(byKeys(items), (key, index) => {
		const { label, icon, onClick } = items[key];
		return (
			<ListItem button onClick={onClick} key={index}>
				<ListItemAvatar>
					<Avatar>
						{icon}
					</Avatar>
				</ListItemAvatar>
	        	<ListItemText primary={label} />
	        </ListItem>
        );
	})
);

const renderCopyrightBlock = (classes) => (
	<div>
		<div className={classes.copyrightBlock}>
			<Typography variant="caption" align="center" color="inherit">
		     	Powered By Terry Chan @ 2019
		    </Typography>
	    </div>
	    {
	    /* 
	    <div className={classes.copyrightBlock}>
	    	<Typography variant="caption" align="center" color="inherit">
	     		<a
	     			href="https://www.4d.com.hk/"
	     			target="_blank"
	     			className={classes.companyLink}
	     		>
	     			Four Directions Limited
	     		</a>
		    </Typography>
	    </div>
	    */
		}
    </div>
);

const renderVersionBlock= (classes) => (
	<Typography variant="caption" className={classes.versionBlock} align="center" color="inherit">
     	VERSION 1.0
    </Typography>
);

const ListControl = ({ classes, items, ...props }) => {
	return (
		<div>
			<List className={classes.listContainer}>
				{ renderListItems(items) }
				<Divider className={classes.divider} />
				{ renderCopyrightBlock(classes) }
				{ renderVersionBlock(classes) }
			</List>
		</div>
	);
};

// ListControl.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

export default withStyles(ListControlStyles)(ListControl);
