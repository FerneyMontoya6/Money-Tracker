import { TextInput, View, Text, TextInputProps } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  label: string;
}

const CustomTextInput = ({ ...props }: CustomTextInputProps) => {
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
        {props.label}
      </Text>
      <TextInput
        {...props}
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
