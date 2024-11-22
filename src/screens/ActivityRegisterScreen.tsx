import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../navigation/types";

// Definir el tipo de navegación
type ActivityRegisterScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ActivityRegister"
>;

// Definir las props del componente
type Props = {
  navigation: ActivityRegisterScreenNavigationProp;
};

export default function ActivityRegisterScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Actividad</Text>

      <Text style={styles.label}>Fecha</Text>
      <TextInput style={styles.input} placeholder="23/08/24" />

      <Text style={styles.label}>Valor</Text>
      <TextInput style={styles.input} placeholder="100,000" />

      <View style={styles.radioGroup}>
        <TouchableOpacity style={styles.radioButton}>
          <Text>Gasto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioButton}>
          <Text>Ingreso</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Categoría</Text>
      <TextInput style={styles.input} placeholder="Salud" />

      <Text style={styles.label}>Cuenta</Text>
      <TextInput style={styles.input} placeholder="Bancolombia" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={styles.input} placeholder="Pago a la EPS" />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
