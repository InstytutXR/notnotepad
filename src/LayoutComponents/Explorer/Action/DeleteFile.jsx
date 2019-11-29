import React, { Component } from "react";
import { Alert } from "@blueprintjs/core";
import StorageManager from "../../../Storage/storageManager";
import STORAGE_RESUALT from "../../../Storage/resualt";

class DeleteFile extends Component {
  constructor(props) {
    super(props);
    this.Storage = new StorageManager("Storage Manager");
    this.state = {
      isOpen: props.isOpen,
      file: props.file
    };
  }
  DELETE = () => {
    console.log(this.state);
    const res = this.Storage.deleteFile(this.state.file);
    if (res === STORAGE_RESUALT.SUCCESS) {
      this.props.onClose();
    } else {
    }
  };
  render() {
    return (
      <Alert
        canEscapeKeyCancel={true}
        canOutsideClickCancel={true}
        isOpen={this.state.isOpen}
        confirmButtonText="DELETE"
        intent="danger"
        cancelButtonText="cancel"
        onCancel={this.props.onClose}
        onConfirm={this.DELETE}
      >
        <p>Are you sure you want to delete file? this action is permanent</p>
      </Alert>
    );
  }
}

export default DeleteFile;
