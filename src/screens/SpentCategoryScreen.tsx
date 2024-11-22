import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CategoriesStackParamList } from "../navigation/types";

// Tipo de navegación
type SpentCategorySpeScreenNavigationProp = StackNavigationProp<
  CategoriesStackParamList,
  "SpentCategoriesScreen"
>;

type Props = {
  navigation: SpentCategorySpeScreenNavigationProp;
};

export default function SpentCategorySpeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus categorías</Text>

      <Text style={styles.secundatyTitle}>Categorías de gasto</Text>

      <View style={styles.categoriesContainer}>
        {["Entretenimiento", "Salud", "Fitness", "Comida"].map((category) => (
          <TouchableOpacity key={category} style={styles.category}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("IncomeCategoriesScreen")}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: 5,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 70,
  },
  secundatyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoriesContainer: {
    marginBottom: 40,
  },
  category: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
