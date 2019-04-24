import React, { Component } from "react";
import doEach from 'lodash/forEach';
import str2ab from 'string-to-arraybuffer';
// import PropTypes from 'prop-types';
// theme
import mainTheme from './../theme';
// components
import ListControl from './List';
import FilePicker from './FilePicker';
// icons
import DrawerIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// material-ui
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const Transition = props => {
  return <Slide direction="up" {...props} />;
}

const DrawerMenuStyles = theme => ({
	drawerIcon: {
		...mainTheme.menuIconCommonTheme,
	},
	drawerIconEditing: {
		left: '55px',
		top: '50px',
	},
	close: {
		padding: theme.spacing.unit / 2,
	},
	dialogContent: {
		fontSize: '13px',
	},
});

class DrawerMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showUpload: false,
			uploadError: null,
			isUploading: false,
		}
		const funcs = [
			// state helpers
			'onShowUpload',
			'onUploadAcceptedResult',
			'onUploadRejectedResult',
			// callback helpers
			'afterUploaded',
			// render helpers
			'renderFilePicker',
			'readPDFXConfig',
			'renderDrawerIcon',
			'renderUploadErrorSnacker',
		];
		doEach(funcs, func => this[func] = this[func].bind(this));

		this.listItems = {
			uploadFile: {
				label: 'Upload PDF File',
				icon: (<AddIcon />),
				onClick: this.onShowUpload,
			}
		};
	}

	onShowUpload() {
		this.setState(prev => ({
    		showUpload: !prev.showUpload,
    	}), () => {
			if (this.state.showUpload) {
				this.props.onClose();	// close the Drawer
			}
    	});
	}

	readPDFXConfig(file) {
		let config = '';
		// if (this.props.encrypt) {
  //           config = window.atob(decodeURIComponent(file));
  //       }
        config = JSON.parse(file);
        if (!config.data) {
        	console.warn('> file config invalid.');
        	throw new Error();
        }
		
	}

	afterUploaded(file, buffer, isConfig) {
		// if (isConfig) {
		// 	try {
		// 		this.readPDFXConfig(buffer);
		// 	} catch (err) {
		// 		return this.onUploadRejectedResult();
		// 	}
		// }
		// reset the upload result to correct first
		this.onUploadAcceptedResult();
		this.onShowUpload();
		this.props.onUploaded(file, buffer);
	}

	renderUploadErrorSnacker() {
		if (!this.state.uploadError) {
			return null;
		}
		return (
			<Snackbar
				anchorOrigin={{
		            vertical: 'bottom',
		            horizontal: 'left',
		        }}
		        open={true}
		        autoHideDuration={5000}
		        onClose={this.onUploadAcceptedResult}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={
					<span id="message-id">The chosen file is incorrect.</span>
				}
				action={[
					<IconButton
					  key="close"
					  aria-label="Close"
					  color="inherit"
					  className={this.props.classes.close}
					  onClick={this.onUploadAcceptedResult}
					>
						<CloseIcon />
					</IconButton>,
				]}
			/>
		);
	}

	onUploadAcceptedResult() {
		this.setState({
			uploadError: null,
		});
	}

	onUploadRejectedResult() {
		this.setState({
			uploadError: true,
		});
	}

	renderFilePicker() {
		if (!this.state.showUpload) {
			return null;
		}
		const { maxSize } = this.props;
		const options = {
			multiple: false,
			// pdfx for editor config file with pdf source
			accept: ['application/pdf'],
			// , '.pdfx'],
			maxSize,
	    };

	    let item = this.listItems.uploadFile;
	    let uploadCaption = `Please Select or Drag and drop the PDF file to the following area.`;
	    if (maxSize) {
	    	uploadCaption = `${uploadCaption} The file size of PDF should be less than equals to ${Math.floor(maxSize / 1000 / 1000)}MB.`;
	    }
	    return (
	    	<Dialog
	    		onClose={item.onClick}
	    		TransitionComponent={Transition}
				keepMounted
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
	    		open={this.state.showUpload}
	    	>
		        <DialogTitle id="alert-dialog-slide-title">
		        	{item.label}
		        </DialogTitle>
		        <DialogContent>
		        	<div className={this.props.classes.dialogContent}>
			        	<Typography color="inherit">
		                    {uploadCaption}
		                </Typography>
	                </div>
			    	<FilePicker
			          options={options}
			          onError={this.onUploadRejectedResult}
			          isUploading={this.state.isUploading}
			          onUploaded={this.afterUploaded}
			        />
		        </DialogContent>
			</Dialog>
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
			<div className={containerStyles.join(' ')} onClick={this.props.onClose}>
				<DrawerIcon />
			</div>
		);
	}

	render() {
		return (
			<div>
				{ this.renderDrawerIcon() }
				{ this.renderFilePicker() }
				{ this.renderUploadErrorSnacker() }
				<Drawer
					anchor="left"
					open={this.props.visable}
					onClose={this.props.onClose}
				>
					<ListControl
						items={this.listItems}
					/>
				</Drawer>
			</div>
		);
	}
}

// DrawerMenu.propTypes = {
// 	outlines: PropTypes.array,
// 	pdf: PropTypes.object,
// 	visable: PropTypes.bool.isRequired,
// 	onClose: PropTypes.func.isRequired,
// 	classes: PropTypes.object.isRequired,
// 	onUploaded: PropTypes.func.isRequired,
// };

export default withStyles(DrawerMenuStyles)(DrawerMenu);
