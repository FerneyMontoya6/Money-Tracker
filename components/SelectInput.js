import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SelectInput = ({ label, selectedValue, onValueChange, options }) => {
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <Text style={styles.label}>{label}</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 8,
          height: 40,
          justifyContent: "center",
        }}
      >
        <Picker
          itemStyle={{ fontSize: 14, color: "gray" }}
          selectedValue={selectedValue}
          onValueChange={(event) => onValueChange(event)}
        >
          {options.map((option) => (
            <Picker.Item
              label={option.label}
              value={option.value}
              key={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 14,
  },
});

export { SelectInput };
