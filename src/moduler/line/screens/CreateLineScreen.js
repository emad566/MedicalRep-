import * as React from 'react';
import  { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import BackNav from "./../../../navigations/BackNav";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useContext } from "react";
import { context } from "./../../../context/AppContext";
import { create, store, update } from "./../../../store/actions/action";
import { useEffect } from "react";
import { Card } from "react-native-paper";
import CustomInput from "./../../../components/UI/CustomInput";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SubmitButton from "./../../user/components/UI/SubmitButton";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import { MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import HeaderButton from "../../../components/UI/HeaderButton";
import ErrorArray from "../../../components/UI/ErrorArray";
import RoutToLogin from "../../../components/UI/RoutToLogin";

//===========
//Schema
//==========
const schema = yup.object({
  lineName: yup.string().required("name is required").max(100).min(3), //? max
});

const CreateLineScreen = (props) => {
  const edit_id = props.route.params.edit_id;
  const myContext = useContext(context);
  const dispatch = useDispatch();
  const [screenLoading, setScreenLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState(false);
  const [productError, setProductError] = useState(false);

  //===============================
  // Dispatch lINE Create Data Action
  //===============================
  const gitdata = useCallback(async () => {
    try {
      await dispatch(create("lines/create", "lines", myContext.userToken, true));
      setScreenLoading(false);
    } catch (error) {
      RoutToLogin(error, props);
    }
  }, []);

  useEffect(() => {
    if (!edit_id) {
      gitdata();
    }
  }, [gitdata]);

  //===============================
  // Edite mode Data Action
  //===============================
  let edit_item_data = false;
  let edit_date = useSelector((state) => state.reducer.EDIT["lines"]);
  let create_data = useSelector((state) => state.reducer.CREATE["lines"]);

  if (edit_id) {
    edit_item_data=edit_date;
    create_data = edit_date;
  }

  if (create_data == undefined || !create_data) {
    create_data = false;
  }

  const [products, setProducts] = useState(
    edit_item_data
      ? edit_item_data.line.products.map((product) => product.id)
      : []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: edit_item_data
      ? {
          lineName: edit_item_data.line.line_name,
        }
      : {},
  });

  //====================
  //format Data
  //====================
  const formatData = (lable, selectFormat) => {
    let formateType = [];
    if (create_data) {
      if (
        selectFormat === "products" &&
        edit_item_data &&
        edit_item_data.line.products.length
      ) {
        const selectFormat_data = create_data[selectFormat];
        if (selectFormat_data) {
          const listProduct = selectFormat_data.map((type) => {
            return { value: type.id, label: type[lable] };
          });
          const lineProduct = edit_item_data.line.products.map((type) => {
            return { value: type.id, label: type.Product_Name };
          });
          formateType = [...lineProduct, ...listProduct];
        }
      } else {
        const selectFormat_data = create_data[selectFormat];
        if (selectFormat_data) {
          formateType = selectFormat_data.map((type) => {
            return { value: type.id, label: type[lable] };
          });
        }
      }
    }
    return formateType;
  };

  //===============================
  // Submit user Data
  //===============================
  const onSubmit = async (data) => {
    setServerErrors(false);
    if (products.length === 0) {
      setProductError(true);
      return;
    } else {
      const inserted_date = {
        line_name: data.lineName,
        product_ids: products,
      };
      try {
        setScreenLoading(true);
        if (props.route.params.edit_id) {
          const id = edit_item_data.line.id;
          await dispatch(
            update(
              id,
              inserted_date,
              "lines/" + id,
              "lines",
              myContext.userToken
            )
          );
          setScreenLoading(false);
          props.navigation.navigate("ViewLineScreen", {
            title: inserted_date.line_name,
            id: id,
          });
        } else {
          await dispatch(
            store(inserted_date, "lines", "lines", myContext.userToken)
          );
          setScreenLoading(false);
          props.navigation.navigate("ViewLineScreen", {
            title: inserted_date.line_name,
            added_id: true,
          });
        }
      } catch (e) {
        RoutToLogin(e, props);
        if (e.type == "server") {
          setScreenLoading(false);
          if (e.error.msg) {
            setServerErrorMsg(e.error.message);
          }
          if (e.error.errors) {
            setServerErrors(e.error.errors);
          }
        }
      }
    }
  };

  return (
    <BackNav
      HeaderButton={
        <HeaderButton
          isLoading={screenLoading}
          name="check"
          onPress={handleSubmit(onSubmit)}
        />
      }
      title={
        edit_item_data ? "Edit: " + edit_item_data.line.line_name : "Add Line "
      }
      navigation={props.navigation}
    >
      <View>
        <Card>
          <Card.Content>
            <CustomInput
              label="Line Name *"
              placeholder="Line Name"
              errors={errors.lineName}
              name="lineName"
              control={control}
              maxLength={100}
              required={true}
              icon={() => {
                return (
                  <FontAwesome5
                    name="grip-lines"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.line_name}
            />

            <View style={{ height: 100 }}>
              <MultiselectDropdown
                label="Select Product "
                data={formatData("Product_Name", "products")}
                value={products}
                onChange={(value) => {
                  setProducts(value);
                  products.length !== 0
                    ? setProductError(false)
                    : setProductError(true);
                }}
                rippleColor="red"
                mode="outlined"
                primaryColor="red"
                required={true}
                helperText={"please select products "}
                error={productError}
                showLoader={false}
              />
            </View>
            <ErrorArray errors={serverErrors.product_ids} />

            <SubmitButton
              errors={errors}
              color={edit_item_data ? Colors.accent : Colors.primary}
              text={edit_item_data ? "Update Line" : "Save"}
              serverErrorMsg={serverErrorMsg}
              screenLoading={screenLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </Card.Content>
        </Card>
      </View>
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default CreateLineScreen;
