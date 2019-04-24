import React, { Component } from "react";
import doEach from 'lodash/forEach';
// import PropTypes from 'prop-types';
// components
import {
	Document,
	Page,
	pdfjs,
} from 'react-pdf';
import DocumentControl from './../DocumentControl';
import OutlineControl from './../../Drawer/Outline';
import ImageMapEditor from './../../../imagemap/ImageMapEditor';
// material-ui
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DocumentViewerStyles = () => ({
	scrollContainer: {
		overflow: 'auto',
		height: '100%',
		width: '100%',
        padding: '0 90px',
	},
	viewContainer: {
		padding: 0,
		borderRadius: 0,
		position: 'relative',
		margin: '50px auto 100px auto',
		display: 'table',
		width: 'auto',
		textAlign: 'center',
	},
    editorContainer: {
        position: 'absolute',
        top: 0,
        height: '100%',
        left: 0,
    },
	viewEmptyContainer: {
		width: '900px',
		height: '600px',
	},
	progressContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
});

class DocumentViewer extends Component {
	constructor(props) {
        super(props);
        this.state = this.initialState(props);
        this.scrollPanel = React.createRef();
        // self members binding
        const funcs = [
        	'onLoadingPage',
        	'onLoadedPage',
        	'onDocumentSourceSuccess',
        	'onDocumentLoaded',
        	'onPageChanged',
            'onZoom',
            'onCreateObject',
            'onScaleChanged',
        	// render helpers
        	'renderMainDocument',
        	'renderLoadingDocument',
        ];
        doEach(funcs, func => this[func] = this[func].bind(this));
    }

    initialState(props) {
    	return {
    		totalPage: 0,	// total number of page
    		page: 1,	// default page
    		loadingPage: false,
    		progress: 0,
            percentage: 1,
    		buffer: 0,
            first: true,    // is first page
            pageFactory: null, // PDFDocument Page factory object
    		factory: null, 	// PDFDocument factory object
    	};
    }

    onLoadingPage({ loaded, total }) {
    	let { progress } = this.state;
    	let buffer = 10;
    	progress = Math.floor((loaded / total) * 100);
    	if (progress < 100) { 
	  		buffer = progress + (Math.random() * 10);
	  	}
    	this.setState({
    		loadingPage: true,
    		progress,
    		buffer,
    	});
    }

    onDocumentSourceSuccess() {
    	this.setState({
    		loadingPage: true,
    	});
    }

    onZoom(percentage) {
        this.setState({
            percentage,
        });
    }

    onPageChanged(page) {
        // console.log(page);
    	this.setState({
    		page,
            last: page === this.state.totalPage,
            first: page === 1,
    	});
    }

    onScaleChanged(percentage) {
        this.setState({
            percentage,
        });
    }

    onLoadedPage(pageFactory) {
    	this.setState({
    		loadingPage: false,
    		progress: 0,
            pageFactory,
    	});
    }

    onCreateObject() {
        console.log(this.scrollPanel);
    }

    onDocumentLoaded(factory) {
    	const { numPages } = factory;
    	let totalPage = numPages;
    	let page = 1;
    	if (totalPage <= 0) {
    		page = 0;
    	}
        // console.log(factory, page, totalPage);
    	this.setState({
    		totalPage,
            last: totalPage === 1,
    		page,
    		factory,
    	});
    }

    renderLoadingDocument() {
    	return (
    		<div className={this.props.classes.progressContainer}>
    			<LinearProgress
    				variant="buffer"
    				value={this.state.progress}
    				valueBuffer={this.state.buffer}
    			/>
    		</div>
    	);
    }

    renderMainDocument() {
    	if (!this.props.pdf) {
    		return (<div />);
    	}
    	return (
    		<Document
	        	file={this.props.pdf}
				noData={(<div />)}
				loading={(<div />)}
				onSourceSuccess={this.onDocumentSourceSuccess}
				onSourceError={(error) => {
					console.log(error.message);
				}}
				onLoadSuccess={this.onDocumentLoaded}
	        >
	        	<Page
	        		inputRef={r => { this.pageRef = r; }}
	        		onLoadProgress={this.onLoadingPage}
                    onLoadSuccess={this.onLoadedPage}
	        		pageNumber={this.state.page}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    scale={this.state.percentage}
	        	/>
	        </Document>
    	);
    }

