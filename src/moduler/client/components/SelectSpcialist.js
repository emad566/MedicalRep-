import { Text, Card, Checkbox } from "react-native-paper";
import { View, FlatList } from "react-native";

function SelectSpcialist(props) {
  const renderData = props.data;

  return (
    <FlatList
      data={renderData}
      keyExtractor={(item, index) => item.specialist_id}
      renderItem={({ item }) => (
        <Card style={{ margin: 5, maxWidth: "50%" }}>
          <View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Checkbox
                status={item.isChecked ? "checked" : "unChecked"}
                onPress={() => {
                  props.handleChange(item.specialist_id);
                }}
              />
              <Text style={{ paddingTop: 5 }}>{item.specialist_name}</Text>
            </View>
          </View>
        </Card>
      )}
    />
  );
}

export default SelectSpcialist;
