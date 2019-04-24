import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Switch, Tooltip } from 'antd';
import i18n from 'i18next';

import CommonButton from '../common/CommonButton';

class ImageMapFooterToolbar extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
        preview: PropTypes.bool,
        onChangePreview: PropTypes.func,
        zoomRatio: PropTypes.number,
    }

    state = {
        interactionMode: 'selection',
    }

    componentDidMount() {
        const { canvasRef } = this.props;
        this.waitForCanvasRender(canvasRef);
    }

    componentWillUnmount() {
        const { canvasRef } = this.props;
        this.detachEventListener(canvasRef);
    }

    waitForCanvasRender = (canvas) => {
        setTimeout(() => {
            if (canvas) {
                this.attachEventListener(canvas);
                return;
            }
            const { canvasRef } = this.props;
            this.waitForCanvasRender(canvasRef);
        }, 5);
    };

    attachEventListener = (canvasRef) => {
        canvasRef.canvas.wrapperEl.addEventListener('keydown', this.events.keydown, false);
    }

    detachEventListener = (canvasRef) => {
        canvasRef.canvas.wrapperEl.removeEventListener('keydown', this.events.keydown);
    }

    /* eslint-disable react/sort-comp, react/prop-types */
    handlers = {
        selection: () => {
            this.props.canvasRef.modeHandlers.selection((obj) => {
                return {
                    selectable: obj.superType !== 'port',
                    evented: true,
                };
            });
            this.setState({ interactionMode: 'selection' });
        },
        grab: () => {
            this.props.canvasRef.modeHandlers.grab();
            this.setState({ interactionMode: 'grab' });
        },
    }

    events = {
        keydown: (e) => {
            if (this.props.canvasRef.canvas.wrapperEl !== document.activeElement) {
                return false;
            }
            if (e.keyCode === 81) {
                this.handlers.selection();
            } else if (e.keyCode === 87) {
                this.handlers.grab();
            }
        },
    }

    render() {
        const { canvasRef, preview, zoomRatio, onChangePreview } = this.props;
        const { interactionMode } = this.state;
        const { selection, grab } = this.handlers;
        if (!canvasRef) {
            return null;
        }
        const zoomValue = parseInt((zoomRatio * 100).toFixed(2), 10);
        return (
            <React.Fragment>
                <div className="rde-editor-footer-toolbar-zoom">
                    <Button.Group>
                        <CommonButton
                            style={{ borderBottomLeftRadius: '8px', borderTopLeftRadius: '8px' }}
                            onClick={() => { canvasRef.zoomHandlers.zoomOut(); }}
                            icon="search-minus"
                            tooltipTitle={i18n.t('action.zoom-out')}
                        />
                        <CommonButton
                            onClick={() => { canvasRef.zoomHandlers.zoomOneToOne(); }}
                            tooltipTitle={i18n.t('action.one-to-one')}
                        >
                            {`${zoomValue}%`}
                        </CommonButton>
                        <CommonButton
                            onClick={() => { canvasRef.zoomHandlers.zoomToDefault(); }}
                            tooltipTitle={i18n.t('action.fit')}
                            icon="expand"
                        />
                        <CommonButton
                            onClick={() => { canvasRef.pageHandlers.prev(); }}
                            tooltipTitle={i18n.t('action.prev')}
                            disabled={this.props.firstPage}
                            icon="caret-left"
                        />
                        <span className="rde-editor-footer-toolbar-pageInput">
                            <input 
                                type="text"
                                pattern="[0-9]*"
                                value={this.props.currentPage}
                                onChange={e => {
                                    let page = e.target.value;
                                    const { totalPage } = this.props;
                                    if (!isNaN(page) && Number.isInteger(+page)) {
                                        page = Number(page);
                                        if (page < 1) {
                                            page = 1;
                                        } else if (page > totalPage) {
                                            page = totalPage;
                                        }
                                        this.props.onChangePage(page);
                                    }   
                                }}
                            />
                        </span>
                        <CommonButton
                            onClick={() => { canvasRef.pageHandlers.next(); }}
                            tooltipTitle={i18n.t('action.next')}
                            disabled={this.props.lastPage}
                            icon="caret-right"
                        />
                        <CommonButton
                            style={{ borderBottomRightRadius: '8px', borderTopRightRadius: '8px' }}
                            onClick={() => { canvasRef.zoomHandlers.zoomIn(); }}
                            icon="search-plus"
                            tooltipTitle={i18n.t('action.zoom-in')}
                        />
                    </Button.Group>
                </div>
            </React.Fragment>
        );
    }
}

export default ImageMapFooterToolbar;
