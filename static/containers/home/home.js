
import React from 'react';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';
import PuzzleBoard from './../../components/puzzleBoard/puzzleBoard';

import './home.scss';

class Home extends React.Component {

  constructor(props) {
    super();

  }




  render() {
    return (
      <div className="page home">
        
          <PuzzleBoard />
        
      </div>
    )
  }
}


export default Home;