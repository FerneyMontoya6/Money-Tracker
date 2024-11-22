import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomTextInput } from "../components/Input";

export default function LandingScreen({ navigation }) {
  const handleNavigateToCategories = () => {
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
      <CustomTextInput label="Nombre" placeholder="Escribe tu nombre" />
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
