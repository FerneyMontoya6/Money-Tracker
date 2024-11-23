import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { AccountCard } from "../components/AccountCard";
import { db } from "../firebase-config.js"; // Asegúrate de importar tu configuración de Firebase
import { collection, getDocs } from "firebase/firestore";

export default function AccountScreen({ navigation }) {
  const [accounts, setAccounts] = useState([]); // Almacena las cuentas obtenidas
  const [loading, setLoading] = useState(true); // Indica si los datos están cargando

  // Función para obtener cuentas desde Firestore
  const fetchAccounts = async () => {
    try {
      const accountsCollection = collection(db, "Cuentas"); // Referencia a la colección
      const snapshot = await getDocs(accountsCollection); // Obtén los documentos
      const accountsList = snapshot.docs.map((doc) => ({
        id: doc.id, // Incluye el ID del documento
        ...doc.data(), // Obtén los datos de la cuenta
      }));
      setAccounts(accountsList); // Guarda las cuentas en el estado
    } catch (error) {
      console.error("Error al obtener las cuentas: ", error);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Llama a fetchAccounts al cargar la pantalla
  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cuentas</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateAccountsScreen")}
        >
          <Text>Agregar Cuenta</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.accountsWrapper} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : accounts.length === 0 ? (
          <Text>No hay cuentas registradas</Text>
        ) : (
          accounts.map((account, index) => (
            <AccountCard
              key={account.id}
              index={index + 1}
              name={account.name}
              type={account.typeOfAccount} // Tipo de cuenta
              balance={account.initialBalance} // Saldo inicial
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    fontWeight: "semibold",
    borderWidth: 1,
    borderColor: "#000",
  },
  accountsWrapper: {
    paddingVertical: 20,
    rowGap: 20,
  },
});
