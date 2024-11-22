import { Dispatch, SetStateAction, useState } from "react";
import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface DateInputProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const DateInput = ({ date, setDate }: DateInputProps) => {
  const [show, setShow] = useState(false);

  const onChange = ({ selectedDate }: any) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View>
      <Text
        style={{
          marginBottom: 6,
          fontSize: 14,
        }}
      >
        Fecha de nacimiento
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 8,
          padding: 10,
        }}
        onPress={() => setShow(true)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "gray" }}>{date.toLocaleDateString()}</Text>
          <MaterialIcons name="edit-calendar" size={24} color="gray" />
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export { DateInput };
