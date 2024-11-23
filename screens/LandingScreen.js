import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomTextInput } from "../components/Input";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase-config";

export default function LandingScreen({ navigation }) {
  const [nombre, setNombre] = useState("");


  const updateUserName = async () => {
    try {
      // Referencia al documento específico en la colección "Usuario"
      const userDoc = doc(db, "Usuario", "z8LIz2ZMnwrwiEJBdA68");
  
      // Nuevos valores para actualizar
      const updatedUser = {
        nombre: nombre,
      };
  
      // Actualizar los valores en Firestore
      await updateDoc(userDoc, updatedUser);
  
      console.log("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error actualizando el usuario:", error);
    }
  };

  const handleNavigateToCategories = () => {
    updateUserName();

    navigation.navigate("MainApp", {
      screen: "CategoriesTab",
      params: {
        screen: "SpentCategoriesScreen",
      },
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a</Text>
      <Text
        style={{
          ...styles.title,
          ...styles.bigTitle,
        }}
      >
        Money Track
      </Text>
      <Text style={styles.subtitle}>
        Organiza tus ingresos y gastos, establece presupuestos, y alcanza tus
        metas financieras con facilidad
      </Text>
      <CustomTextInput label="Nombre" placeholder="Escribe tu nombre" value={nombre} onChangeText={setNombre} />
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToCategories}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bigTitle: {
    fontSize: 32,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
