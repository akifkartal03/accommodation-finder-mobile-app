import React, { Component } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ModalOVerlay from "./modalOverlay";
import { Entypo } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";

const ARROW_COLOR = "black";
const PLACEHOLDER_COLOR = "grey";
const DIVIDER_COLOR = "black";
const CONFIRM_BUTTON_TITLE = "Confirm";
const PLACEHOLDER_ITEMS_SELECTED_COLOR = "black";
const PLACEHOLDER_ITEMS_SELECTED = "$count Yurt";

export default class PickerCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      checkedItems: this.props.selectedDorms,
    };
  }

  //Events
  handleRequestClose() {
    const OnConfirm = this.props.OnConfirm;

    if (OnConfirm != null) {
      /* let vData = this.props.data;
      let vItems = this.state.checkedItems;
      let vKeyField = this.props.KeyField;
      const vResult = vData.filter(function(item) {
        return vItems.includes(item[vKeyField]);
      });*/
      OnConfirm(this.state.checkedItems);
    }
    this.setModalVisible(false);
  }

  handlePressPicker() {
    this.setModalVisible(!this.state.modalVisible);
  }

  handlePressCheckBox(pId) {
    let tmp = this.state.checkedItems;

    if (tmp.includes(pId)) {
      tmp.splice(tmp.indexOf(pId), 1);
    } else {
      tmp.push(pId);
    }
    this.setState({ checkedItems: tmp });
  }

  //Other Methods
  setModalVisible(pVisible) {
    this.setState({ modalVisible: pVisible });
  }

  ItemExistList(pKey) {
    return this.state.checkedItems.includes(pKey) ? true : false;
  }

  //render Methods
  renderArrow() {
    vArrowColor = ARROW_COLOR;
    if (this.props.arrowColor != null) {
      vArrowColor = this.props.arrowColor;
    }

    let vArrowSize = 20;
    if (this.props.arrowSize != null) {
      vArrowSize = this.props.arrowSize;
    }
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: 15,
          width: 30,
        }}
      >
        <Entypo color={vArrowColor} size={vArrowSize} name="select-arrows" />
      </View>
    );
  }

  renderPlaceHolder() {
    let vPlaceHolder = this.props.placeholder || "";
    let vColorTextPlaceHolder =
      this.props.placeholderTextColor || PLACEHOLDER_COLOR;
    if (this.state.checkedItems.length > 0) {
      const vPlaceHolderSelectedItems =
        this.props.placeholderSelectedItems || PLACEHOLDER_ITEMS_SELECTED;
      let vCount = this.state.checkedItems.length;
      vPlaceHolder = vPlaceHolderSelectedItems.replace("$count", vCount);
      vColorTextPlaceHolder =
        this.props.selectedTextColor || PLACEHOLDER_ITEMS_SELECTED_COLOR;
    }

    return (
      <View style={StyleCheckBoxListPicker.containerPlaceholder}>
        <Text
          style={[
            {
              color: vColorTextPlaceHolder,
              fontSize: 16,
            },
          ]}
        >
          {vPlaceHolder}
        </Text>
      </View>
    );
  }

  renderCheckBox(pItem, ind) {
    return (
      <CheckBox
        onPress={() => this.handlePressCheckBox(pItem[this.props.KeyField])}
        checked={this.state.checkedItems.includes(ind)}
        checkedColor="green"
      />
    );
  }

  renderDescriptionCheckBox(pItem) {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ marginLeft: 0, marginTop: -4 }}>
          {pItem[this.props.DescriptionField]}
        </Text>
      </View>
    );
  }
  renderItems(pItem) {
    return (
      <TouchableOpacity
        style={{ backgroundColor: "white", color: "white" }}
        onPress={() => this.handlePressCheckBox(pItem[this.props.KeyField])}
      >
        <View style={StyleCheckBoxListPicker.containerItem}>
          {this.renderCheckBox(pItem, pItem[this.props.KeyField])}
          {this.renderDescriptionCheckBox(pItem)}
        </View>
      </TouchableOpacity>
    );
  }

  renderDivider() {
    DividerVisible = this.props.dividerVisible || true;
    DividerColor = this.props.dividerColor || DIVIDER_COLOR;
    vDivider = null;

    if (DividerVisible) {
      vDivider = (
        <View
          style={{
            borderBottomColor: DividerColor,
            borderBottomWidth: 1,
            marginTop: 10,
          }}
        />
      );
    }
    return vDivider;
  }

  renderHeader() {
    if (this.props.headerComponent != null) {
      vDivider = this.renderDivider();
    }
    return (
      <View>
        {this.props.headerComponent}
        {vDivider}
      </View>
    );
  }

  renderFooter() {
    ButtonTitle = this.props.ConfirmButtonTitle || CONFIRM_BUTTON_TITLE;
    return (
      <View style={StyleCheckBoxListPicker.containerFooter}>
        {this.renderConfirmButton(ButtonTitle)}
      </View>
    );
  }

  renderConfirmButton(pButtonTitle) {
    return (
      <Button onPress={() => this.handleRequestClose()} title={pButtonTitle} />
    );
  }

  renderFlatList() {
    vCheckedItems = this.props.checkedItems;
    if (vCheckedItems != null) {
      this.state.checkedItems = vCheckedItems;
    }
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.props.data}
        extraData={this.state}
        renderItem={({ item }) => this.renderItems(item)}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    );
  }
  renderModal() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View style={StyleCheckBoxListPicker.containerHeader}>
          {this.renderHeader()}
        </View>
        {this.renderFlatList()}
        {this.renderFooter()}
      </View>
    );
  }

  renderContainerModal = () => {
    return (
      <ModalOVerlay
        cancelable={false}
        visible={this.state.modalVisible}
        styleContent={StyleCheckBoxListPicker.containerModal}
        onRequestClose={() => this.handleRequestClose()}
      >
        {this.renderModal()}
      </ModalOVerlay>
    );
  };

  renderPicker() {
    return (
      <TouchableOpacity onPress={() => this.handlePressPicker()}>
        <View
          style={[
            this.props.containerStyle,
            StyleCheckBoxListPicker.containerPicker,
          ]}
        >
          {this.renderPlaceHolder()}
          {this.renderArrow()}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        {this.renderContainerModal()}
        {this.renderPicker()}
      </View>
    );
  }
}

StyleCheckBoxListPicker = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    flexDirection: "column",
    justifyContent: "center",
  },

  containerModal: {
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: "white",
  },

  containerPicker: {
    flexDirection: "row",
    height: 45,
  },
  containerHeader: {
    paddingBottom: 10,
    flex: 0,
  },
  containerFooter: {
    flex: 0,
    paddingTop: 10,
  },

  containerItem: {
    flexDirection: "row",
    paddingBottom: 5,
    alignItems: "center",
    backgroundColor: "white",
    color: "white",
    overlayColor: "white",
  },

  containerPlaceholder: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
});
