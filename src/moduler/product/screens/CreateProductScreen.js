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
import { ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import HeaderButton from "../../../components/UI/HeaderButton";
import ErrorArray from "../../../components/UI/ErrorArray";
import RoutToLogin from "../../../components/UI/RoutToLogin";

//===========
//Schema
//==========
const schema = yup.object({
  Product_Name: yup.string().required().min(3).max(100),
  properties: yup.string().max(191).nullable(true),
  active_ingredient: yup.string().max(100).nullable(true),
  active_ingredient: yup.string().max(100).nullable(true),
  packs: yup.string().max(50).nullable(true),
  brand: yup.string().max(50).nullable(true),
  Public_Price: yup.number().required().min(0).nullable(true),
});

const CreateProductScreen = (props) => {
  const edit_id = props.route.params.edit_id;
  const myContext = useContext(context);
  const dispatch = useDispatch();
  const [screenLoading, setScreenLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState(false);
  const [specialistError, setspecialistError] = useState(false);
  const [error, setError] = useState(false);

  //===============================
  // Dispatch lINE Create Data Action
  //===============================
  const gitdata = useCallback(async () => {
    try {
      setError(false);
      await dispatch(
        create("products/create", "products", myContext.userToken)
      );
      setScreenLoading(false);
    } catch (error) {
      RoutToLogin(error, props);
      setError("Error: dispatch create product data from server!");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!edit_id) gitdata();
  }, [gitdata]);

  //===============================
  // Edite mode Data Action
  //===============================
  let edit_item_data = false;
  let edit_date = useSelector((state) => state.reducer.EDIT["products"]);
  let create_data = useSelector((state) => state.reducer.CREATE["products"]);

  if (edit_id) {
    edit_item_data = edit_date;
    create_data = edit_date;
  }

  if (create_data == undefined || !create_data) {
    create_data = false;
  }

  const selectedProduct = edit_item_data
    ? edit_item_data.product.specialists.map((specialist) => specialist.id)
    : [];
  const [checked, setChecked] = useState(
    edit_item_data
      ? edit_item_data.product.is_active === "1"
        ? true
        : false
      : true
  );

  const [specialists, setSpecialists] = useState(selectedProduct);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: edit_item_data
      ? {
          Product_Name: edit_item_data.product.Product_Name,
          properties: edit_item_data.product.properties,
          active_ingredient: edit_item_data.product.active_ingredient,
          packs: edit_item_data.product.packs,
          brand: edit_item_data.product.brand,
          Public_Price: edit_item_data.product.Public_Price,
        }
      : {},
  });

  //====================
  //format Data
  //====================
  const formatData = (lable, selectFormat) => {
    let formateType = [];
    if (create_data) {
      const selectFormat_data = create_data[selectFormat];
      if (selectFormat_data) {
        formateType = selectFormat_data.map((type) => {
          return { value: type.id, label: type[lable] };
        });
      }
    }
    return formateType;
  };

  //===============================
  // Submit user Data
  //===============================
  const onSubmit = async (data) => {
    setServerErrors(true);
    const inserted_date = {
      Product_Name: data.Product_Name,
      properties: data.properties,
      active_ingredient: data.active_ingredient,
      packs: data.packs,
      brand: data.brand,
      Public_Price: +data.Public_Price,
      is_active: checked ? 1 : 0, // 1 or 0
      specialist_ids: specialists,
    };
    try {
      setScreenLoading(true);
      if (props.route.params.edit_id) {
        const id = edit_item_data.product.id;
        await dispatch(
          update(
            id,
            inserted_date,
            "products/" + id,
            "products",
            myContext.userToken
          )
        );
        setScreenLoading(false);
        props.navigation.navigate("ViewProductScreen", {
          title: inserted_date.Product_Name,
          id: id,
        });
      } else {
        await dispatch(
          store(inserted_date, "products", "products", myContext.userToken)
        );
        setScreenLoading(false);
        props.navigation.navigate("ViewProductScreen", {
          title: inserted_date.Product_Name,
          added_id: true,
        });
      }
    } catch (e) {
      RoutToLogin(e, props);
      if (e.type == "server") {
        setScreenLoading(false);
        if (e.error.msg) {
          setServerErrorMsg(e.error.msg);
        }
        if (e.error.errors) {
          setServerErrors(e.error.errors);
        }
      } else {
        setError("App Error: Submit data to the server!");
      }
    }
  };

  return (
    <BackNav
      HeaderButton={
        <HeaderButton isLoading={screenLoading} name="check" onPress={handleSubmit(onSubmit)} />
      }
      title={
        edit_item_data
          ? "Edit: " + edit_item_data.product.Product_Name
          : "Add Product "
      }
      navigation={props.navigation}
    >
      {error && <Text>Error loading data from the host</Text>}

      <ScrollView style={{ margin: 10 }}>
        <Card>
          <Card.Content>
            <CustomInput
              label="Product Name *"
              placeholder="Product Name"
              errors={errors.Product_Name}
              name="Product_Name"
              control={control}
              maxLength={100}
              required={true}
              icon={() => {
                return (
                  <FontAwesome5
                    name="capsules"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.Product_Name}
            />

            <CustomInput
              label="Product Properties"
              placeholder="Product Properties"
              errors={errors.properties}
              name="properties"
              control={control}
              maxLength={191}
              icon={() => {
                return (
                  <FontAwesome5
                    name="capsules"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.properties}
            />
            <CustomInput
              label="Active Ingredient"
              placeholder="Active Ingredient"
              errors={errors.active_ingredient}
              name="active_ingredient"
              control={control}
              maxLength={100}
              icon={() => {
                return (
                  <FontAwesome5
                    name="capsules"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.active_ingredient}
            />
            <CustomInput
              label="Product Packs"
              placeholder="Product Packs"
              errors={errors.packs}
              name="packs"
              control={control}
              maxLength={50}
              icon={() => {
                return (
                  <FontAwesome5
                    name="capsules"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.packs}
            />
            <CustomInput
              label="Productw Brand"
              placeholder="Productw Brand"
              errors={errors.brand}
              name="brand"
              control={control}
              maxLength={50}
              icon={() => {
                return (
                  <FontAwesome5
                    name="capsules"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.brand}
            />
            <CustomInput
              label="Public Price *"
              placeholder="Public_Price"
              errors={errors.Public_Price}
              name="Public_Price"
              control={control}
              maxLength={6}
              required={true}
              keyboardType="phone-pad"
              icon={() => {
                return (
                  <FontAwesome5
                    name="capsules"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.Public_Price}
            />

            <View style={{ height: 150 }}>
              <MultiselectDropdown
                label="Specialists "
                data={formatData("specialist_name", "specialists")}
                value={specialists}
                onChange={(value) => {
                  setSpecialists(value);
                  specialists.length > 0
                    ? setspecialistError(false)
                    : setspecialistError(true);
                }}
                rippleColor="red"
                mode="outlined"
                primaryColor="red"
                helperText={"please select products "}
                error={specialistError}
                showLoader={false}
                required={true}
                errors={errors.specialist_ids}
              />
              <ErrorArray errors={serverErrors.specialist_ids} />
            </View>

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
              }}
            >
              <Checkbox
                color={Colors.primary}
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text style={{ paddingTop: 5, fontSize: 18 }}>
                Product is active
              </Text>
            </View>
            <SubmitButton
              errors={errors}
              serverErrorMsg={serverErrorMsg}
              screenLoading={screenLoading}
              color={edit_item_data ? Colors.accent : Colors.primary}
              text={edit_item_data ? "Update Product" : "Save Product"}
              onPress={handleSubmit(onSubmit)}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default CreateProductScreen;
