import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { CustomTextInput } from "../components/Input";
import { SelectInput } from "../components/SelectInput";
import { DateInput } from "../components/DateInput";
import { bankingEntities, typesOfAccounts } from "../utils/constants";
import { db } from "../firebase-config.js"; // Asegúrate de tener el archivo de configuración de Firebase
import { collection, addDoc } from "firebase/firestore";

export default function CreateAccountScreen({ navigation }) {
  const [name, setName] = useState(""); // Nombre de la cuenta
  const [description, setDescription] = useState(""); // Descripción
  const [initialBalance, setInitialBalance] = useState(""); // Saldo inicial
  const [selectedBankingEntity, setSelectedBankingEntity] = useState(
    bankingEntities[0].label
  ); // Entidad bancaria
  const [selectedTypeOfAccount, setSelectedTypeOfAccount] = useState(
    typesOfAccounts[0].label
  ); // Tipo de cuenta
  const [date, setDate] = useState(new Date()); // Fecha

  const handleSaveAccount = async () => {
    try {
      // Validaciones básicas
      if (!name || !initialBalance || !selectedBankingEntity || !selectedTypeOfAccount) {
        Alert.alert("Error", "Por favor, completa todos los campos obligatorios.");
        return;
      }

      // Crea un nuevo documento en la colección "Cuentas"
      await addDoc(collection(db, "Cuentas"), {
        name,
        description,
        initialBalance: parseFloat(initialBalance), // Asegúrate de que sea un número
        bankingEntity: selectedBankingEntity,
        typeOfAccount: selectedTypeOfAccount,
      });

      navigation.navigate("AccountsTab", { screen: "AccountsScreen" })

      Alert.alert("Éxito", "Cuenta creada correctamente.");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar la cuenta.");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <View style={{ paddingBottom: 40, flex: 1, justifyContent: "space-between" }}>
        <View style={styles.form}>
          <CustomTextInput
            placeholder="Nequi"
            label="Nombre de la cuenta"
            value={name}
            onChangeText={setName}
          />
          <CustomTextInput
            placeholder="Para ahorros"
            label="Descripción"
            value={description}
            onChangeText={setDescription}
          />
          <CustomTextInput
            placeholder="10000"
            label="Saldo inicial"
            value={initialBalance}
            onChangeText={setInitialBalance}
            keyboardType="numeric"
          />
          <SelectInput
            label="Entidad Bancaria"
            options={bankingEntities}
            selectedValue={selectedBankingEntity}
            onValueChange={(value) => setSelectedBankingEntity(value)}
          />
          <SelectInput
            label="Tipo de cuenta"
            options={typesOfAccounts}
            selectedValue={selectedTypeOfAccount}
            onValueChange={(value) => setSelectedTypeOfAccount(value)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSaveAccount}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "semibold",
  },
  form: {
    paddingVertical: 30,
  },
});
