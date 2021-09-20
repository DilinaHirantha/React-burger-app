import React, {Component} from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Auxs/Auxs'
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) { /* using this method we can update
    summaryOrder component only if the prop.show changes*/
        return nextProps.show != this.props.show;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('[Model will update]');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.ModelClosed}/>
                <div className={classes.Modal}
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
