import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../navigation/types";

// Tipo de navegación
type IncomeCategorySpeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "IncomeCategorySpeScreen"
>;

type Props = {
  navigation: IncomeCategorySpeScreenNavigationProp;
};

export default function IncomeCategorySpeScreen({ navigation }: Props) {
  // Estado para almacenar las categorías seleccionadas
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Función para manejar la selección de categorías
  const handleCategoryPress = (category: string) => {
    setSelectedCategories(
      (prevSelected) =>
        prevSelected.includes(category)
          ? prevSelected.filter((item) => item !== category) // Deseleccionar
          : [...prevSelected, category] // Seleccionar
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus categorías</Text>

      <Text style={styles.secundatyTitle}>Categorías de ingreso</Text>

      <View style={styles.categoriesContainer}>
        {["Salario", "Ventas", "Intereses", "Freelancing"].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.category,
              selectedCategories.includes(category) && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(category) &&
                  styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
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
  selectedCategory: {
    backgroundColor: "#000", // Color cuando la categoría está seleccionada
  },
  categoryText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedCategoryText: {
    color: "#fff", // Cambiar el color del texto cuando la categoría está seleccionada
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
