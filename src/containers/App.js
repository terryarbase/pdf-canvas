import React, { Component } from 'react';

import ImageMapEditor from '../components/imagemap/ImageMapEditor';

const App = ({ ...props }) => (
    <ImageMapEditor width={1500} height={900} { ...props } />
);

export default App;
