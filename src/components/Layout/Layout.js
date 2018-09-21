import React from 'react';
import Auxi from 'Hoc/Auxi';
import Toolbar from 'Components/Navigation/Toolbar/Toolbar';
import './layout.scss';

const layout = (props) => (
  <Auxi>
    <Toolbar />
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className="content">
      {props.children}
    </main>
  </Auxi>
)

export default layout