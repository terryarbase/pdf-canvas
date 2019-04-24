import React, { Component } from "react";
import doEach from 'lodash/forEach';
// components
import Drawer from './Drawer';
import DocumentViewer from './Components/DocumentViewer';
// material-ui
import { withStyles } from "@material-ui/core/styles";

const DocumentReaderStyles = () => ({
	documentViewport: {
		overflow: 'auto',
		width: '100%',
		height: '100%',
		position: 'fixed',
		backgroundColor: '#eeeeee',
		textAlign: 'center',
		padding: '0',
		top: 0,
		left: 0,
	},
});

class DocumentReader extends Component {
	constructor(props) {
        super(props);
        this.state = this.initialState(props);
        // self members binding
        const funcs = [
        	'onDocumentUploaded',
        	'onDrawer',
        ];
        doEach(funcs, func => this[func] = this[func].bind(this));
    }

    initialState(props) {
    	return {
    		pdf: null,	// pdf file object
    		pdfBuffer: null, // pdf file uint8Array buffer
    		showDrawer: false,	// show the side menu
    	};
    }

    onDocumentUploaded(pdf, pdfBuffer) {
	    this.setState({
	    	pdfBuffer,
	    	pdf,
	    	showDrawer: false,
	    });
	}

    onDrawer() {
    	this.setState(prev => ({
    		showDrawer: !prev.showDrawer,
    	}))
    }

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.documentViewport}>
				<Drawer
					maxSize={this.props.maxSize || 80000000}
					visable={this.state.showDrawer}
					onClose={this.onDrawer}
					pdf={this.state.pdfBuffer}
					onUploaded={this.onDocumentUploaded}
				/>
				<DocumentViewer
					pdf={this.state.pdfBuffer}
					file={this.state.pdf}
				/>
			</div>
		);
	};
}

// DocumentReader.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

export default withStyles(DocumentReaderStyles)(DocumentReader);
