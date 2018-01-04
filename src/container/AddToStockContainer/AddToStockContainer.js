import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductButton from '../../components/AddToStock/AddToStockButtons';
import { 
    ButtonToolbar, 
    Modal, 
    Button, 
    FormGroup, 
    ControlLabel, 
    HelpBlock,
    FormControl
 } from 'react-bootstrap/lib/';
import * as actionTypes from '../../store/actions';
import axios from 'axios';

class AddToStockButtons extends Component {

    state = {
        cart: [],
        products: this.props.products,
        showModal: false,
        updatedProduct: null,
        updatedProductID: null
    }

    updateQuantity = (productID, quantity) => {

        axios({
            method: 'patch',
            url: 'https://ancient-reef-75174.herokuapp.com/products/' + productID,
            data: { quantity: quantity },
            headers: { 'Authorization': this.props.token }
        })
            .then((response) => {
                console.log("Post PATCH Response: " + response);
                axios({
                    method: 'get',
                    url: 'https://ancient-reef-75174.herokuapp.com/products/',
                    headers: { 'Authorization': this.props.token }
                })
                    .then((response) => {
                        console.log(response.data);
                        // let newProductsArr = response.data
                        // this.props.updateProduct(newProductsArr);
                        this.setState({ showModal: false });
                    })
            });
    };

    updateLocalQuantity = (productID, quantity) => {
        console.log("Given product ID: " + productID);
        let products = [...this.state.products];
        products.forEach((item, index) => {
            if (item.id === productID) {
                console.log("Matching Item " + item.product_name);
                item.quantity = quantity
            }
        });
        this.setState({ products: products });
    };

    addToCart = (product) => {
        let newArr = this.state.cart.concat(product);
        this.setState({ cart: newArr });
        console.log(this.state.cart);
    }

    render() {
        const products = this.state.products.map(product => {
            return <ProductButton key={product.id} name={product.product_name} quantity={product.quantity} click={() => this.setState({ showModal: true, updatedProduct: product.product_name, updatedProductID: product.id })} />
        });

        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} onChange={props.change} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        }

        return (
            <div style={{ margin: 10 }} >
                <br /> <br />
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(0, 4)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(4, 8)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(8, 12)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(12, 16)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(16, 20)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(20, 24)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(24, 28)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(28, 32)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(32, 36)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(36, 40)}
                </ButtonToolbar>
                {this.state.showModal ?
                    <div className="static-modal">
                        <Modal.Dialog style={{ overflowY: 'initial' }}>
                            <Modal.Header>
                                <Modal.Title>Your Cart</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ textAlign: 'left', overflowY: 'auto', height: 500 }}>
                                <h4>Update quantity of {this.state.updatedProduct}</h4>
                                <FieldGroup id="formControlsPrice" type="text" label="Quantity" inputRef={(ref) => { this.quantity = ref }} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.setState({ showModal: false })}>Close</Button>
                                <Button bsStyle="success" onClick={() => {
                                    this.updateQuantity(this.state.updatedProductID, this.quantity.value);
                                    this.updateLocalQuantity(this.state.updatedProductID, this.quantity.value);
                                    this.setState({ showModal: false });
                                    }}>Update Quantity</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                    : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        products: state.auth.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementQuantity: (productID, quantity) => dispatch(actionTypes.incrementQuantity(productID, quantity)),
        updateQuantity: (product_name, productID, quantity) => dispatch(actionTypes.updateQuantity(product_name, productID, quantity)),
        updateProduct: (products) => dispatch(actionTypes.editProduct(products))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToStockButtons);