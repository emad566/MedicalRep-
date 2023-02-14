import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  Subheading,
  Text,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
// import { Feather, FontAwesome5 } from "@expo/vector-icons";
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Feather  from 'react-native-vector-icons/Feather';
import Colors from "../../../constants/Colors";
// import { FontAwesome } from "@expo/vector-icons";
import RowData from "./../../../components/UI/RowData";
import EditeButtomBar from "../../../components/UI/EditeButtomBar";
import { ScrollView, StyleSheet, View } from "react-native";

const LeftContent = (props) => (
  <Avatar.Icon
    style={{ backgroundColor: "#fff" }}
    {...props}
    icon={() => {
      return <FontAwesome name="calendar" size={30} color={Colors.primary} />;
    }}
  />
);

const createPlane = (navigation, client, canMakeCall) => {
  if(!canMakeCall) return;
  navigation.navigate("CreateCallScreen", {
    edit_id: false,
    plan_id: client.id,
    plan_client_id: client.client.id,
  });
};

function PlaneItem({
  navigation,
  loadingData,
  dispatchPlanState,
  handelEditPlane,
  current_date,
  planState,
  current_user_Plan,
  noPlane,
  plansThisDaty,
  onDeletePlane,
  canMakeCall,
  style
}) {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const onDelet = async () => {
    setLoading(true);
    await onDeletePlane(plansThisDaty.plan_date);
    setLoading(false);
    setVisible(false);
  };

  const onEdit = () => {
    const date = plansThisDaty.plan_date;
    const client_ids = plansThisDaty.day_clients.map(
      (client) => +client.client_id
    );

    handelEditPlane(date, client_ids);
  };
  const futurPlan =
    new Date(plansThisDaty && plansThisDaty.plan_date).getTime() >=
    new Date(current_date).getTime();


  return (
    <Card style={{ marginVertical: 20 , ...style }}>
      <Card.Title
        title={plansThisDaty && plansThisDaty.plan_date}
        subtitle={noPlane ? "" : plansThisDaty.day_clients[0].rep.name}
        left={LeftContent}
      />
      <Divider style={{ backgroundColor: Colors.primary }} />
      <ScrollView>
      <Card.Content style={{ marginBottom: 30, minHeight: 60 }}>
      
       {!noPlane &&
          plansThisDaty.day_clients.map((client, index) => (
           
             <View key={client.client.id} style={styles.clints}>
              <Text style={styles.clientIndex}> {index + 1} : </Text>
              <Button
                uppercase={false}
                style={{ marginVertical: 0, fontSize: 40, fontWeight: "bold" }}
                mode="text"
                onPress={createPlane.bind(this, navigation, client , canMakeCall)}
                color="#000"
              >
                {`${client.client.client_name}`}
                <Feather name="phone-call" size={20} color="black" />
              </Button>
            </View>
          
          ))}
        {noPlane && (
          <Subheading
            style={{ textAlign: "center", color: "#ccc", marginVertical: 20 }}
          >
            {loadingData ? "Loading..." : "No Plans"}
          </Subheading>
        )}
      </Card.Content>
      </ScrollView>


      <Divider />
      {!noPlane && current_user_Plan && (
        <EditeButtomBar
          disabled={!futurPlan}
          size={25}
          OnEdite={onEdit}
          OnDelete={showDialog}
        />
      )}

      <Provider>
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>
                {plansThisDaty && plansThisDaty.plan_date}
              </Dialog.Title>
              <Divider style={{ backgroundColor: Colors.primary }} />
              <Dialog.Content>
                <Paragraph style={{ color: "red" }}>
                  Are You Sure You Want To Delete This Plan
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions style={{ justifyContent: "space-between" }}>
                <Button
                  mode="outlined"
                  loading={loading}
                  disabled={loading}
                  color={Colors.primary}
                  uppercase={false}
                  onPress={onDelet}
                >
                  Delete
                </Button>
                <Button
                  mode="outlined"
                  color={Colors.accent}
                  uppercase={false}
                  onPress={hideDialog}
                >
                  Cancel
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </Card>
  );
}

const styles = StyleSheet.create({
  clints: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  clientIndex: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PlaneItem;
