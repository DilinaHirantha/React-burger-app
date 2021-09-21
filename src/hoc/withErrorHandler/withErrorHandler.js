import React, {Component} from 'react';
import Aux from '../Auxs/Auxs';
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {// factory class used
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({error: err})
            });

        }

        componentWillUnmount() { // componentUnmount will reduce the memory hold for previous component's interceptors
            console.log("Component unmounted")
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error != null} ModelClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props}/>
                </Aux>)
        }
    }
}

export default withErrorHandler
