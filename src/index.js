import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import enUS from 'antd/lib/locale-provider/en_US';

import App from './containers/App';
import PDFViewer from './components/pdfviewer';
import { i18nClient } from './i18n';

const antResources = {
    ko: koKR,
    'ko-KR': koKR,
    en: enUS,
    'en-US': enUS,
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const render = (Component) => {
    const rootElement = document.getElementById('root');
    ReactDom.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootElement,
    );
};

render(PDFViewer);
if (module.hot) {
    module.hot.accept('./components/pdfviewer', () => {
        render(PDFViewer);
    });
}
