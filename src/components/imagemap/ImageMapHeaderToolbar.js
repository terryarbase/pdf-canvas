import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { FlexBox, FlexItem } from '../flex';
import { CommonButton } from '../common';

class ImageMapHeaderToolbar extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
        selectedItem: PropTypes.object,
    }

    render() {
        const { canvasRef, selectedItem } = this.props;
        const isCropping = canvasRef ? canvasRef.interactionMode === 'crop' : false;
        return (
            <FlexBox className="rde-editor-header-toolbar-container" flex="1">
                <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-alignment">
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.bringForward()}
                        icon="angle-up"
                        tooltipTitle={i18n.t('action.bring-forward')}
                    />
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.sendBackwards()}
                        icon="angle-down"
                        tooltipTitle={i18n.t('action.send-backwards')}
                    />
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.bringToFront()}
                        icon="angle-double-up"
                        tooltipTitle={i18n.t('action.bring-to-front')}
                    />
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.sendToBack()}
                        icon="angle-double-down"
                        tooltipTitle={i18n.t('action.send-to-back')}
                    />
                </FlexItem>
                <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-group">
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.toGroup()}
                        icon="object-group"
                        tooltipTitle={i18n.t('action.object-group')}
                    />
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.toActiveSelection()}
                        icon="object-ungroup"
                        tooltipTitle={i18n.t('action.object-ungroup')}
                    />
                </FlexItem>
                <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-operation">
                    {
                        /*
                        <CommonButton
                            className="rde-action-btn"
                            shape="circle"
                            disabled={isCropping}
                            onClick={() => {
                                this.props.onImport();
                                // canvasRef.handlers.saveCanvasImage()
                            }}
                            icon="image"
                            tooltipTitle={i18n.t('action.image-save')}
                        />
                        <CommonButton
                            className="rde-action-btn"
                            shape="circle"
                            icon="file-download"
                            disabled={isCropping}
                            tooltipTitle={i18n.t('action.download')}
                            onClick={this.props.onDownload}
                            tooltipPlacement="bottomRight"
                        />
                        */
                    }
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.duplicate()}
                        icon="clone"
                        tooltipTitle={i18n.t('action.clone')}
                    />
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.remove()}
                        icon="trash"
                        tooltipTitle={i18n.t('action.delete')}
                    />
                </FlexItem>
                {/* <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-history">
                    <Button className="rde-action-btn" disabled={isCropping}>
                        <Icon name="undo-alt" style={{ marginRight: 8 }} />
                        {'Undo'}
                    </Button>
                    <Button className="rde-action-btn" disabled={isCropping}>
                        {'Redo'}
                        <Icon name="redo-alt" style={{ marginLeft: 8 }} />
                    </Button>
                </FlexItem> */}
            </FlexBox>
        );
    }
}

export default ImageMapHeaderToolbar;
