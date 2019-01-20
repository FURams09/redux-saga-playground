import React, { Component } from "react";
import { connect } from "react-redux";
import { ADD_ITEM } from "../constants/lists";
class AssetList extends Component {
  render() {
    const assets = this.props.assets.map(asset => <li>{asset}</li>);
    return (
      <>
        <button onClick={this.props.addItem}>
          Click Me to add {this.props.value}
        </button>
        <ul>{assets}</ul>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    assets: state.listReducer.assets,
    value: state.listReducer.nextValue
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: () => dispatch({ type: ADD_ITEM })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetList);
