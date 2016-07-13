import React from 'react'
import {render} from 'react-dom'
import GlslTransitions from 'glsl-transition'
import './styles.less'

export class Graphic extends React.Component{
    constructor(props){
      super(props);
    }
    componentWillUpdate(){
      const ctx = this.refs.canvas.getContext('2d')
      ctx.clearRect(0,0,200,200)
      ctx.save();
      ctx.translate(100,100)
      ctx.rotate(this.props.rotation,100,100)
      ctx.fillStyle = '#fff'
      ctx.fillRect(-50,-50,100,100)
      ctx.font = "#fff 10px serif #fff";
      ctx.fillText(Math.round(this.props.rotation), 0, 80);
      ctx.restore();
    }
    render(){
      return <canvas ref="canvas" width={200} height={200} />
    }
}

export class App extends React.Component {
  constructor(props){
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { rotation: 0 }
  }
  componentDidMount(){
    requestAnimationFrame(this.tick)
  }
  tick(){
    this.setState({ rotation: this.state.rotation + 0.01 })
    requestAnimationFrame(this.tick)
  }
  render(){
    return <div><Graphic rotation={this.state.rotation} /></div>
  }
}

/* Render the application to the page node */
render(<div><App rotation={0} /></div>, document.getElementById('app-root'))
