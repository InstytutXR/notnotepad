import React, { Component } from "react";
import StorageManager from "../../../Storage/storageManager";
import {
  Dialog,
  InputGroup,
  Card,
  Elevation,
  H6,
  Divider,
  Switch
} from "@blueprintjs/core";

interface CreateFileState {
  isOpen: boolean;
  fileName: string;
  fileIsDirectory: boolean;
}
interface CreateFileProps {
  isOpen: boolean;
  selected: string;
  onClose: () => void;
}

class CreateFile extends Component<CreateFileProps, CreateFileState> {
  storage: StorageManager;
  originalFileName: string;
  constructor(props: CreateFileProps) {
    super(props);
    this.storage = new StorageManager();
    this.state = {
      isOpen: props.isOpen,
      fileName: props.selected,
      fileIsDirectory: false
    };
    this.originalFileName = this.state.fileName;
  }
  Create = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log([this.state.fileName, e.keyCode, this.state.fileIsDirectory]);
    if (e.keyCode === 13) {
      const fileName = this.state.fileName;
      if (
        fileName &&
        fileName !== this.originalFileName &&
        fileName !== this.props.selected
      ) {
        if (this.state.fileIsDirectory) {
          this.storage.makeDirectory(fileName);
          this.props.onClose();
        } else {
          this.storage.MakeDocument(fileName).then(() => {
            this.props.onClose();
          });
        }
      }
    }
  };
  render() {
    return (
      <Dialog
        isOpen={this.state.isOpen}
        onClose={() => this.props.onClose}
        icon="add"
        title="create file"
      >
        <InputGroup
          onKeyDown={this.Create}
          autoFocus
          large
          intent="primary"
          defaultValue={this.state.fileName}
          placeholder="enter file name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ fileName: e.target.value });
          }}
        ></InputGroup>
        <Divider></Divider>
        <Switch
          large
          label="create directory"
          onChange={(e: any) => {
            this.setState({ fileIsDirectory: e.target.checked });
          }}
        ></Switch>
        <Card elevation={Elevation.ZERO}>
          <H6>click enter to create or escape to cancel</H6>
        </Card>
      </Dialog>
    );
  }
}

export default CreateFile;
