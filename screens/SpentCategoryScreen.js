import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
  collection, // Importación desde el SDK completo
} from "firebase/firestore"; // Correcto: usas Firestore completo

import { db } from "../firebase-config"; // Asegúrate de que la configuración esté bien importada

export default function IncomeCategorySpeScreen({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  // Función para obtener las categorías desde Firestore
  const fetchCategories = async () => {
    try {
      const categoryCollectionRef = collection(db, "Categoria_ingreso");
      const querySnapshot = await getDocs(categoryCollectionRef);

      if (querySnapshot.empty) {
        console.log("No se encontraron categorías.");
        return;
      }

      // Mapeamos los documentos para obtener el nombre y el estado 'activo'
      const categoryList = querySnapshot.docs.map(doc => ({
        nombre: doc.data().nombre,
        activo: doc.data().activo
      }));

      // Filtramos las categorías que ya están activas para seleccionarlas por defecto
      const initiallySelected = categoryList.filter(cat => cat.activo).map(cat => cat.nombre);

      setCategories(categoryList);
      setSelectedCategories(initiallySelected);  // Establecer las categorías activas como seleccionadas
    } catch (error) {
      console.error("Error obteniendo categorías de ingreso:", error);
    }
  };

  // Función para manejar la selección de categorías
  const handleCategoryPress = async (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category) // Deseleccionar
      : [...selectedCategories, category]; // Seleccionar

    setSelectedCategories(updatedCategories);

    // Llamar a la actualización después de cambiar el estado
    updateCategoryState(category);
  };

  // Función para actualizar el estado de las categorías
  const updateCategoryState = async (category) => {
    try {
      // Suponemos que la colección "Categoria_ingreso" tiene un documento cuyo campo 'nombre' coincide con 'category'
      const categoryCollectionRef = collection(db, "Categoria_ingreso");

      // Realizamos una consulta para obtener el documento con el nombre de la categoría
      const q = query(categoryCollectionRef, where("nombre", "==", category));

      // Ejecutamos la consulta
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log(`No se encontró una categoría con el nombre: ${category}`);
        return;
      }

      // Suponemos que solo habrá un documento con ese nombre
      const categoryDoc = querySnapshot.docs[0];

      // Referencia al documento específico
      const categoryDocRef = doc(db, "Categoria_ingreso", categoryDoc.id);

      // Obtener el documento antes de actualizar
      const docSnap = await getDoc(categoryDocRef);
      if (!docSnap.exists()) {
        console.log("No se encontró el documento.");
        return;
      }

      // Actualizar el estado 'activo' del documento
      const updatedCategory = {
        activo: !docSnap.data().activo, // Alternar el estado "activo"
      };

      // Actualizamos el documento en Firestore
      await updateDoc(categoryDocRef, updatedCategory);

      console.log("Categorías de ingreso actualizadas correctamente");
    } catch (error) {
      console.error("Error actualizando las categorías de ingreso:", error);
    }
  };

  // Cargar las categorías cuando el componente se monte
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus categorías</Text>

      <Text style={styles.secundatyTitle}>Categorías de ingreso</Text>

      <View style={styles.categoriesContainer}>
        {categories.length === 0 ? (
          <Text>No se encontraron categorías.</Text>
        ) : (
          categories.map((category) => (
            <TouchableOpacity
              key={category.nombre}
              style={[
                styles.category,
                selectedCategories.includes(category.nombre) && styles.selectedCategory, // Mantener el color negro al seleccionar
              ]}
              onPress={() => handleCategoryPress(category.nombre)} // Llamamos a la función para manejar la selección
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategories.includes(category.nombre) && styles.selectedCategoryText, // Cambiar el color del texto cuando esté seleccionada
                ]}
              >
                {category.nombre}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HomeTab", { screen: "HomeScreen" })}
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
  title: { fontSize: 36, fontWeight: "bold", marginBottom: 70 },
  secundatyTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  categoriesContainer: { marginBottom: 40 },
  category: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedCategory: { backgroundColor: "#000" }, // Mantener el color negro al seleccionar
  categoryText: { fontSize: 16, textAlign: "center" },
  selectedCategoryText: { color: "#fff" }, // Cambiar el color del texto cuando esté seleccionada
  button: { backgroundColor: "#000", padding: 15, borderRadius: 8 },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
