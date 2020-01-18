import React from 'react'
import { Modal, Button } from 'antd';

class ModalPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      ok: false,
      cancel: false
    };
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
      ok: true,
      cancel: false
    })
    this.props.getModalStatus(false);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      cancel: true,
      ok: false
    })
    this.props.getModalStatus(false);
  };

  render() {
    return (
      <div>
        <Modal
          title={this.props.title !== undefined ? this.props.title : "Status"}
          visible={this.props.visible}
          //onOk={this.handleOk}
          //onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={[
            <Button key="back" onClick={this.handleOk}>
              OK
                        </Button>
          ]}>
          {this.props.message}
          {this.props.imageURL && <img src={this.props.imageURL} width={400} alt="" className="img-fluid" />}
        </Modal>
      </div>
    );
  }
}

export default ModalPopup;
