import React, { Component, useCallback } from "react";
import doEach from 'lodash/forEach';
// import PropTypes from 'prop-types';
// components
import Dropzone from 'react-dropzone';
// icons
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
// material-ui
import { withStyles } from "@material-ui/core/styles";
import RootRef from '@material-ui/core/RootRef'

const FilePickerStyles = theme => ({
	dropContainer: {
		marginTop: '10px',
		display: 'table',
		width: '100%',
		border: '2px dashed #ccc',
	},
	dropContentContainer: {
		padding: '0 !important',
		position: 'relative',
	},
	uploadIcon: {
		position: 'absolute',
	    left: '50%',
	    top: '50%',
	    transform: 'translate(-50%,-50%)',
	},
	dropzone: {
		height: '70px',
	},
});

const isConfigExtension = (extension) => {
	return ['pdfx'].indexOf(extension) !== -1;
}

const FilePicker = ({ classes, onError, ...props }) => {
	// callback for after select the pdf file
	const onDrop = useCallback(files => {
    	const reader = new FileReader();
    	let file = null;
    	// let isConfig = false;
	    reader.onerror = () => {
	    	if (onError) onError();
	    };
	    reader.onload = () => {
	    	const result = reader.result;
	    	return props.onUploaded(file, result);
	    }
	    // read as Uint8Array buffer
	    if (files.length) {
	    	file = files[0];
	    	try {
		    	// const extension = file.name.substring(file.name.lastIndexOf('.') + 1);
		    	// isConfig = isConfigExtension(extension);
		    	// if (isConfig) {
		    	// 	reader.readAsText(file, "UTF-8");
		    	// } else {
		    		// reader.readAsBinaryString(files[0);
		    		reader.readAsArrayBuffer(file); 
		    	// }
		    } catch (err) {
		    	if (onError) onError();
		    }
		    
	    	
	    }
  	}, []);

  	const options = {
  		onDrop,
  		onDropRejected: onError,
		...props.options,
	};


  	return (
		<div className={classes.dropContainer}>
  			<div className={classes.dropContentContainer}>
  				<Dropzone
  					{ ...options }
  				>
					{({getRootProps, getInputProps}) => (
						<section>
							<div className={classes.dropzone} {...getRootProps()}>
								<input { ...getInputProps() } />
								<div className={classes.uploadIcon}>
									<CreateNewFolderIcon
										fontSize='large'
										color='action'
									/>
								</div>
							</div>
						</section>
					)}
				</Dropzone>
			</div>
		</div>
	)
}

// FilePicker.propTypes = {
// 	onError: PropTypes.func,
// 	options: PropTypes.object,
// 	onUploaded: PropTypes.func.isRequired,
// 	classes: PropTypes.object.isRequired,
// };
// class FilePicker extends Component {
// 	constructor(props) {
// 		super(props);
// 		const funcs = [
// 			// state helpers
// 			'onDrop',
// 		];
// 		doEach(funcs, func => this[func] = this[func].bind(this));
// 	}

// 	onDrop(files) {
// 		const reader = new FileReader();
//     	let file = null;
// 	    reader.onerror = () => {
// 	    	if (onError) onError();
// 	    };
// 	    reader.onload = () => {
// 	    	const buffer = reader.result;
// 	    	return props.onUploaded(file, buffer);
// 	    }
// 	    // read as Uint8Array buffer
// 	    if (files.length) {
// 	    	file = files[0];
// 	    	// reader.readAsBinaryString(files[0);
// 	    	reader.readAsArrayBuffer(files[0]); 
// 	    }
// 	}

// 	render() {
// 		const { classes } = this.props;
// 		let { options } = this.props;

// 	  	options = {
// 	  		...options,
// 	  		onDrop: this.onDrop,
// 	  		onDropRejected: this.onError,
// 		};

// 	  	return (
// 	  		<div className={classes.dropContainer}>
// 	  			<div className={classes.dropContentContainer}>
// 	  				<Dropzone
// 	  					{ ...options }
// 	  				>
// 						{({getRootProps, getInputProps}) => (
// 							<section>
// 								<div className={classes.dropzone} {...getRootProps()}>
// 									<input { ...getInputProps() } />
// 									<div className={classes.uploadIcon}>
// 										<CreateNewFolderIcon
// 											fontSize='large'
// 											color='action'
// 										/>
// 									</div>
// 								</div>
// 							</section>
// 						)}
// 					</Dropzone>
// 				</div>
// 			</div>
// 		);
// 	}
// }

export default withStyles(FilePickerStyles)(FilePicker);
