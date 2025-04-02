import { View } from "react-native";
import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";

interface FormFieldProps extends TextInputProps {
  title: string;
  changeHandler: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ title, changeHandler, keyboardType, left, ...props }) => {
  return (
    <TextInput
      label={title}
      mode="flat"
      style={{ backgroundColor: "transparent" }}
      outlineStyle={{ borderRadius: 12 }}
      onChangeText={changeHandler}
      keyboardType={keyboardType}
      left={left}
      {...props}
    />
  );
};

export default FormField;

// import { TextInput, View, Text, StyleSheet } from "react-native";
// import React from "react";

// const FormField = ({ title, changeHandler, keyboardType, left, ...props }) => {
//   return (
//     <View style={styles.inputContainer}>
//       {title && <Text style={styles.label}>{title}</Text>}
//       <TextInput
//         style={styles.input}
//         placeholder={title}
//         onChangeText={changeHandler}
//         keyboardType={keyboardType}
//         {...props}
//       />
//       {left}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginVertical: 8,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//   },
// });

// export default FormField;
