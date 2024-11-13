import { TextInput, View, Text } from "react-native";
import React from "react";

// Desestructuramos las props, incluyendo `placeholder` y `onChangeText`
const CustomTextInput = ({ placeholder, label, onChangeText, value }) => {
  return (
    <View
      style={{
        gap: 6,
      }}
    >
      <Text
        style={{
          fontWeight: "semibold",
        }}
      >
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value} // Para controlar el valor
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 8,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
      />
    </View>
  );
};

export { CustomTextInput };