    dummyConfig() {
        return {
            "1": {
                "workarea": {
                    "width": 595,
                    "height": 842
                },
                "objects": [
                    {
                        "type": "image",
                        "version": "2.3.6",
                        "originX": "left",
                        "originY": "top",
                        "left": 297.5,
                        "top": 421,
                        "width": 0,
                        "height": 0,
                        "fill": "rgb(0,0,0)",
                        "stroke": null,
                        "strokeWidth": 0,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeLineJoin": "miter",
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "clipTo": null,
                        "backgroundColor": "rgba(255, 255, 255, 0)",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "transformMatrix": null,
                        "skewX": 0,
                        "skewY": 0,
                        "crossOrigin": "",
                        "cropX": 0,
                        "cropY": 0,
                        "id": "workarea",
                        "name": "",
                        "src": "",
                        "link": {},
                        "tooltip": {
                            "enabled": false
                        },
                        "layout": "fixed",
                        "workareaWidth": 595,
                        "workareaHeight": 842,
                        "filters": []
                    },
                    {
                        "type": "circle",
                        "version": "2.3.6",
                        "originX": "left",
                        "originY": "top",
                        "left": 267,
                        "top": 390.5,
                        "width": 60,
                        "height": 60,
                        "fill": "rgba(0, 0, 0, 1)",
                        "stroke": "rgba(255, 255, 255, 0)",
                        "strokeWidth": 1,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeLineJoin": "miter",
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "clipTo": null,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "transformMatrix": null,
                        "skewX": 0,
                        "skewY": 0,
                        "radius": 30,
                        "startAngle": 0,
                        "endAngle": 6.283185307179586,
                        "id": "a4a12703-197b-4725-8148-54eedfd6ffaa",
                        "name": "New shape",
                        "link": {
                            "enabled": false,
                            "type": "resource",
                            "state": "new",
                            "dashboard": {}
                        },
                        "tooltip": {
                            "enabled": true,
                            "type": "resource",
                            "template": "<div>{{message.name}}</div>"
                        },
                        "animation": {
                            "type": "none",
                            "loop": true,
                            "autoplay": true,
                            "delay": 100,
                            "duration": 1000
                        },
                        "userProperty": {},
                        "trigger": {
                            "enabled": false,
                            "type": "alarm",
                            "script": "return message.value > 0;",
                            "effect": "style"
                        }
                    }
                ],
                "animations": [],
                "styles": [],
                "dataSources": []
            },
            "2": {
                "workarea": {
                    "width": 595,
                    "height": 842
                },
                "objects": [
                    {
                        "type": "image",
                        "version": "2.3.6",
                        "originX": "left",
                        "originY": "top",
                        "left": 297.5,
                        "top": 421,
                        "width": 0,
                        "height": 0,
                        "fill": "rgb(0,0,0)",
                        "stroke": null,
                        "strokeWidth": 0,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeLineJoin": "miter",
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "clipTo": null,
                        "backgroundColor": "rgba(255, 255, 255, 0)",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "transformMatrix": null,
                        "skewX": 0,
                        "skewY": 0,
                        "crossOrigin": "",
                        "cropX": 0,
                        "cropY": 0,
                        "id": "workarea",
                        "name": "",
                        "link": {},
                        "tooltip": {
                            "enabled": false
                        },
                        "layout": "fixed",
                        "workareaWidth": 595,
                        "workareaHeight": 842,
                        "src": "",
                        "filters": []
                    },
                    {
                        "type": "rect",
                        "version": "2.3.6",
                        "originX": "left",
                        "originY": "top",
                        "left": 101,
                        "top": 148.5,
                        "width": 40,
                        "height": 40,
                        "fill": "rgba(0, 0, 0, 1)",
                        "stroke": "rgba(255, 255, 255, 0)",
                        "strokeWidth": 1,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeLineJoin": "miter",
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "clipTo": null,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "transformMatrix": null,
                        "skewX": 0,
                        "skewY": 0,
                        "rx": 0,
                        "ry": 0,
                        "id": "267ec4ab-81a5-4423-895c-b574e897dd3a",
                        "name": "New shape",
                        "link": {
                            "enabled": false,
                            "type": "resource",
                            "state": "new",
                            "dashboard": {}
                        },
                        "tooltip": {
                            "enabled": true,
                            "type": "resource",
                            "template": "<div>{{message.name}}</div>"
                        },
                        "animation": {
                            "type": "none",
                            "loop": true,
                            "autoplay": true,
                            "delay": 100,
                            "duration": 1000
                        },
                        "userProperty": {},
                        "trigger": {
                            "enabled": false,
                            "type": "alarm",
                            "script": "return message.value > 0;",
                            "effect": "style"
                        }
                    },
                    {
                        "type": "rect",
                        "version": "2.3.6",
                        "originX": "left",
                        "originY": "top",
                        "left": 277,
                        "top": 400.5,
                        "width": 40,
                        "height": 40,
                        "fill": "rgba(0, 0, 0, 1)",
                        "stroke": "rgba(255, 255, 255, 0)",
                        "strokeWidth": 1,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeLineJoin": "miter",
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "clipTo": null,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "transformMatrix": null,
                        "skewX": 0,
                        "skewY": 0,
                        "rx": 0,
                        "ry": 0,
                        "id": "5048a58a-0bf0-45d7-8d2a-45dcf2bc155a",
                        "name": "New shape",
                        "link": {
                            "enabled": false,
                            "type": "resource",
                            "state": "new",
                            "dashboard": {}
                        },
                        "tooltip": {
                            "enabled": true,
                            "type": "resource",
                            "template": "<div>{{message.name}}</div>"
                        },
                        "animation": {
                            "type": "none",
                            "loop": true,
                            "autoplay": true,
                            "delay": 100,
                            "duration": 1000
                        },
                        "userProperty": {},
                        "trigger": {
                            "enabled": false,
                            "type": "alarm",
                            "script": "return message.value > 0;",
                            "effect": "style"
                        }
                    },
                    {
                        "type": "rect",
                        "version": "2.3.6",
                        "originX": "left",
                        "originY": "top",
                        "left": 277,
                        "top": 400.5,
                        "width": 40,
                        "height": 40,
                        "fill": "rgba(0, 0, 0, 1)",
                        "stroke": "rgba(255, 255, 255, 0)",
                        "strokeWidth": 1,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeLineJoin": "miter",
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "clipTo": null,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "transformMatrix": null,
                        "skewX": 0,
                        "skewY": 0,
                        "rx": 0,
                        "ry": 0,
                        "id": "73f546ff-5873-45b6-a57c-83f7d530e8b6",
                        "name": "New shape",
                        "link": {
                            "enabled": false,
                            "type": "resource",
                            "state": "new",
                            "dashboard": {}
                        },
                        "tooltip": {
                            "enabled": true,
                            "type": "resource",
                            "template": "<div>{{message.name}}</div>"
                        },
                        "animation": {
                            "type": "none",
                            "loop": true,
                            "autoplay": true,
                            "delay": 100,
                            "duration": 1000
                        },
                        "userProperty": {},
                        "trigger": {
                            "enabled": false,
                            "type": "alarm",
                            "script": "return message.value > 0;",
                            "effect": "style"
                        }
                    },
                    {
                        "type": "rect",
                        "version": "2.3.6",
                        "originX": "left",
                        "originY": "top",
                        "left": 379,
                        "top": 177.5,
                        "width": 40,
                        "height": 40,
                        "fill": "rgba(0, 0, 0, 1)",
                        "stroke": "rgba(255, 255, 255, 0)",
                        "strokeWidth": 1,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeLineJoin": "miter",
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "clipTo": null,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "transformMatrix": null,
                        "skewX": 0,
                        "skewY": 0,
                        "rx": 0,
                        "ry": 0,
                        "id": "085eacb0-2f5c-40e3-a9e1-13872fe8fd2b",
                        "name": "New shape",
                        "link": {
                            "enabled": false,
                            "type": "resource",
                            "state": "new",
                            "dashboard": {}
                        },
                        "tooltip": {
                            "enabled": true,
                            "type": "resource",
                            "template": "<div>{{message.name}}</div>"
                        },
                        "animation": {
                            "type": "none",
                            "loop": true,
                            "autoplay": true,
                            "delay": 100,
                            "duration": 1000
                        },
                        "userProperty": {},
                        "trigger": {
                            "enabled": false,
                            "type": "alarm",
                            "script": "return message.value > 0;",
                            "effect": "style"
                        }
                    },
                    {
                        "type": "rect",
                        "version": "2.3.6",
                        "originX": "left",
                        "originY": "top",
                        "left": 225,
                        "top": 230.5,
                        "width": 40,
                        "height": 40,
                        "fill": "rgba(0, 0, 0, 1)",
                        "stroke": "rgba(255, 255, 255, 0)",
                        "strokeWidth": 1,
                        "strokeDashArray": null,
                        "strokeLineCap": "butt",
                        "strokeLineJoin": "miter",
                        "strokeMiterLimit": 4,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "flipX": false,
                        "flipY": false,
                        "opacity": 1,
                        "shadow": null,
                        "visible": true,
                        "clipTo": null,
                        "backgroundColor": "",
                        "fillRule": "nonzero",
                        "paintFirst": "fill",
                        "globalCompositeOperation": "source-over",
                        "transformMatrix": null,
                        "skewX": 0,
                        "skewY": 0,
                        "rx": 0,
                        "ry": 0,
                        "id": "886caf5f-3b8b-474c-9330-264b23f2efaa",
                        "name": "New shape",
                        "link": {
                            "enabled": false,
                            "type": "resource",
                            "state": "new",
                            "dashboard": {}
                        },
                        "tooltip": {
                            "enabled": true,
                            "type": "resource",
                            "template": "<div>{{message.name}}</div>"
                        },
                        "animation": {
                            "type": "none",
                            "loop": true,
                            "autoplay": true,
                            "delay": 100,
                            "duration": 1000
                        },
                        "userProperty": {},
                        "trigger": {
                            "enabled": false,
                            "type": "alarm",
                            "script": "return message.value > 0;",
                            "effect": "style"
                        }
                    }
                ],
                "animations": [],
                "styles": [],
                "dataSources": []
            }
        };
    }

