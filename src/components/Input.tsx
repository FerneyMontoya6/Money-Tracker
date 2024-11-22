import { TextInput, View, Text } from "react-native";

interface CustomTextInputProps {
  placeholder: string;
  label: string;
  onChangeText: (text: string) => void;
  value: string;
}

const CustomTextInput = ({
  placeholder,
  label,
  onChangeText,
  value,
}: CustomTextInputProps) => {
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
