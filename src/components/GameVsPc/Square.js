
// this is components vs in components GameVsPC.js
function Square(props) {


  return (
    <div className='square' {...props}>{props.x ? 'X' : (props.o ? 'O' : '')}</div>
  );

}

export default Square;