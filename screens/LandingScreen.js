import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomTextInput } from "../components/Input";

import { firebaseConfig } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";

import { db } from "../firebase-config";

export default function LandingScreen({ navigation }) {
  const [nombre, setNombre] = useState("");

  const postUserName = async (userName) => {
    const userCollection = collection(db, "Usuario");
    const newUser = {
      nombre: userName,
      saldo: 0,
    };
    await addDoc(userCollection, newUser);
  };

  const handleNavigateToCategories = () => {
    postUserName(nombre);

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