	render() {
		const { classes } = this.props;
		let viewContainerStyle = [ classes.viewContainer ];
		// the user does not pick any file
		if (!this.props.pdf) {
			viewContainerStyle = [
				...viewContainerStyle,
				classes.viewEmptyContainer,
			];
		}
        const { factory, pageFactory, percentage } = this.state;
		return (
			<div
                ref={this.scrollPanel}
                className={classes.scrollContainer}
            >
				<Paper
					className={viewContainerStyle.join(' ')}
					elevation={1}
				>
					{ this.renderMainDocument() }
					{
                        /*
                        <DocumentControl
    						currentPage={this.state.page}
    						totalPage={this.state.totalPage}
    						onChangePage={this.onPageChanged}
                            percentage={percentage}
                            onScaleChanged={this.onScaleChanged}
    						pdf={factory}
    						file={this.props.file}
					   />
                       */
                    }
                    {
                        factory && <OutlineControl
                            onChangePage={this.onPageChanged}
                            pdf={factory}
                            totalPage={this.state.totalPage}
                            currentPage={this.state.page}
                        />
                    }
                    {
                        pageFactory && 
                        <div className={classes.editorContainer}>
                            <ImageMapEditor
                                totalPage={this.state.totalPage}
                                currentPage={this.state.page}
                                onChangePage={this.onPageChanged}
                                page={pageFactory}
                                pdf={this.props.pdf}    // pdf arraybuffer object
                                file={this.props.file}  // pdf file
                                lastPage={this.state.last}
                                firstPage={this.state.first}
                                percentage={percentage}
                                onCreateObject={this.onCreateObject}
                                onZoom={this.onZoom}
                                readOnly={false}
                                encrypt={this.props.encrypt}
                            />
                        </div>
                    }
				</Paper>
			</div>
		);
	};
}

// DocumentViewer.propTypes = {
// 	pdf: PropTypes.object,
// 	file: PropTypes.object,
// 	classes: PropTypes.object.isRequired,
// };

export default withStyles(DocumentViewerStyles)(DocumentViewer);
