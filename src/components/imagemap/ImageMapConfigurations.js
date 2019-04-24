import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import classnames from 'classnames';

import NodeProperties from './properties/NodeProperties';
import MapProperties from './properties/MapProperties';
import Animations from './animations/Animations';
import CanvasList from '../canvas/CanvasList';
import Styles from './styles/Styles';
import DataSources from './datasources/DataSources';
import Icon from '../icon/Icon';
import CommonButton from '../common/CommonButton';

class ImageMapConfigurations extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
        selectedItem: PropTypes.object,
        onChange: PropTypes.func,
        onChangeAnimations: PropTypes.func,
        onChangeStyles: PropTypes.func,
        onChangeDataSources: PropTypes.func,
        animations: PropTypes.array,
        styles: PropTypes.array,
        dataSources: PropTypes.array,
    }

    state = {
        activeKey: 'layer',
        collapse: true,
    }

    handlers = {
        onChangeTab: (activeKey) => {
            this.setState({
                activeKey,
            });
        },
        onCollapse: () => {
            this.setState({
                collapse: !this.state.collapse,
            });
        },
    }

    render() {
        const {
            onChange,
            selectedItem,
            canvasRef,
            animations,
            styles,
            dataSources,
            onChangeAnimations,
            onChangeStyles,
            onChangeDataSources,
            readOnly,
            onDownload,
        } = this.props;
        const { collapse, activeKey } = this.state;
        const { onChangeTab, onCollapse } = this.handlers;
        const className = classnames('rde-editor-configurations', {
            minimize: collapse,
        });
        return (
            <div>
                {
                    collapse && <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        icon={'angle-double-right'}
                        onClick={onCollapse}
                        style={{ position: 'fixed', top: 7, left: 55, zIndex: 1000 }}
                    />
                }
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    icon={'file-download'}
                    onClick={onDownload}
                    style={{ position: 'fixed', top: 130, left: 55, zIndex: 1000 }}
                />
                <div className={className}>
                    <CommonButton
                        className="rde-action-btn"
                        shape="circle"
                        icon={'angle-double-left'}
                        onClick={onCollapse}
                        style={{ position: 'fixed', top: 7, left: 394, zIndex: 1000 }}
                    />
                    <Tabs
                        tabPosition="right"
                        style={{ height: '100%' }}
                        activeKey={activeKey}
                        onChange={onChangeTab}
                        tabBarStyle={{ marginTop: 60 }}
                    >
                        <Tabs.TabPane tab={<Icon name="layer-group" />} key="layer">
                            <CanvasList readOnly={readOnly} canvasRef={canvasRef} selectedItem={selectedItem} />
                        </Tabs.TabPane>
                        {
                            !readOnly && <Tabs.TabPane tab={<Icon name="cogs" />} key="node">
                                    <NodeProperties onChange={onChange} selectedItem={selectedItem} canvasRef={canvasRef} />
                            </Tabs.TabPane>
                        }
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default ImageMapConfigurations;
